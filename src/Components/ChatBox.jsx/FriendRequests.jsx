import React, { useState, useMemo } from 'react';

function FriendRequests() {
  // Mock Friend Request Data
  const [incomingRequests, setIncomingRequests] = useState([
    { id: 'req001', senderName: 'Charlie Brown', senderAvatar: 'https://i.pravatar.cc/50?img=3', message: 'Hi! I\'d like to connect.' },
    { id: 'req002', senderName: 'Diana Prince', senderAvatar: 'https://i.pravatar.cc/50?img=4', message: 'Saw your profile, let\'s chat!' },
  ]);

  const [outgoingRequests, setOutgoingRequests] = useState([
    { id: 'out001', receiverName: 'Eve Taylor', receiverAvatar: 'https://i.pravatar.cc/50?img=9', status: 'Pending' },
    { id: 'out002', receiverName: 'Frank White', receiverAvatar: 'https://i.pravatar.cc/50?img=10', status: 'Pending' },
  ]);

  const handleAcceptRequest = (id, name) => {
    setIncomingRequests(prev => prev.filter(req => req.id !== id));
    alert(`Friend request from ${name} accepted!`);
  };

  const handleDeclineRequest = (id, name) => {
    setIncomingRequests(prev => prev.filter(req => req.id !== id));
    alert(`Friend request from ${name} declined.`);
  };

  const handleCancelRequest = (id, name) => {
    setOutgoingRequests(prev => prev.filter(req => req.id !== id));
    alert(`Friend request to ${name} cancelled.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">FRIEND REQUESTS</h2>
          <button
            onClick={() => alert('Opening "Add Friend" modal... (Simulation)')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            SEND REQUEST
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Incoming Requests */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 border-gray-200">INCOMING REQUESTS ({incomingRequests.length})</h3>
            {incomingRequests.length > 0 ? (
              <div className="space-y-4">
                {incomingRequests.map(request => (
                  <div key={request.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                    <img
                      src={request.senderAvatar}
                      alt={`${request.senderName} Avatar`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 mr-4"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/CCCCCC/000000?text=NA"; }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-900">{request.senderName}</p>
                      <p className="text-gray-600 text-sm italic">{request.message}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleAcceptRequest(request.id, request.senderName)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      >
                        ACCEPT
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(request.id, request.senderName)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      >
                        DECLINE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center p-4 bg-gray-50 rounded-lg border border-gray-200">No new incoming friend requests.</p>
            )}
          </div>

          {/* Outgoing Requests */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 border-gray-200">OUTGOING REQUESTS ({outgoingRequests.length})</h3>
            {outgoingRequests.length > 0 ? (
              <div className="space-y-4">
                {outgoingRequests.map(request => (
                  <div key={request.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                    <img
                      src={request.receiverAvatar}
                      alt={`${request.receiverName} Avatar`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 mr-4"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/CCCCCC/000000?text=NA"; }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-900">{request.receiverName}</p>
                      <p className="text-gray-600 text-sm">Status: <span className="font-medium text-blue-600">{request.status}</span></p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleCancelRequest(request.id, request.receiverName)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      >
                        CANCEL REQUEST
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center p-4 bg-gray-50 rounded-lg border border-gray-200">No pending outgoing friend requests.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;