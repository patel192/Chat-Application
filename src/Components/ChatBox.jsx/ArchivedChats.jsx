import React, { useState, useMemo } from 'react';

function ArchivedChats() {
  // Mock Archived Conversation Data
  const [archivedConversations, setArchivedConversations] = useState([
    {
      id: 'arch1',
      type: 'private',
      name: 'Old Friend Echo',
      avatar: 'https://i.pravatar.cc/40?img=11',
      lastMessage: 'It was a pleasure working with you on Project Phoenix.',
      archiveDate: '2024-05-01',
      unread: 0,
    },
    {
      id: 'arch2',
      type: 'group',
      name: 'Legacy Team Alpha Discussion',
      avatar: 'https://via.placeholder.com/40/FFC300/FFFFFF?text=LTA',
      lastMessage: 'The final report has been submitted.',
      archiveDate: '2024-03-10',
      unread: 3, // Can still have unread messages if archived
    },
    {
      id: 'arch3',
      type: 'private',
      name: 'Former Colleague Zero',
      avatar: 'https://i.pravatar.cc/40?img=12',
      lastMessage: 'Remember to clear your old system logs.',
      archiveDate: '2023-11-15',
      unread: 0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredArchivedConversations = useMemo(() => {
    return archivedConversations.filter(conv =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.archiveDate) - new Date(a.archiveDate)); // Sort by most recently archived
  }, [archivedConversations, searchTerm]);

  const handleRestoreChat = (id, name) => {
    if (window.confirm(`Are you sure you want to restore "${name}" from archives?`)) {
      setArchivedConversations(prev => prev.filter(conv => conv.id !== id));
      // In a real app, this would also move the conversation back to the active chats list
      alert(`Conversation with "${name}" restored!`);
    }
  };

  const handleDeleteArchivedChat = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from archives? This action cannot be undone.`)) {
      setArchivedConversations(prev => prev.filter(conv => conv.id !== id));
      alert(`Conversation with "${name}" permanently deleted.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">ARCHIVED CONVERSATIONS</h2>
          <button
            onClick={() => alert('Opening "Archive Settings" modal... (Simulation)')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.313.885 2.443 2.443a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.885 3.313-2.443 2.443a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.313-.885-2.443-2.443a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.885-3.313 2.443-2.443a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            ARCHIVE SETTINGS
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search archived chats..."
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Archived Conversations List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredArchivedConversations.length > 0 ? (
            <div className="space-y-3">
              {filteredArchivedConversations.map(conv => (
                <div
                  key={conv.id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <img
                    src={conv.avatar}
                    alt={`${conv.name} Avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-400 mr-4"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/CCCCCC/000000?text=NA"; }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900">{conv.name}</p>
                    <p className="text-gray-600 text-sm truncate">{conv.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-1">Archived: {new Date(conv.archiveDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {conv.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                            {conv.unread}
                        </span>
                    )}
                    <button
                      onClick={() => handleRestoreChat(conv.id, conv.name)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      title="Restore Chat"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 16.087V12m6.201 4.261l-2.6-2.6m0 0L4 12m0 0l2.6-2.6M4 12h16"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDeleteArchivedChat(conv.id, conv.name)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      title="Delete Permanently"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center p-8 bg-gray-50 rounded-lg border border-gray-200">No archived conversations found.</p>
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

export default ArchivedChats;
