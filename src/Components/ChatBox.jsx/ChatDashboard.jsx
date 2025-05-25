import React from 'react'
import { useState,useRef,useEffect } from 'react';
export const ChatDashboard = () => {
    const mockUsers = [
  { id: 'u1', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 'u2', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 'u3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 'u4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/40?img=4' },
];

const mockConversations = [
  {
    id: 'c1',
    type: 'private',
    name: 'Alice Smith',
    avatar: 'https://i.pravatar.cc/40?img=1',
    lastMessage: 'Hey, how are you?',
    time: '10:30 AM',
    unread: 2,
    messages: [
      { id: 'm1', sender: 'Alice Smith', text: 'Hi there!', timestamp: '10:25 AM' },
      { id: 'm2', sender: 'You', text: 'Hey Alice! I am good, how about you?', timestamp: '10:27 AM' },
      { id: 'm3', sender: 'Alice Smith', text: 'Doing great, thanks!', timestamp: '10:30 AM' },
    ]
  },
  {
    id: 'c2',
    type: 'private',
    name: 'Bob Johnson',
    avatar: 'https://i.pravatar.cc/40?img=2',
    lastMessage: 'See you tomorrow!',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm4', sender: 'You', text: 'Sure, catch you then!', timestamp: 'Yesterday' },
      { id: 'm5', sender: 'Bob Johnson', text: 'Awesome!', timestamp: 'Yesterday' },
    ]
  },
  {
    id: 'c3',
    type: 'group',
    name: 'Team Project Alpha',
    avatar: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=TA', // Placeholder for group
    lastMessage: 'Don’t forget the meeting at 3 PM.',
    time: 'Fri',
    unread: 5,
    messages: [
      { id: 'm6', sender: 'Charlie Brown', text: 'Good morning, team!', timestamp: 'Fri' },
      { id: 'm7', sender: 'You', text: 'Morning!', timestamp: 'Fri' },
      { id: 'm8', sender: 'Diana Prince', text: 'Don’t forget the meeting at 3 PM.', timestamp: 'Fri' },
    ]
  },
];


  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref to scroll to the latest message

  // Scroll to the bottom of messages when selectedConversation or messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation, selectedConversation.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: `m${selectedConversation.messages.length + 1}`, // Simple unique ID
      sender: 'You', // This would come from authenticated user data
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    // This is a static update for demonstration.
    // In a real app, you'd send this to a backend via WebSocket/API.
    setSelectedConversation(prevConv => ({
      ...prevConv,
      messages: [...prevConv.messages, newMsg]
    }));
    setNewMessage('');
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 text-white flex flex-col">
        {/* User Profile / Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://i.pravatar.cc/40?img=5" // Current user's avatar
              alt="User Avatar"
              className="h-10 w-10 rounded-full mr-3 border-2 border-blue-400"
            />
            <span className="font-semibold text-lg">My Profile</span>
          </div>
          {/* You can add a settings or logout icon here */}
          <button className="text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.313.885 2.443 2.443a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.885 3.313-2.443 2.443a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.313-.885-2.443-2.443a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.885-3.313 2.443-2.443a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
        </div>

        {/* Search Bar (Optional) */}
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search chats or users..."
            className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`flex items-center p-4 border-b border-gray-700 cursor-pointer ${
                selectedConversation.id === conv.id ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <img
                src={conv.avatar}
                alt={conv.name}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{conv.name}</h3>
                <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">{conv.time}</span>
                {conv.unread > 0 && (
                  <span className="block mt-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        {selectedConversation ? (
          <div className="p-4 border-b border-gray-200 flex items-center bg-gray-50">
            <img
              src={selectedConversation.avatar}
              alt={selectedConversation.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">{selectedConversation.name}</h2>
            {/* Add online status or call icons here */}
          </div>
        ) : (
          <div className="p-4 border-b border-gray-200 flex items-center bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Select a chat to start messaging</h2>
          </div>
        )}


        {/* Messages Display Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-md ${
                  message.sender === 'You'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="font-semibold text-sm mb-1">
                  {message.sender === 'You' ? '' : message.sender}
                </p>
                <p>{message.text}</p>
                <span className={`block text-xs mt-1 ${message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll to this element */}
        </div>

        {/* Message Input Bar */}
        {selectedConversation && (
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <svg className="h-6 w-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        )}
      </div>
    </div>
    );
}
