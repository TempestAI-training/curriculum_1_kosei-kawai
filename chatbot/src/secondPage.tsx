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

const SecondPage = ({onBack}:second_Props) => {
    const [messages, setMessages] = useState<message[]>([]);
    const [users_message, setUsers_message] = useState("");
    
    const Submit = (e : React.FormEvent) => {
        e.preventDefault();

        const Usersmessage : message = {
            id : Date.now(),
            text : users_message,
            sender : 'user',
        }

        const Botmessage : message = {
            id : Date.now() + 1,
            text : '高市さんは日本の総理大臣です。',
            sender : 'bot',
        }
        
        setMessages([...messages, Usersmessage, Botmessage]);
        setUsers_message("");
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