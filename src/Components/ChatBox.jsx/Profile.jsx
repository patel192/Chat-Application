import React from 'react'

export const Profile = () => {
    const mockUserProfile = {
  id: 'user123',
  username: 'chatapp_user',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Passionate about connecting with people and exploring new ideas. Always open to a good chat!',
  avatar: 'https://i.pravatar.cc/150?img=5', // A larger avatar for the profile
  joinDate: 'January 15, 2023',
  location: 'New York, USA',
  status: 'Online',
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        {/* Profile Picture Section */}
        <div className="md:w-1/3 p-8 flex flex-col items-center justify-center bg-blue-600 text-white">
          <div className="relative mb-6">
            <img
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              src={mockUserProfile.avatar}
              alt="User Avatar"
            />
            {/* Optional: Add an overlay for changing profile pic */}
            {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div> */}
          </div>
          <h2 className="text-3xl font-bold mb-2">{mockUserProfile.fullName}</h2>
          <p className="text-blue-100 text-lg mb-4">@{mockUserProfile.username}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${mockUserProfile.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
            {mockUserProfile.status}
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
              <p className="text-lg text-gray-800">{mockUserProfile.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Bio</p>
              <p className="text-lg text-gray-800 leading-relaxed">{mockUserProfile.bio}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Location</p>
              <p className="text-lg text-gray-800">{mockUserProfile.location}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Joined ChatApp</p>
              <p className="text-lg text-gray-800">{mockUserProfile.joinDate}</p>
            </div>
          </div>

          <div className="mt-8">
            {/* If you want an edit button */}
            <button
              // onClick={() => alert('Edit profile functionality goes here!')}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
