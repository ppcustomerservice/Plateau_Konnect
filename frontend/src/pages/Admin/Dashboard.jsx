import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "../Admin/Sidebar";
import axios from "axios";

export default function Dashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    totalProperties: 0,
    totalUsers: 0,
    totalBrokers: 0,
    totalBuilders: 0,
    totalBuyers: 0,
    totalInquiries: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [leadTrendsData, setLeadTrendsData] = useState([10, 20, 30]); // Default values

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/metrics");
        console.log(res.data)
        
        setMetrics(res.data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    const fetchRecentLeads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leads");
        setRecentLeads(res.data.slice(-5).reverse());
      } catch (error) {
        console.error("Error fetching recent leads:", error);
      }
    };

    const fetchLeadTrends = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leads/trends");
        console.log("Lead Trends Data:", res.data);
        setLeadTrendsData(res.data.length ? res.data : [10, 20, 30]); // Prevent empty values
      } catch (error) {
        console.error("Error fetching lead trends:", error);
      }
    };

    fetchMetrics();
    fetchRecentLeads();
    fetchLeadTrends();
  }, []);

  const user = {
    name: "Arpita Sharma",
    email: "arpita.sharma@example.com",
  };

  const leadTrends = {
    labels: ["Week", "Month", "Year"],
    datasets: [
      {
        label: "Leads Trends",
        data: leadTrendsData,
        backgroundColor: "rgba(255, 99, 71, 0.5)",
        borderColor: "#ff5733",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const userListingsData = {
    labels: ["Brokers", "Builders", "Buyers"],
    datasets: [
      {
        label: "Listings by User Type",
        data: [metrics.totalBrokers, metrics.totalBuilders, metrics.totalBuyers],
        backgroundColor: ["#ff5733", "#36a2eb", "#ffce56"],
        borderWidth: 2,
      },
    ],
  };

  const propertiesOverview = [
    { title: "Luxury Villa", price: "$500K", status: "Sold", agent: "Mark Watson" },
    { title: "Modern Apartment", price: "$350K", status: "Available", agent: "Emily Clark" },
  ];

  const filteredProperties = propertiesOverview.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex w-full">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg bg-white shadow-md border border-gray-300"
            />
            <FaSearch className="absolute right-4 top-4 text-gray-500" />
          </div>
          <div className="relative">
            <FaUserCircle
              className="text-4xl cursor-pointer text-orange-500 hover:text-orange-400 transition-all"
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
                <p className="text-sm text-gray-700"><strong>Name:</strong> {user.name}</p>
                <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Object.entries(metrics).map(([key, value], index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-lg flex justify-between items-center border border-gray-200">
              <h2 className="text-md font-semibold capitalize text-gray-700">
                {key.replace(/([A-Z])/g, " $1")}
              </h2>
              <p className="text-2xl font-bold text-orange-500">{value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Lead Trends</h2>
            <Line data={leadTrends} className="mt-4" />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Listings by User Type</h2>
            <Bar data={userListingsData} className="mt-4" />
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Leads</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2">{lead.name}</td>
                    <td className="p-2">{lead.email}</td>
                    <td className="p-2">{lead.phone}</td>
                    <td className="p-2">{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Properties Overview Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Properties Overview</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Title</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Agent</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="p-2">{property.title}</td>
                    <td className="p-2">{property.price}</td>
                    <td className="p-2">{property.status}</td>
                    <td className="p-2">{property.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
