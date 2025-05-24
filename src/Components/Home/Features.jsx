import React from 'react'

export const Features = () => {
    const chatFeatures = [
    {
      id: 1,
      title: 'Real-time Messaging',
      description: 'Send and receive messages instantly, ensuring you never miss a beat in your conversations.',
      icon: (
        <svg className="h-10 w-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Group Chats',
      description: 'Create and join groups to chat with multiple friends, family, or colleagues simultaneously.',
      icon: (
        <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2c-.003-.001-.006-.003-.009-.007-.035-.06-.065-.12-.09-.183A8.96 8.96 0 012 15V4c0-1.105.9-2 2-2h12a2 2 0 012 2v2M2 8h16M2 12h16m-6 4h.01M17 16l4 4m-4-4l-4 4m-4-4l4 4"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Rich Media Sharing',
      description: 'Share photos, videos, documents, and other files with ease, making conversations more expressive.',
      icon: (
        <svg className="h-10 w-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'End-to-End Encryption',
      description: 'Your conversations are secure and private with industry-standard end-to-end encryption.',
      icon: (
        <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Voice & Video Calls',
      description: 'Connect with crystal-clear voice and video calls, bringing your conversations to life.',
      icon: (
        <svg className="h-10 w-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Customizable Profiles',
      description: 'Personalize your profile with custom avatars, statuses, and more to express yourself.',
      icon: (
        <svg className="h-10 w-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
          Powerful Features for Seamless Communication
        </h1>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Discover what makes ChatApp the ultimate platform for connecting with anyone, anywhere, anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {chatFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center text-center"
            >
              <div className="flex-shrink-0 mb-4">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
