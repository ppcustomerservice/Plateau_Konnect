import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import Sidebar from "../../pages/Admin/Sidebar";
import { axiosPublic } from "../../api/axios";

const AgentPage = () => {
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({ name: "", email: "", phone: "", role: "Broker" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const API_URL = "http://localhost:5000/api/users/agents";

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axiosPublic.get(API_URL);
      console.log(response.data);
      setAgents(response.data);
  
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleAddAgent = async () => {
    if (!newAgent.name || !newAgent.email || !newAgent.phone) return;
    try {
      const response = await axiosPublic.post("/api/users", newAgent);
      setAgents([...agents, response.data]);
      setNewAgent({ name: "", email: "", phone: "", role: "Broker" });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:p-8 w-full bg-white min-h-screen text-black">
        <h2 className="text-2xl sm:text-4xl font-bold text-orange-600 text-center mb-6 sm:mb-8">
          🏢 Agent Management
        </h2>
        <Button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto bg-orange-600 text-white hover:bg-orange-700">
          + Add Agent
        </Button>
        <Card className="w-full overflow-x-auto mt-6">
          <CardContent>
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 sm:p-3 text-left border">Name</th>
                  <th className="p-2 sm:p-3 text-left border">Email</th>
                  <th className="p-2 sm:p-3 text-left border">Phone</th>
                  <th className="p-2 sm:p-3 text-left border">Role</th>
                  <th className="p-2 sm:p-3 text-left border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent,i) => (
                  <tr key={i} className="bg-white hover:bg-orange-100 text-black">
                    <td className="p-2 sm:p-3 border">{agent.fullname}</td>
                    <td className="p-2 sm:p-3 border">{agent.email}</td>
                    <td className="p-2 sm:p-3 border">{agent.mobileNo}</td>
                    <td className="p-2 sm:p-3 border">{agent.role}</td>
                    <td className="p-2 sm:p-3 border">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto hover:bg-orange-200 text-xs sm:text-sm"
                        onClick={() => { setSelectedAgent(agent); setShowModal(true); }}
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

        {showModal && selectedAgent && (
          <Modal title="Agent Details" onClose={() => setShowModal(false)}>
            <p><strong>Name:</strong> {selectedAgent.name}</p>
            <p><strong>Email:</strong> {selectedAgent.email}</p>
            <p><strong>Phone:</strong> {selectedAgent.phone}</p>
            <p><strong>Role:</strong> {selectedAgent.role}</p>
          </Modal>
        )}

        {showAddModal && (
          <Modal title="Add New Agent" onClose={() => setShowAddModal(false)}>
            <div className="flex flex-col gap-3">
              <Input placeholder="Name" value={newAgent.name} onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })} />
              <Input placeholder="Email" value={newAgent.email} onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })} />
              <Input placeholder="Phone" value={newAgent.phone} onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })} />
              <select
                value={newAgent.role}
                onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                className="w-full border rounded p-2 bg-gray-50 text-black"
              >
                <option value="Broker">Broker</option>
                <option value="Builder">Builder</option>
              </select>
            </div>
            <div className="flex justify mt-4">
              <Button onClick={handleAddAgent} className="w-full sm:w-auto bg-orange-600 text-white hover:bg-orange-700">
                Save
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AgentPage;
