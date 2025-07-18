import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUser, FaComments, FaUserPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

export const Chats = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get("http://localhost:3003/chats");
        setChats(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch chats:", err.message);
      }
    };

    fetchChats();
  }, []);

  const handleFindUsers = () => {
    alert("Redirecting to find users...");
    // Navigate or open modal
  };

  const handleCreateChat = () => {
    alert("Opening chat creation modal...");
    // Navigate or open modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1D51] to-[#1e1b4b] text-[#C5DFFF] px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-4 text-purple-300 tracking-wide">
        <FaComments className="text-purple-400 animate-pulse" /> Chat Dashboard
      </h1>

      {chats.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-300 mb-6 italic">
            No chats available. Start by finding users or creating a new chat.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={handleFindUsers}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
            >
              <FaSearch /> Find Users
            </button>
            <button
              onClick={handleCreateChat}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
            >
              <FaUserPlus /> Create Chat
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {chats.map((chat) => (
            <div
              key={chat._id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">
                  {chat.isGroup ? chat.chatName : "Private Chat"}
                </h2>
                {chat.isGroup ? (
                  <span className="text-sm text-purple-300 bg-purple-800/30 px-3 py-1 rounded-full flex items-center gap-1">
                    <FaUsers /> Group
                  </span>
                ) : (
                  <span className="text-sm text-blue-300 bg-blue-800/30 px-3 py-1 rounded-full flex items-center gap-1">
                    <FaUser /> Direct
                  </span>
                )}
              </div>

              <p className="text-gray-400 mb-4 text-sm italic">
                {chat.latestMessage || "No messages yet..."}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {chat.users.map((user, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-zinc-800 text-blue-200 px-3 py-1 rounded-full border border-blue-400"
                  >
                    {user}
                  </span>
                ))}
              </div>

              {chat.admin && (
                <p className="text-sm text-right text-green-400 mt-2">
                  Admin: <span className="font-semibold">{chat.admin}</span>
                </p>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
