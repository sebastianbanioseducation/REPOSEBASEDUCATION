import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const startSession = async () => {
    const res = await fetch(`${API}/start`, { method: "POST" });
    const data = await res.json();
    setSessionId(data.sessionId);
  };

  const sendMessage = async () => {
    const res = await fetch(`${API}/tutor`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ sessionId, input })
    });

    const data = await res.json();

    setMessages(prev => [...prev, { role: "user", content: input }, data]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tutor IA</h1>

      {!sessionId && <button onClick={startSession}>Iniciar</button>}

      <div>
        {messages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <p><b>Tú:</b> {m.content}</p>
            ) : (
              <p><b>IA:</b> {m.content}</p>
            )}
          </div>
        ))}
      </div>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}