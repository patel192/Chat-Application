import React, { useState, useMemo } from 'react';

function BlockedUsers() {
  // Mock Blocked User Data
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 'b1', name: 'Spam_Bot_X', avatar: 'https://placehold.co/50x50/FF0000/FFFFFF?text=BX', blockDate: '2025-06-10' },
    { id: 'b2', name: 'Annoying_Ad_Account', avatar: 'https://placehold.co/50x50/FF0000/FFFFFF?text=AA', blockDate: '2025-05-28' },
    { id: 'b3', name: 'Former_Dispute_Contact', avatar: 'https://i.pravatar.cc/50?img=13', blockDate: '2025-04-15' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlockedUsers = useMemo(() => {
    return blockedUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.blockDate) - new Date(a.blockDate)); // Sort by most recently blocked
  }, [blockedUsers, searchTerm]);

  const handleUnblockUser = (id, name) => {
    if (window.confirm(`Are you sure you want to unblock "${name}"? They will be able to contact you again.`)) {
      setBlockedUsers(prev => prev.filter(user => user.id !== id));
      alert(`User "${name}" unblocked.`);
    }
  };

  const handleBlockNewUser = () => {
    const userNameToBlock = prompt('Enter the username or name of the user to block:');
    if (userNameToBlock && userNameToBlock.trim() !== '') {
      const newBlockedUser = {
        id: `b${Date.now()}`,
        name: userNameToBlock.trim(),
        avatar: `https://placehold.co/50x50/FF0000/FFFFFF?text=BL`, // Generic blocked avatar
        blockDate: new Date().toISOString().split('T')[0], // Current date
      };
      setBlockedUsers(prev => [...prev, newBlockedUser]);
      alert(`User "${userNameToBlock}" has been blocked.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">BLOCKED USERS // DENIED ACCESS</h2>
          <button
            onClick={handleBlockNewUser}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14v.01M12 18h.01"></path></svg>
            BLOCK NEW USER
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search blocked users..."
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Blocked Users List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredBlockedUsers.length > 0 ? (
            <div className="space-y-3">
              {filteredBlockedUsers.map(user => (
                <div
                  key={user.id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <img
                    src={user.avatar}
                    alt={`${user.name} Avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-400 mr-4"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/CCCCCC/000000?text=NA"; }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900">{user.name}</p>
                    <p className="text-gray-600 text-sm">Blocked on: {new Date(user.blockDate).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handleUnblockUser(user.id, user.name)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      title="Unblock User"
                    >
                      UNBLOCK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center p-8 bg-gray-50 rounded-lg border border-gray-200">No users are currently blocked. All clear!</p>
          )}
        </div>
      </div>
      <style>
        {`
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e2e8f0; /* Light gray track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a0aec0; /* Medium gray thumb */
          border-radius: 10px;
          border: 2px solid #e2e8f0; /* Border to match track */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096; /* Darker gray on hover */
        }
        `}
      </style>
    </div>
  );
}

export default BlockedUsers;