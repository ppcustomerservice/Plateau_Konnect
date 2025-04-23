import { Link } from "react-router-dom";
import { FaHome, FaBuilding, FaClipboardList, FaUsers, FaHandshake, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const BrokerSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white text-black p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Broker Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/broker-dashboard" className="flex items-center space-x-2 hover:text-orange-500">
            <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/broker-leadpage" className="flex items-center space-x-2 hover:text-orange-500">
            <FaClipboardList /> <span>Leads</span>
          </Link>
        </li>
        <li>
          <Link to="/Broker-Appointment" className="flex items-center space-x-2 hover:text-orange-500">
            <FaUsers /> <span>Appointments</span>
          </Link>
        </li>
        <li>
          <Link to="/Broker-Task" className="flex items-center space-x-2 hover:text-orange-500">
            <FaUsers /> <span>Task</span>
          </Link>
        </li>
        
        <li>
          <Link to="/profile" className="flex items-center space-x-2 hover:text-orange-500">
            <FaUser /> <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/broker-setting" className="flex items-center space-x-2 hover:text-orange-500">
            <FaCog /> <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/sign-in" className="flex items-center space-x-2 hover:text-red-500">
            <FaSignOutAlt /> <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BrokerSidebar;