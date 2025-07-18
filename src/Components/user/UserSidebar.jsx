import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaComments,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaBell,
  FaUser,
  FaQuestionCircle
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
        <SidebarButton icon={<FaComments />} label="Chats" onClick={() => navigate("/dashboard/chats")} />
        <SidebarButton icon={<FaUserFriends />} label="Contacts" onClick={() => navigate("/contacts")} />
        <SidebarButton icon={<FaUsers />} label="Groups" onClick={() => navigate("/groups")} />
        <SidebarButton icon={<FaBell />} label="Notifications" onClick={() => navigate("/notifications")} />
        <SidebarButton icon={<FaUser />} label="Profile" onClick={() => navigate("/profile")} />
        <SidebarButton icon={<FaCog />} label="Settings" onClick={() => navigate("/settings")} />
        <SidebarButton icon={<FaQuestionCircle />} label="Help & Support" onClick={() => navigate("/help")} />
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 hover:bg-red-600 px-4 py-2 rounded transition mt-auto text-red-200"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

// Reusable sidebar button
const SidebarButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition"
  >
    {icon} {label}
  </button>
);
