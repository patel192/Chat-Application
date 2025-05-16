import React from 'react'

export const ChatSidebar = () => {
  return (
  <div className="w-full md:w-1/4 border-r p-4 h-full overflow-y-auto">
      <input
        type="text"
        placeholder="Search chats..."
        className="w-full p-2 mb-4 border rounded"
      />
      {/* List of recent chats */}
      <div className="space-y-3">
        <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
          John Doe
        </div>
        <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
          Jane Smith
        </div>
        {/* Repeat for more chats */}
      </div>
    </div>
  )
}
