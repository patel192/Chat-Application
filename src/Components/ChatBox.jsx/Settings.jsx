import React from 'react'
import axios from "axios";
import { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Settings = () => {
  const userId = localStorage.getItem("userId");
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user/${userId}`);
        const data = res.data.data;
        setUser(data);
        setPreview(data.profilePic);
        setValue("username", data.username);
        setValue("status", data.status);
      } catch (err) {
        toast.error("Error loading settings");
      }
    };
    fetchUser();
  }, [userId, setValue]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "My_Images");
    formData.append("cloud_name", "dfaou6haj");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dfaou6haj/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      let imgURL = preview;

      if (data.profilePic && data.profilePic[0]) {
        const uploaded = await uploadToCloudinary(data.profilePic[0]);
        if (uploaded) {
          imgURL = uploaded;
        }
      }

      const update = {
        username: data.username,
        status: data.status,
        profilePic: imgURL,
      };

      const res = await axios.put(`/user/${userId}`, update);
      if (res.status === 200) {
        toast.success("Updated Successfully");
        setUser(res.data.data);
        localStorage.setItem("userName", res.data.data.username);
        localStorage.setItem("userPic", res.data.data.profilePic);
        setEditMode(false);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!user) return null;
  return (
     <div className="min-h-screen bg-gradient-to-br from-[#0B1D51] via-[#1f3b73] to-[#3e63d3] flex flex-col items-center justify-center px-4 py-12">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Account Settings
        </h2>

        {!editMode ? (
          <>
            <div className="flex flex-col items-center gap-4 mb-8">
              <img
                src={user.profilePic}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
              />
              <h3 className="text-xl font-semibold">{user.username}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">💬 {user.status || "No status"}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Profile Pic Upload */}
            <div className="flex items-center gap-4">
              <img
                src={preview}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <input
                type="file"
                accept="image/*"
                {...register("profilePic")}
                onChange={(e) =>
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
                className="text-sm text-gray-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                {...register("status")}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
