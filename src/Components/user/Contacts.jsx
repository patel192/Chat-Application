import React, { useEffect, useState } from "react";
import axios from "axios";

export const Contacts = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3003/users");
      // Filter out the current user
      const filteredUsers = res.data.data.filter((u) => u._id !== userId);
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch current user's contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/user/${userId}/contacts`);
      setContacts(res.data.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  // Add a user as contact
  const handleAddContact = async (contactId) => {
    try {
      const res = await axios.post(`http://localhost:3003/user/${userId}/add-contact`, {
        userId,
        contactId,
      });
      console.log(res.data.message);
      fetchContacts(); // Refresh contacts
    } catch (err) {
      console.error("Error adding contact:", err.response?.data?.message || err.message);
    }
  };

  // Delete a contact
  const handleDeleteContact = async (contactId) => {
    try {
      const res = await axios.put(`http://localhost:3003/user/${userId}/delete-contact`, {
        userId,
        contactId,
      });
      console.log(res.data.message);
      fetchContacts(); // Refresh contacts
    } catch (err) {
      console.error("Error deleting contact:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchContacts();
  }, [userId]);

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 w-full rounded border border-gray-600 bg-zinc-800 text-white"
      />

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">All Users</h3>
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between p-3 bg-zinc-800 rounded"
            >
              <span>{user.username}</span>
              <button
                onClick={() => handleAddContact(user._id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Your Contacts</h3>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="flex items-center justify-between p-3 bg-zinc-800 rounded"
            >
              <span>{contact.username}</span>
              <button
                onClick={() => handleDeleteContact(contact._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
