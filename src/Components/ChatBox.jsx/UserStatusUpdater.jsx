import React, { useState } from 'react';

function UserStatusUpdater() {
  // Mock current user's status and message
  const [currentStatus, setCurrentStatus] = useState('Online'); // Online, Away, Busy, Offline
  const [customMessage, setCustomMessage] = useState('Ready for connections.');

  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [newCustomMessage, setNewCustomMessage] = useState(customMessage);

  const [saveStatus, setSaveStatus] = useState('');

  const statusOptions = ['Online', 'Away', 'Busy', 'Offline'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return 'bg-green-500';
      case 'Away': return 'bg-yellow-500';
      case 'Busy': return 'bg-red-500';
      case 'Offline': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setSaveStatus('UPDATING STATUS...');
    // Simulate API call to update status
    setTimeout(() => {
      setCurrentStatus(selectedStatus);
      setCustomMessage(newCustomMessage);
      setSaveStatus('STATUS UPDATED SUCCESSFULLY!');
      setTimeout(() => setSaveStatus(''), 3000); // Clear message
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">UPDATE STATUS // OPERATOR PRESENCE</h2>
          <div className="flex items-center">
            <span className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(currentStatus)}`}></span>
            <span className="font-medium">{currentStatus}</span>
          </div>
        </div>

        <form onSubmit={handleUpdateStatus} className="p-6 space-y-6">
          {/* Current Status Display */}
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-gray-600 mb-2">YOUR CURRENT STATUS</p>
            <div className="flex items-center justify-center">
              <span className={`w-6 h-6 rounded-full mr-3 ${getStatusColor(currentStatus)}`}></span>
              <span className="text-2xl font-bold text-gray-900">{currentStatus}</span>
            </div>
            <p className="text-gray-700 text-md mt-2 italic">"{customMessage || 'No custom message'}"</p>
          </div>

          {/* Select New Status */}
          <div>
            <label htmlFor="statusSelect" className="block text-lg font-semibold text-gray-800 mb-2">SELECT NEW STATUS</label>
            <select
              id="statusSelect"
              name="statusSelect"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 text-lg"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Status Message */}
          <div>
            <label htmlFor="customMessage" className="block text-lg font-semibold text-gray-800 mb-2">CUSTOM STATUS MESSAGE</label>
            <input
              type="text"
              id="customMessage"
              name="customMessage"
              value={newCustomMessage}
              onChange={(e) => setNewCustomMessage(e.target.value)}
              placeholder="e.g., Working on Project Alpha..."
              maxLength="50"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
            />
            <p className="text-gray-500 text-xs mt-1 text-right">{newCustomMessage.length}/50 characters</p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            APPLY STATUS UPDATE
          </button>

          {/* Save Status Message */}
          {saveStatus && (
            <p className={`mt-4 text-center font-bold text-sm ${saveStatus.includes('SUCCESS') ? 'text-green-600' : 'text-blue-600'}`}>
              {saveStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserStatusUpdater;