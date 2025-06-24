import React, { useState, useMemo } from 'react';

function NotificationCenter() {
  // Mock Notification Data
  const [notifications, setNotifications] = useState([
    { id: 'notif001', type: 'message', sender: 'Alice Smith', content: 'sent you a new message: "Are you free to chat?"', timestamp: '2025-06-20T10:35:00Z', read: false },
    { id: 'notif002', type: 'request', sender: 'Bob Johnson', content: 'sent you a friend request.', timestamp: '2025-06-20T09:00:00Z', read: false },
    { id: 'notif003', type: 'system', content: 'Your chat history has been successfully backed up.', timestamp: '2025-06-19T23:00:00Z', read: true },
    { id: 'notif004', type: 'group', sender: 'Team Project Alpha', content: 'posted a new announcement in the group.', timestamp: '2025-06-19T14:15:00Z', read: false },
    { id: 'notif005', type: 'system', content: 'A new version of ChatApp is available for download.', timestamp: '2025-06-18T10:00:00Z', read: true },
    { id: 'notif006', type: 'message', sender: 'Diana Prince', content: 'mentioned you in "Project X" chat.', timestamp: '2025-06-17T17:45:00Z', read: true },
  ]);

  const [filterType, setFilterType] = useState('All');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = useMemo(() => {
    let currentNotifications = notifications;

    if (filterType !== 'All') {
      currentNotifications = currentNotifications.filter(notif => notif.type === filterType);
    }
    if (showUnreadOnly) {
      currentNotifications = currentNotifications.filter(notif => !notif.read);
    }
    return currentNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first
  }, [notifications, filterType, showUnreadOnly]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDeleteNotification = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type} notification?`)) {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
      alert('Notification deleted.');
    }
  };

  const handleClearAllRead = () => {
    if (window.confirm('Are you sure you want to clear all read notifications?')) {
      setNotifications(prev => prev.filter(notif => !notif.read));
      alert('All read notifications cleared.');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message': return '💬'; // Speech bubble
      case 'request': return '➕'; // Plus sign
      case 'system': return '⚙️'; // Gear
      case 'group': return '👥'; // Two busts
      default: return '🔔'; // Bell
    }
  };

  const getNotificationColorClass = (type) => {
    switch (type) {
      case 'message': return 'border-blue-300 bg-blue-50';
      case 'request': return 'border-yellow-300 bg-yellow-50';
      case 'system': return 'border-gray-300 bg-gray-50';
      case 'group': return 'border-purple-300 bg-purple-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">NOTIFICATION CENTER</h2>
          <button
            onClick={handleClearAllRead}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            CLEAR READ
          </button>
        </div>

        {/* Filter and Toggle */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <select
            className="p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="message">Messages</option>
            <option value="request">Friend Requests</option>
            <option value="system">System Alerts</option>
            <option value="group">Group Notifications</option>
          </select>
          <label className="flex items-center cursor-pointer flex-shrink-0">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only toggle-checkbox"
                checked={showUnreadOnly}
                onChange={() => setShowUnreadOnly(!showUnreadOnly)}
              />
              <div className="block bg-gray-300 w-12 h-6 rounded-full toggle-label"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform toggle-circle"></div>
            </div>
            <span className="ml-3 text-gray-700 text-sm">Show Unread Only</span>
          </label>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  className={`flex items-start p-4 rounded-lg shadow-sm border ${getNotificationColorClass(notif.type)}
                  ${notif.read ? 'opacity-70' : 'font-semibold'}`}
                >
                  <span className="text-2xl mr-3 flex-shrink-0">{getNotificationIcon(notif.type)}</span>
                  <div className="flex-1">
                    <p className={`text-lg mb-1 ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notif.sender && <span className="font-bold">{notif.sender}</span>} {notif.content}
                    </p>
                    <p className="text-gray-500 text-xs">{new Date(notif.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2 ml-4 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Mark as Read"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(notif.id, notif.type)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Notification"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center p-8 bg-gray-50 rounded-lg border border-gray-200">No notifications found matching your criteria. All clear!</p>
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

        /* Toggle switch styles */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 28px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
          border-radius: 28px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196F3; /* Blue */
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(22px);
          -ms-transform: translateX(22px);
          transform: translateX(22px);
        }
        `}
      </style>
    </div>
  );
}

export default NotificationCenter;