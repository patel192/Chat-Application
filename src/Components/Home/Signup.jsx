import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      const res = await axios.post("/user", data);
      if (res.status === 201) {
        toast.success("User Created Successfully!", {
          position: "top-center",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("User Not Created");
      }
    } catch (err) {
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1D51] via-[#1f3b73] to-[#3e63d3] flex flex-col justify-center items-center px-4 py-12">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
          Create Your ChatApp Account
        </h2>

        <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              {...register("username", { required: true })}
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-blue-700 cursor-pointer text-white font-semibold rounded-lg shadow-md transition duration-800"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mb-6">
          Already registered?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};
