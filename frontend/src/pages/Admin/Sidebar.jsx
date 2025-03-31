// Sidebar Component
import { Link } from "react-router-dom";
import { FaHome, FaBuilding, FaUserTie, FaStar, FaUser, FaClipboardList, FaFileAlt, FaCog, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white text-black p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-2 hover:text-blue-400">
            <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/projects" className="flex items-center space-x-2 hover:text-blue-400">
            <FaBuilding /> <span>Properties</span>
          </Link>
        </li>
        <li>
          <Link to="/leads" className="flex items-center space-x-2 hover:text-blue-400">
            <FaClipboardList /> <span>Leads</span>
          </Link>
        </li>
        
        <li>
          <Link to="/appointment" className="flex items-center space-x-2 hover:text-blue-400">
            <FaUsers /> <span>Appointments</span>
          </Link>
        </li>
        <li>
          <Link to="/agents" className="flex items-center space-x-2 hover:text-blue-400">
            <FaUserTie /> <span>Agents</span>
          </Link>
        </li>
        
        <li>
          <Link to="/profile" className="flex items-center space-x-2 hover:text-blue-400">
            <FaUser /> <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center space-x-2 hover:text-blue-400">
            <FaCog /> <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/support" className="flex items-center space-x-2 hover:text-blue-400">
            <FaUser /> <span>Support</span>
          </Link>
        </li>

        <li>
          <Link to="/sign-in" className="flex items-center space-x-2 hover:text-blue-400">
            <FaUsers /> <span>LogOut</span>
          </Link>

        </li>
      </ul>
    </div>
  );
};

export default Sidebar;