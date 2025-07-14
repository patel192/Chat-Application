import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Settings = () => {
  const userId = localStorage.getItem('userId');
  const { register, handleSubmit, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [preview, setPreview] = useState('');

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user/${userId}`);
        setUserProfile(res.data.data);
        const data = res.data.data;
        setValue('fullName', data.fullName || '');
        setValue('bio', data.bio || '');
        setValue('location', data.location || '');
        setPreview(data.profilePic);
      } catch (err) {
        toast.error('Failed to load profile.');
      }
    };
    fetchUser();
  }, [userId, setValue]);

  // Cloudinary Upload
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'My_Images');
    formData.append('cloud_name', 'dfaou6haj');
    const res = await axios.post('https://api.cloudinary.com/v1_1/dfaou6haj/image/upload', formData);
    return res.data.secure_url;
  };

  // Save Edits
  const onSubmit = async (data) => {
    try {
      let imageUrl = preview;
      if (data.profilePic?.[0]) {
        imageUrl = await uploadToCloudinary(data.profilePic[0]);
      }
      const payload = {
        fullName: data.fullName,
        bio: data.bio,
        location: data.location,
        profilePic: imageUrl,
      };
      const res = await axios.put(`/user/${userId}`, payload);
      setUserProfile(res.data.data);
      setIsEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Update failed!');
    }
  };

  // Status Toggle
  const handleStatusToggle = async () => {
    try {
      const updatedStatus = !userProfile.isOnline;
      const res = await axios.put(`/user/${userId}`, {
        isOnline: updatedStatus,
      });
      setUserProfile((prev) => ({ ...prev, isOnline: updatedStatus }));
      toast.success(`You are now ${updatedStatus ? 'Online' : 'Offline'}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (!userProfile) return null;
  return (
   <div className="min-h-screen bg-gradient-to-br from-[#0B1D51] via-[#1f3b73] to-[#3e63d3] flex items-center justify-center px-4 py-12">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl md:flex overflow-hidden">
        {/* Avatar */}
        <div className="bg-blue-700 text-white p-8 md:w-1/3 flex flex-col items-center">
          <div className="relative mt-20">
            <img
              src={preview}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                {...register('profilePic')}
                onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
                className="mt-2 text-sm"
              />
            )}
          </div>
          <h2 className="text-2xl font-bold mt-4">{userProfile.fullName || 'No name set'}</h2>
          <p className="text-blue-200">@{userProfile.username}</p>
          <button
            onClick={handleStatusToggle}
            className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold shadow-md transition ${
              userProfile.isOnline
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-400 hover:bg-gray-500 text-white'
            }`}
          >
            {userProfile.isOnline ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Details */}
        <div className="p-8 md:w-2/3 bg-white text-gray-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h3 className="text-2xl font-bold border-b pb-2">User Details</h3>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                value={userProfile.email}
                readOnly
                className="w-full bg-gray-100 px-4 py-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  rows="3"
                  {...register('bio')}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="text-gray-700">{userProfile.bio || 'No bio added yet.'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Location</label>
              <input
                type="text"
                {...register('location')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-blue-500"
              />
            </div>

            <div className="flex gap-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
