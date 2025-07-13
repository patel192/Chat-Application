import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1D51] via-[#1f3b73] to-[#3e63d3] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl text-center">
        {/* App Name */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Connect Instantly. Chat Freely.
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl mb-6 text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to <span className="text-purple-300 font-semibold">ChatApp</span>,
          where conversations come alive. Enjoy real-time messaging, group chats,
          and multimedia sharing — fast, secure, and elegant.
        </motion.p>

        <p className="text-md md:text-lg mb-12 text-blue-200">
          Join our growing global community for effortless communication.
        </p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/login"
            className="px-8 py-3 text-base font-semibold bg-white text-blue-700 rounded-md shadow-md hover:bg-gray-100 transition duration-300 hover:-translate-y-1"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-8 py-3 text-base font-semibold bg-purple-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 hover:-translate-y-1"
          >
            Sign Up
          </Link>
        </motion.div>

        <p className="mt-16 text-sm text-gray-300">
          Already have an account? Log in and start chatting. New here? Sign up in seconds!
        </p>
      </div>
    </div>
  );
};
