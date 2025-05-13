import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import BrokerSidebar from "../Broker/BrokerSidebar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function BrokerLeadPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New"
  });
  const [brokerEmail, setBrokerEmail] = useState("");

  // Decode JWT once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.email) {
          setBrokerEmail(decoded.email);
        }
      } catch (err) {
        console.error("Token decode failed:", err);
      }
    }
  }, []);

  // Fetch leads for this broker
  useEffect(() => {
    if (!brokerEmail) return;
    axios
      .get(`https://plateau-konnect-1-6hf1.onrender.com/api/leads/broker/${brokerEmail}`)
      .then((res) => setLeads(res.data))
      .catch((err) => console.error("Failed to fetch leads:", err));
  }, [brokerEmail]);

  // Add a new lead
  const handleAddLead = () => {
    if (!newLead.name || !newLead.email || !newLead.phone) return;
    // use same POST /api/leads for admin, includes brokerEmail
    axios
      .post("https://plateau-konnect-1-6hf1.onrender.com/api/leads", {
        ...newLead,
        brokerEmail
      })
      .then((res) => {
        setLeads((prev) => [...prev, res.data]);
        setNewLead({ name: "", email: "", phone: "", status: "New" });
        setShowAddModal(false);
      })
      .catch((err) => console.error("Failed to add lead:", err));
  };

  // Update lead status
  const handleStatusChange = (id, newStatus) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id ? { ...lead, status: newStatus } : lead
      )
    );
    axios
      .put(`https://plateau-konnect-1-6hf1.onrender.com/api/leads/${id}`, { status: newStatus })
      .catch((err) => console.error("Failed to update status:", err));
  };

  const filteredLeads =
    selectedFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === selectedFilter);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BrokerSidebar />
      <div className="flex-1 p-4 sm:p-8 w-full bg-white text-black">
        <h2 className="text-2xl sm:text-4xl font-bold text-orange-600 text-center mb-6 sm:mb-8">
          🏡 Broker Leads & Inquiries
        </h2>

        {/* Filters & Add button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["All", "New", "Contacted", "Follow-up", "Converted", "Lost"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  className={`w-full sm:w-auto text-sm sm:text-base ${
                    selectedFilter === filter
                      ? "bg-white text-black border-black"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              )
            )}
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto bg-orange-600 text-white hover:bg-orange-700"
          >
            + Add Lead
          </Button>
        </div>

        {/* Leads table */}
        <Card className="w-full overflow-x-auto">
          <CardContent>
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 sm:p-3 text-left border">Name</th>
                  <th className="p-2 sm:p-3 text-left border">Email</th>
                  <th className="p-2 sm:p-3 text-left border">Phone</th>
                  <th className="p-2 sm:p-3 text-left border">Status</th>
                  <th className="p-2 sm:p-3 text-left border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="bg-white hover:bg-orange-100 text-black"
                    >
                      <td className="p-2 sm:p-3 border">{lead.name}</td>
                      <td className="p-2 sm:p-3 border">{lead.email}</td>
                      <td className="p-2 sm:p-3 border">{lead.phone}</td>
                      <td className="p-2 sm:p-3 border">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead._id, e.target.value)
                          }
                          className="w-full border rounded p-1 sm:p-2 bg-gray-50 text-black"
                        >
                          {[
                            "New",
                            "Contacted",
                            "Follow-up",
                            "Converted",
                            "Lost",
                          ].map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2 sm:p-3 border">
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto hover:bg-orange-200 text-xs sm:text-sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowModal(true);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-4 text-gray-500"
                    >
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* View Lead Modal */}
        {showModal && selectedLead && (
          <Modal title="Contact Details" onClose={() => setShowModal(false)}>
            <p>
              <strong>Name:</strong> {selectedLead.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedLead.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedLead.phone}
            </p>
            <p>
              <strong>Status:</strong> {selectedLead.status}
            </p>
          </Modal>
        )}

        {/* Add Lead Modal */}
        {showAddModal && (
          <Modal title="Add New Lead" onClose={() => setShowAddModal(false)}>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Name"
                value={newLead.name}
                onChange={(e) =>
                  setNewLead({ ...newLead, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={newLead.email}
                onChange={(e) =>
                  setNewLead({ ...newLead, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={newLead.phone}
                onChange={(e) =>
                  setNewLead({ ...newLead, phone: e.target.value })
                }
              />
            </div>
            <div className="flex justify mt-4">
              <Button
                onClick={handleAddLead}
                className="w-full sm:w-auto bg-orange-600 text-white hover:bg-orange-700"
              >
                Save
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
