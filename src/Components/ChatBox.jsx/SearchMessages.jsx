import React, { useState, useMemo } from 'react';

function SearchMessages() {
  // Mock Messages for Search (simplified, in a real app this would be a large dataset or fetched)
  const [allMessages] = useState([
    { id: 'm001', sender: 'Alice Smith', chatName: 'Alice Smith', text: 'Hey, how are you doing today?', timestamp: '2025-06-20 10:30 AM' },
    { id: 'm002', sender: 'You', chatName: 'Alice Smith', text: 'I\'m good, just finishing up some reports. You?', timestamp: '2025-06-20 10:31 AM' },
    { id: 'm003', sender: 'Bob Johnson', chatName: 'Bob Johnson', text: 'Remember the meeting at 3 PM about Project X.', timestamp: '2025-06-19 02:00 PM' },
    { id: 'm004', sender: 'You', chatName: 'Bob Johnson', text: 'Got it, thanks for the reminder!', timestamp: '2025-06-19 02:01 PM' },
    { id: 'm005', sender: 'Charlie Brown', chatName: 'Team Project Alpha', text: 'Anyone have the latest design mockups?', timestamp: '2025-06-18 09:00 AM' },
    { id: 'm006', sender: 'Diana Prince', chatName: 'Team Project Alpha', text: 'I\'ve uploaded them to the shared drive. Link in docs.', timestamp: '2025-06-18 09:05 AM' },
    { id: 'm007', sender: 'You', chatName: 'Team Project Alpha', text: 'Found them, thanks Diana!', timestamp: '2025-06-18 09:07 AM' },
    { id: 'm008', sender: 'Alice Smith', chatName: 'Alice Smith', text: 'Are you free for a quick call later this week?', timestamp: '2025-06-17 04:15 PM' },
    { id: 'm009', sender: 'You', chatName: 'Alice Smith', text: 'Yes, let\'s schedule something for Thursday.', timestamp: '2025-06-17 04:20 PM' },
    { id: 'm010', sender: 'Bob Johnson', chatName: 'Bob Johnson', text: 'Can you review the code for the new feature?', timestamp: '2025-06-16 11:00 AM' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSender, setFilterSender] = useState('All');
  const [filterChat, setFilterChat] = useState('All');

  const uniqueSenders = useMemo(() => {
    const senders = [...new Set(allMessages.map(msg => msg.sender))];
    return ['All', ...senders];
  }, [allMessages]);

  const uniqueChats = useMemo(() => {
    const chats = [...new Set(allMessages.map(msg => msg.chatName))];
    return ['All', ...chats];
  }, [allMessages]);

  const filteredMessages = useMemo(() => {
    let currentMessages = allMessages;

    if (filterSender !== 'All') {
      currentMessages = currentMessages.filter(msg => msg.sender === filterSender);
    }
    if (filterChat !== 'All') {
      currentMessages = currentMessages.filter(msg => msg.chatName === filterChat);
    }
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentMessages = currentMessages.filter(msg =>
        msg.text.toLowerCase().includes(lowerCaseSearchTerm) ||
        msg.sender.toLowerCase().includes(lowerCaseSearchTerm) ||
        msg.chatName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return currentMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first
  }, [allMessages, filterSender, filterChat, searchTerm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">SEARCH MESSAGES // CHAT HISTORY</h2>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterSender('All');
              setFilterChat('All');
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 16.087V12m6.201 4.261l-2.6-2.6m0 0L4 12m0 0l2.6-2.6M4 12h16"></path></svg>
            RESET FILTERS
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Search keywords in messages..."
            className="col-span-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterSender}
            onChange={(e) => setFilterSender(e.target.value)}
          >
            <option value="All">All Senders</option>
            {uniqueSenders.map(sender => (
              <option key={sender} value={sender}>{sender}</option>
            ))}
          </select>
          <select
            className="p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterChat}
            onChange={(e) => setFilterChat(e.target.value)}
          >
            <option value="All">All Chats</option>
            {uniqueChats.map(chat => (
              <option key={chat} value={chat}>{chat}</option>
            ))}
          </select>
          <button
            onClick={() => alert('Performing advanced search... (Simulation)')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center justify-center text-sm col-span-1 md:col-span-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM3 10v.01M3 14v.01"></path></svg>
            SEARCH HISTORY
          </button>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredMessages.length > 0 ? (
            <div className="space-y-3">
              {filteredMessages.map(msg => (
                <div
                  key={msg.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-600">{msg.sender}</span>
                    <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-800 mb-2">{msg.text}</p>
                  <p className="text-gray-600 text-sm italic">
                    In chat: <span className="font-medium text-gray-700">{msg.chatName}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center p-8 bg-gray-50 rounded-lg border border-gray-200">No messages found matching your search criteria.</p>
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

export default SearchMessages;