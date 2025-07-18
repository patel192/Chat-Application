import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:3003";

export const Chats = ({ selectedChatId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Fetch messages when chat changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/messages`);
        const filtered = res.data.data.filter(msg => msg.chat === selectedChatId);
        setMessages(filtered);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    if (selectedChatId) fetchMessages();
  }, [selectedChatId]);

  // Send message
  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const messageData = {
      chat: selectedChatId,
      sender: currentUser._id,
      content: newMsg,
      messageType: "text",
      isRead: false,
    };

    try {
      const res = await axios.post(`${API_BASE}/message`, messageData);
      setMessages([...messages, res.data.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-lg border border-neutral-800 bg-zinc-900 p-4 shadow-inner">
      <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar space-y-3">
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.sender === currentUser._id ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[70%] p-3 rounded-xl text-sm ${
                msg.sender === currentUser._id
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-neutral-800 text-gray-300"
              }`}
            >
              {msg.content}
              <div className="text-[10px] text-gray-400 mt-1 text-right">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">No messages yet</div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 rounded-full px-4 py-2 bg-zinc-800 text-gray-100 focus:outline-none"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white"
        >
          <PaperPlaneIcon />
        </button>
      </div>
    </div>
  );
};
