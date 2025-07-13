import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "My_Images"); // Your upload preset
    formData.append("cloud_name", "dfaou6haj");     // Your Cloud name

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dfaou6haj/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      toast.error("Image upload failed");
      return "";
    }
  };

  const SubmitHandler = async (data) => {
    try {
      let profilePicURL = imageUrl;
      if (data.profilePic[0]) {
        profilePicURL = await uploadImage(data.profilePic[0]);
      }

      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
        profilePic: profilePicURL,
        status: data.status || "Hey there! I'm using ChatApp",
      };

      const res = await axios.post("http://localhost:3003/user", userData);

      if (res.status === 201) {
        toast.success("User Created Successfully!", { position: "top-center" });
        reset();
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("User not created");
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
              {...register("username", { required: true })}
              placeholder="Choose a username"
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
              {...register("email", { required: true })}
              placeholder="you@example.com"
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
              {...register("password", { required: true })}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Status Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status (optional)
            </label>
            <input
              type="text"
              {...register("status")}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("profilePic")}
              className="w-full text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
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
