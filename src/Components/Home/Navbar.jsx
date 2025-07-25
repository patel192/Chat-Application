import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-400">
          <a href="/" className="hover:text-blue-300 transition duration-300">
            ChatApp
          </a>
        </div>

        <ul className="flex space-x-6 items-center">
          <li>
            <a
              href="/features"
              className="text-gray-300 hover:text-blue-700 transition duration-300 text-lg"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-gray-300 hover:text-blue-700 transition duration-300 text-lg"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/blockedusers"
              className="text-gray-300 hover:text-blue-700 transition duration-300 text-lg"
            >
              Blocked-Users
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className="text-gray-300 hover:text-blue-700 transition duration-300 text-lg"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-gray-300 hover:text-blue-700 transition duration-300 text-lg"
            >
              Contact
            </a>
          </li>
          <li>
            <button className="bg-transparent text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition duration-300 text-lg">
              <a href="/login">Login</a>
            </button>
          </li>
          <li>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg">
              <a href="/signup">Sign Up</a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
