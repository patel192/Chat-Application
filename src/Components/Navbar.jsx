import { Link } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">ChatApp</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-gray-700">
        <Link to="/chats" className="hover:text-blue-600">Chats</Link>
        <Link to="/contacts" className="hover:text-blue-600">Contacts</Link>
        <Link to="/settings" className="hover:text-blue-600">Settings</Link>
      </div>

      {/* Profile / Menu */}
      <div className="flex items-center gap-4">
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            <LogOut className="inline w-4 h-4 mr-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
