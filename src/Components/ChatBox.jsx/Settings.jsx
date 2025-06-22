import React, { useState } from 'react';

function Settings() {
  // Mock Settings Data
  const [appSettings, setAppSettings] = useState({
    notificationsEnabled: true,
    playSoundOnNewMessage: true,
    privacyMode: 'friends_only', // 'everyone', 'friends_only', 'private'
    autoArchiveChats: false,
    theme: 'system_default', // 'light', 'dark', 'system_default'
    language: 'english',
  });

  const [saveStatus, setSaveStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveStatus('SAVING SETTINGS...');
    // Simulate API call to save settings
    setTimeout(() => {
      console.log('Settings Saved:', appSettings);
      setSaveStatus('SETTINGS UPDATED SUCCESSFULLY!');
      setTimeout(() => setSaveStatus(''), 3000); // Clear message after 3 seconds
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-gray-800">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">APPLICATION SETTINGS</h2>
          <button
            onClick={handleSaveSettings}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-1-4l4 4m-4-4l-4 4m9-4l-4-4m4 4l-4-4M5 7h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"></path></svg>
            SAVE SETTINGS
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Notification Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 border-gray-200">NOTIFICATIONS</h3>
              <div className="flex items-center justify-between py-2">
                <label htmlFor="notificationsEnabled" className="text-gray-700 text-lg">Enable All Notifications</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="notificationsEnabled"
                    name="notificationsEnabled"
                    checked={appSettings.notificationsEnabled}
                    onChange={handleInputChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-2">
                <label htmlFor="playSoundOnNewMessage" className="text-gray-700 text-lg">Play Sound on New Message</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="playSoundOnNewMessage"
                    name="playSoundOnNewMessage"
                    checked={appSettings.playSoundOnNewMessage}
                    onChange={handleInputChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            {/* Privacy Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 pt-4 text-gray-800 border-b pb-2 border-gray-200">PRIVACY</h3>
              <div>
                <label htmlFor="privacyMode" className="block text-gray-700 text-lg mb-2">Who can send me messages?</label>
                <select
                  id="privacyMode"
                  name="privacyMode"
                  value={appSettings.privacyMode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                >
                  <option value="everyone">Everyone</option>
                  <option value="friends_only">Friends Only</option>
                  <option value="private">No One (Private Mode)</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-2 mt-4">
                <label htmlFor="autoArchiveChats" className="text-gray-700 text-lg">Auto-archive old chats (30 days)</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="autoArchiveChats"
                    name="autoArchiveChats"
                    checked={appSettings.autoArchiveChats}
                    onChange={handleInputChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            {/* General & Appearance Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 pt-4 text-gray-800 border-b pb-2 border-gray-200">GENERAL & APPEARANCE</h3>
              <div>
                <label htmlFor="theme" className="block text-gray-700 text-lg mb-2">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={appSettings.theme}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                >
                  <option value="system_default">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <p className="text-gray-500 text-sm mt-1">Note: Theme selection is for demonstration purposes only and does not change the actual display.</p>
              </div>
              <div className="mt-4">
                <label htmlFor="language" className="block text-gray-700 text-lg mb-2">Language</label>
                <select
                  id="language"
                  name="language"
                  value={appSettings.language}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>
            </div>

            {/* Save Status Message */}
            {saveStatus && (
              <p className={`mt-6 text-center font-bold text-sm ${saveStatus.includes('SUCCESS') ? 'text-green-600' : 'text-blue-600'}`}>
                {saveStatus}
              </p>
            )}
          </form>
        </div>
      </div>
      <style>
        {`
        /* The switch - the box around the slider */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 28px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        /* The slider */
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

        /* Rounded sliders */
        .slider.round {
          border-radius: 28px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
        `}
      </style>
    </div>
  );
}

export default Settings;