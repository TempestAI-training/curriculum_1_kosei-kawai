import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import AzureOpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from psycopg import connect
from psycopg.rows import dict_row
from uuid import uuid4
from typing import Optional
load_dotenv()

database_url = os.environ.get("DATABASE_URL")
deployment_name = os.environ.get("AZURE_OPENAI_DEPLOYMENT_NAME")
history_limit = int(os.environ.get("CHAT_HISTORY_LIMIT","10"))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AzureOpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    api_version=os.environ.get("AZURE_OPENAI_API_VERSION"), 
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT")
)

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


def get_postgres_connection():
    if not database_url:
        raise RuntimeError("DATABASE_URL is required when DB_BACKEND=postgres.")
    return connect(database_url, row_factory=dict_row)

def save_message(conversation_id: str, role: str, content: str, model: str = "user") -> None:
    with get_postgres_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO messages (conversation_id,role,content,model)
                VALUES (%s, %s, %s, %s)
                """,
                (conversation_id, role, content, model)
            )
            cur.execute(
                """
                UPDATE conversations
                SET updated_at = now()
                WHERE id = %s
                """,
                (conversation_id,)
            )
            conn.commit()

def get_or_create_conversation(requested_id: Optional[str]) -> str:
    with get_postgres_connection() as conn:
        with conn.cursor() as cur:
            if requested_id:
                cur.execute(
                    "SELECT id FROM conversations WHERE id = %s LIMIT 1",(requested_id,)
                )
                if cur.fetchone() is not None:
                    return requested_id
            conversation_id = str(uuid4())
            cur.execute("INSERT INTO conversations (id, title) VALUES (%s, %s)",(conversation_id,None))
            conn.commit()
            return conversation_id

def load_messages(conversation_id: str) -> list[dict]:
    with get_postgres_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT role, content, created_at, model
                FROM messages
                WHERE conversation_id = %s
                ORDER BY created_at DESC
                limit %s
                """,
                (conversation_id, history_limit)
            )
            rows = cur.fetchall()
            if not rows:
                return []
            return list(reversed(rows))
        
@app.post("/chat")
def chat(request: ChatRequest):
    """
    ユーザーからのメッセージを受け取り、AIの返答を返すエンドポイント
    """
    try:
        conversation_id = get_or_create_conversation(request.conversation_id)
        recent_messages = load_messages(conversation_id)

        formatted_messages = [{"role": "system", "content": "あなたは日本の内閣総理大臣の高市早苗です。"}]
        for msg in recent_messages:
            formatted_messages.append({"role": msg["role"], "content": msg["content"]})

        formatted_messages.append({"role": "user", "content": request.message})

        response = client.chat.completions.create(
            model=os.environ.get("AZURE_OPENAI_DEPLOYMENT_NAME"),
            messages=formatted_messages
        )
        
        save_message(conversation_id, "user", request.message, "user")



        ai_message = response.choices[0].message.content
        save_message(conversation_id, "assistant", ai_message, deployment_name)
        return {
            "conversation_id": conversation_id,
            "reply": ai_message,
        }

    except Exception as e:
        # エラーが発生した場合の処理
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/conversations")
def list_conversations():
    try:
        with get_postgres_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, title, created_at, updated_at
                    FROM conversations
                    ORDER BY updated_at DESC
                    """
                )
                rows = cur.fetchall()
                return {
                    "conversations": [
                        {
                            "id": row["id"],
                            "title": row["title"] or f"会話 {str(row['id'])[:8]}",
                            "created_at": row["created_at"],
                            "updated_at": row["updated_at"],
                        }
                        for row in rows
                    ]
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id: str):
    try:
        with get_postgres_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id
                    FROM conversations
                    WHERE id = %s
                    LIMIT 1
                    """,
                    (conversation_id,),
                )
                if cur.fetchone() is None:
                    raise HTTPException(status_code=404, detail="Conversation not found.")

                cur.execute(
                    """
                    SELECT role, content, created_at, model
                    FROM messages
                    WHERE conversation_id = %s
                    ORDER BY created_at asc
                    """,
                    (conversation_id,),
                )
                return {"conversation_id": conversation_id, "messages": cur.fetchall()}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
