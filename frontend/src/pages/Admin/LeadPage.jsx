import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import axios from "axios";
import Sidebar from "../Admin/Sidebar";

const API_URL = "http://localhost:5000/api/leads";

const LeadPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  // ✅ Fetch leads from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(API_URL);
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  // ✅ Add a new lead
  const handleAddLead = async () => {
    if (!newLead.name || !newLead.email || !newLead.phone) return;
    try {
      const response = await axios.post(API_URL, newLead);
      setLeads([...leads, response.data]);
      setNewLead({ name: "", email: "", phone: "", status: "New" });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  // ✅ Update lead status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      setLeads(
        leads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  // Filter leads based on status
  const filteredLeads =
    selectedFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === selectedFilter);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="p-4 sm:p-8 w-full bg-white min-h-screen text-black">
        <h2 className="text-2xl sm:text-4xl font-bold text-orange-600 text-center mb-6 sm:mb-8">
          📞 Leads & Inquiries
        </h2>

        {/* Filters & Add Lead Button */}
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

        {/* Responsive Table */}
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
                {filteredLeads.map((lead) => (
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
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Modal for Viewing Lead */}
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

        {/* Modal for Adding a Lead */}
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
};

export default LeadPage;
