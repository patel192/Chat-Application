import React, { useEffect, useState } from "react";
import axios from "axios";

export const Chats = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatStatus, setChatStatus] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3003/users");
      setAllUsers(res.data.data); // ✅ Corrected
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchQuery(user.username);
    setFilteredUsers([]); // Hide suggestions
  };

  const handleCreateChat = () => {
    if (!selectedUser) {
      setChatStatus("❌ Please select a user to start a chat.");
      return;
    }

    // Simulate chat creation
    console.log("Creating chat with:", selectedUser);
    setChatStatus(`✅ Chat created with ${selectedUser.username}`);
    setSelectedUser(null);
    setSearchQuery("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">Start a New Chat</h2>

      <input
        type="text"
        placeholder="Search by username..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none mb-2"
      />

      {/* Suggestions List */}
      {filteredUsers.length > 0 && (
        <ul className="bg-zinc-900 border border-zinc-700 rounded max-h-40 overflow-y-auto mb-2">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className="p-2 cursor-pointer hover:bg-zinc-800"
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleCreateChat}
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded shadow"
      >
        Create Chat
      </button>

      {/* Chat Status Message */}
      {chatStatus && (
        <div className="mt-2 text-sm text-green-400">{chatStatus}</div>
      )}
    </div>
  );
};
