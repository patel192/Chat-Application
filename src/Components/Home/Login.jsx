import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      const res = await axios.post("/login", data);
      if (res.status === 200) {
        const user = res.data.data;

        // Store user data in localStorage
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userName", user.username);
        localStorage.setItem("userPic", user.profilePic);

        toast.success("Login successful!", { position: "top-center" });

        reset();
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1D51] via-[#1f3b73] to-[#3e63d3] flex flex-col justify-center items-center px-4 py-12">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
          Login
        </h2>

        <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
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
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 h-4 w-4 rounded"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-purple-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-700"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mb-6">
          New here?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};
