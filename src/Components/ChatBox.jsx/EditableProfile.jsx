import React from "react";
import { useState } from "react";
export const EditableProfile = ({ userProfile, onCancelEdit, onSaveEdit }) => {
  const [formData, setFormData] = useState(userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSaveEdit(formData); // Pass updated data back to parent
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          {/* Add more editable fields as needed */}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onCancelEdit}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
