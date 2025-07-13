
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserNavbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const profilePic = localStorage.getItem("userPic");

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-zinc-950 text-[#91C8E4] px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-500">Chatify</h1>

      <div className="relative">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <img
            src={profilePic}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
          />
          <span className="hidden sm:inline text-sm font-medium">
            {userName}
          </span>
        </div>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
            <ul className="py-2 text-sm">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
