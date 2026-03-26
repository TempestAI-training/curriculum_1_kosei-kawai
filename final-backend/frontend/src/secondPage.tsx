import React from 'react';
import { useState } from 'react';

interface second_Props {
    onBack : () => void;
}
interface message {
    id : number;
    text : string;
    sender : 'bot' | 'user';
}
interface APIResponse {
    conversation_id: string;
}
const SecondPage = ({onBack}:second_Props) => {
    const [messages, setMessages] = useState<message[]>([]);
    const [users_message, setUsers_message] = useState("");
    const [conversationId, setConversationId] = useState<string | null>(null);

    const Submit = async (e : React.FormEvent) => {
        e.preventDefault();
        if (!users_message) return;

        const Usersmessage : message = {
            id : Date.now(),
            text : users_message,
            sender : 'user',
        }

        const newMessages = [...messages,Usersmessage];
        setMessages(newMessages);

        const currentInput = users_message;
        setUsers_message("");

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: currentInput,
                    conversation_id: conversationId,
                }),
            });
            if (!response.ok) {
            throw new Error("サーバーエラーが発生しました");
            }
            const data = await response.json();
            if (data.conversation_id) {
                setConversationId(data.conversation_id);
            }
            const Botmessage : message = {
                id : Date.now() + 1,
                text : data.reply,
                sender : 'bot',
            }
            setMessages([...newMessages,Botmessage]);
        }
        catch (error) {
            console.error("Error:", error);
            alert("エラーが発生しました。")
        }
    }
    return(
    <div className="chat_container">
        <div className="chat">
            {messages.map((m)=> (
                <div
                key = {m.id}
                className={m.sender}>
                <p>{m.text}</p>
                </div>
            ))}
        </div>
        <div className="chat_input">
            <form onSubmit = { Submit }>
                <textarea 
                value = { users_message }
                onChange={(e) => setUsers_message(e.target.value)} />
                <button>送信</button>
            </form>
        </div>
    </div>
    );
}

export default SecondPage;