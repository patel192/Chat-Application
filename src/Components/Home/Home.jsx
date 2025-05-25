import React from "react";

export const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Connect Instantly. Chat Freely.
        </h1>
        <p className="text-xl md:text-2xl mb-10 leading-relaxed">
          Welcome to **ChatApp**, where conversations come alive. Experience
          seamless real-time messaging, secure group chats, and rich media
          sharing with friends, family, and colleagues around the globe.
        </p>
        <p className="text-lg md:text-xl mb-12">
          Join a community built for effortless communication.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Login Button */}
          {/* If using React Router DOM, replace <a> with <Link to="/login"> */}
          <a
            href="/login" // Replace with your actual login route
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-blue-600 bg-white hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Log In
          </a>

          {/* Sign Up Button */}
          {/* If using React Router DOM, replace <a> with <Link to="/signup"> */}
          <a
            href="/signup" // Replace with your actual signup route
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sign Up
          </a>
        </div>

        <p className="text-md mt-16 opacity-80">
          Already have an account? Log in and start chatting! New here? Sign up
          in seconds!
        </p>
      </div>
    </div>
  );
};
