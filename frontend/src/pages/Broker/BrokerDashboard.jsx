import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  FaSearch,
  FaUserCircle,
  FaBell,
  FaClipboardList,
  FaHandshake,
  FaTrashAlt,
} from "react-icons/fa";
import BrokerSidebar from "./BrokerSidebar";

export default function BrokerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingTasks, setPendingTasks] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [brokerEmail, setBrokerEmail] = useState("");

  const [metrics] = useState({
    totalLeads: 120,
    totalProperties: 45,
    totalInquiries: 78,
    totalRevenue: "$500,000",
    totalDealsClosed: 30,
    SuccessRate: "25%",
  });

  const [notifications] = useState([
    { message: "New lead assigned to you" },
    { message: "Client inquiry for property #456" },
  ]);

  const [recentDeals] = useState([
    { client: "John Doe", property: "Apartment #123", status: "Closed" },
    { client: "Jane Smith", property: "Villa #789", status: "Pending" },
  ]);

  const leadTrends = {
    labels: ["Week", "Month", "Year"],
    datasets: [
      {
        label: "Lead Trends",
        data: [30, 150, 1200],
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        borderColor: "#FFA500",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.email) {
        setBrokerEmail(decoded.email);
      }
    }
  }, []);

  useEffect(() => {
    if (brokerEmail) {
      axios
        .get(`http://localhost:5000/api/tasks/${brokerEmail}`)
        .then((res) => {
          const pending = res.data.filter((task) => task.completed === false);
          setPendingTasks(pending);
        })
        .catch((err) => console.error("Fetching tasks failed:", err));
    }
  }, [brokerEmail]);

  const handleDeleteNotification = (taskId) => {
    setPendingTasks((prev) => prev.filter((task) => task.TaskId !== taskId));
  };

  return (
    <div className="p-6 bg-white min-h-screen flex w-full text-gray-900 relative">
      <BrokerSidebar />
      


      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 p-3 rounded-lg bg-gray-100 text-gray-900 shadow-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex gap-4 items-center relative">
            <div
              className="relative group cursor-pointer"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <FaBell className="text-3xl text-slate-700" />
              {pendingTasks.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {pendingTasks.length}
                </span>
              )}
              {showNotifications && (
                <div className="absolute top-10 right-0 w-80 bg-white shadow-lg border border-orange-300 rounded-lg z-10">
                  <h3 className="font-semibold text-gray-700 px-4 pt-3">🔔 Pending Tasks</h3>
                  {pendingTasks.length > 0 ? (
                    <ul className="max-h-64 overflow-auto px-4 py-2">
                      {pendingTasks.map((task, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center border-b border-gray-200 py-2 text-sm"
                        >
                          <span>{task.task}</span>
                          <button
                            onClick={() => handleDeleteNotification(task.TaskId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-500">No pending tasks</p>
                  )}
                </div>
              )}
            </div>
            <FaUserCircle className="text-4xl text-blue-600" />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Object.entries(metrics).map(([key, value], index) => (
            <div key={index} className="p-6 bg-orange-400 rounded-xl shadow-lg border-l-4 border-orange-500">
              <h2 className="text-md font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </h2>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-300">
          <h2 className="text-lg font-semibold text-gray-700">📊 Lead Trends</h2>
          <Line data={leadTrends} className="mt-4" />
        </div>

        {/* Recent Deals */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6 border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaHandshake className="mr-2 text-orange-500" /> Recent Deals
          </h2>
          <ul className="mt-4">
            {recentDeals.map((deal, index) => (
              <li key={index} className="border-b border-gray-300 p-2 text-gray-700">
                {deal.client} - {deal.property} ({deal.status})
              </li>
            ))}
          </ul>
        </div>

        {/* Pending Tasks Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6 border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaClipboardList className="mr-2 text-orange-500" /> Pending Tasks
          </h2>
          <ul className="mt-4">
            {pendingTasks.map((task, index) => (
              <li key={index} className="border-b border-gray-300 p-2 text-gray-700">
                {task.task}
              </li>
            ))}
          </ul>
        </div>

        {/* Static Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6 border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">🔔 Notifications</h2>
          <ul className="mt-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="border-b border-gray-300 p-2 text-gray-700">
                  {notification.message}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No new notifications</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
 