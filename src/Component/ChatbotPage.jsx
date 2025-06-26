import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOCAL_BACKEND_BASE_URL = import.meta.env.VITE_LOCAL_BACKEND_ENV;

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Revisorr AI. Ask me anything about your notes or reminders.",
    },
  ]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Placeholder for Ollama API call
    try{
      const botReply = await axios.get(`${BASE_URL}/ollama/chatbot/${input}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(botReply.data);

    const responseText = botReply?.data;
    setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    
    }catch(err){
      console.log(err);

      const responseText = "Sorry, I couldn't understand that.";
    setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
      
    }

    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <Navbar />
      <div className="pt-15 text-2xl font-semibold mb-4 text-center">
        Revisorr Chatbot 🤖
      </div>

      <div className="flex-1 bg-white p-4 rounded-2xl shadow-md overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          onClick={handleSend}
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
