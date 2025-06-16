import React from 'react'
import { useState } from 'react';
import { EditableProfile } from './EditableProfile';
export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

  // Initial mock user profile data
  const [userProfile, setUserProfile] = useState({
    id: 'user123',
    username: 'chatapp_user',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about connecting with people and exploring new ideas. Always open to a good chat!',
    avatar: 'https://i.pravatar.cc/150?img=5',
    joinDate: 'January 15, 2023',
    location: 'New York, USA',
    status: 'Online',
  });

  // Function to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to cancel edit mode and revert to view mode
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Function to save edited data (placeholder)
  const handleSaveEdit = (updatedData) => {
    setUserProfile(updatedData); // Update the main profile state
    setIsEditing(false); // Exit edit mode
    console.log('Profile saved:', updatedData);
    // In a real application, you would send this updatedData to a backend API
  };

  if (isEditing) {
    return (
      <EditableProfile 
        userProfile={userProfile} 
        onCancelEdit={handleCancelEdit} 
        onSaveEdit={handleSaveEdit}
      />
    );
  }

 if (isEditing) {
    return (
      <EditableProfile 
        userProfile={userProfile} 
        onCancelEdit={handleCancelEdit} 
        onSaveEdit={handleSaveEdit}
      />
    );
  }

  // Default view: Profile details
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        {/* Profile Picture Section */}
        <div className="md:w-1/3 p-8 flex flex-col items-center justify-center bg-blue-600 text-white">
          <div className="relative mb-6">
            <img
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              src={userProfile.avatar}
              alt="User Avatar"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">{userProfile.fullName}</h2>
          <p className="text-blue-100 text-lg mb-4">@{userProfile.username}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${userProfile.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
            {userProfile.status}
          </span>
        </div>

        {/* User Details Section */}
        <div className="md:w-2/3 p-8 bg-white flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
            About Me
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Email Address</p>
              <p className="text-lg text-gray-800">{userProfile.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Bio</p>
              <p className="text-lg text-gray-800 leading-relaxed">{userProfile.bio}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Location</p>
              <p className="text-lg text-gray-800">{userProfile.location}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Joined ChatApp</p>
              <p className="text-lg text-gray-800">{userProfile.joinDate}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleEditClick} // Attach the onClick handler here
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
