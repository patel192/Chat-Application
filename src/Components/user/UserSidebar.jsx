
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaComments,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
export const UserSidebar = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <aside className="min-h-screen w-64 bg-gradient-to-b from-[#0B1D51] to-[#3e63d3] text-white flex flex-col py-8 px-4 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-10 text-purple-200">
        Menu
      </h2>
      <nav className="flex flex-col gap-4 text-lg">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition"
        >
          <FaTachometerAlt /> Dashboard
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition"
        >
          <FaComments /> Chat
        </button>
        <button
          onClick={() => navigate("/contacts")}
          className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition"
        >
          <FaUserFriends /> Contacts
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition"
        >
          <FaCog /> Settings
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-red-600 px-4 py-2 rounded transition mt-auto text-red-200"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  )
}
