
export const FriendInfo = ({ user, onClose }) => {
     if (!user) return null; // Don't render if no user is selected
  return (
   <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Contact Info</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* Profile Details */}
      <div className="p-4 flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-24 w-24 rounded-full object-cover border-4 border-blue-400 mb-4 shadow-md"
        />
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        {user.username && <p className="text-gray-600 text-sm">@{user.username}</p>}
      </div>

      {/* Additional Info */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {user.bio && (
          <div>
            <p className="text-sm font-semibold text-gray-600">Bio</p>
            <p className="text-gray-800">{user.bio}</p>
          </div>
        )}
        {user.email && (
          <div>
            <p className="text-sm font-semibold text-gray-600">Email</p>
            <p className="text-gray-800">{user.email}</p>
          </div>
        )}
        {user.location && (
          <div>
            <p className="text-sm font-semibold text-gray-600">Location</p>
            <p className="text-gray-800">{user.location}</p>
          </div>
        )}
        {user.joinDate && (
          <div>
            <p className="text-sm font-semibold text-gray-600">Joined On</p>
            <p className="text-gray-800">{user.joinDate}</p>
          </div>
        )}
      </div>
    </div>
  )
}
