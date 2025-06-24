import React, { useState, useMemo } from 'react';

function ChatHistoryManager() {
  // Mock Chat History Data (simplified for demonstration)
  const [chatHistories, setChatHistories] = useState([
    { id: 'h1', chatName: 'Alice Smith', type: 'private', messagesCount: 120, lastActivity: '2025-06-20', avatar: 'https://i.pravatar.cc/50?img=1' },
    { id: 'h2', chatName: 'Team Project Alpha', type: 'group', messagesCount: 850, lastActivity: '2025-06-18', avatar: 'https://via.placeholder.com/50/FF5733/FFFFFF?text=TA' },
    { id: 'h3', chatName: 'Bob Johnson', type: 'private', messagesCount: 300, lastActivity: '2025-06-19', avatar: 'https://i.pravatar.cc/50?img=2' },
    { id: 'h4', chatName: 'DevOps Squad', type: 'group', messagesCount: 210, lastActivity: '2025-06-15', avatar: 'https://via.placeholder.co/50x50/3366FF/FFFFFF?text=DS' },
    { id: 'h5', chatName: 'Friend Group Beta', type: 'group', messagesCount: 50, lastActivity: '2025-06-10', avatar: 'https://via.placeholder.co/50x50/FFD700/000000?text=FB' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredHistories = useMemo(() => {
    let currentHistories = chatHistories;

    if (filterType !== 'All') {
      currentHistories = currentHistories.filter(h => h.type === filterType);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentHistories = currentHistories.filter(h =>
        h.chatName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return currentHistories.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)); // Newest activity first
  }, [chatHistories, searchTerm, filterType]);

  const handleExportHistory = (id, chatName) => {
    alert(`Initiating export for "${chatName}" chat history... (This is a simulation)\n\nOptions might include: PDF, TXT, JSON.`);
    console.log(`Exporting history for: ${chatName}`);
  };

  const handleDeleteHistory = (id, chatName) => {
    if (window.confirm(`Are you sure you want to permanently delete the entire chat history for "${chatName}"? This action cannot be undone.`)) {
      setChatHistories(prev => prev.filter(h => h.id !== id));
      alert(`Chat history for "${chatName}" deleted.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">CHAT HISTORY MANAGER // MEMORY CORE</h2>
          <button
            onClick={() => alert('Exporting all chat histories... (Simulation)')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            EXPORT ALL
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Search chat names..."
            className="p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Chat Types</option>
            <option value="private">Private Chats</option>
            <option value="group">Group Chats</option>
          </select>
        </div>

        {/* Chat Histories List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredHistories.length > 0 ? (
            <div className="space-y-3">
              {filteredHistories.map(history => (
                <div
                  key={history.id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <img
                    src={history.avatar}
                    alt={`${history.chatName} Avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-400 mr-4"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/CCCCCC/000000?text=NA"; }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900">{history.chatName}</p>
                    <p className="text-gray-600 text-sm">
                      Type: <span className="font-medium capitalize">{history.type}</span> | Messages: <span className="font-medium">{history.messagesCount}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Last Activity: {new Date(history.lastActivity).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleExportHistory(history.id, history.chatName)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      title="Export History"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDeleteHistory(history.id, history.chatName)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      title="Delete History"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center p-8 bg-gray-50 rounded-lg border border-gray-200">No chat histories found matching your criteria.</p>
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

export default ChatHistoryManager;