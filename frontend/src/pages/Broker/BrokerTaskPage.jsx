// export default BrokerTaskPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {
  Button,
  TextField,
  Checkbox,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Edit, AccessAlarm, Save } from "@mui/icons-material";
import Sidebar from "./BrokerSidebar";

const BrokerTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track editing task by TaskId
  const [notification, setNotification] = useState(false);
  const [brokerEmail, setBrokerEmail] = useState("");
  const [token, setToken] = useState("");

  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Get current timestamp in base 36 (alphanumeric)
    const randomStr = Math.random().toString(36).substring(2, 8); // Generate a random string
    const uniqueId = timestamp + randomStr; // Concatenate timestamp and random string

    return uniqueId.substring(0, 15); // Ensure total length is 15
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded?.email) {
          setBrokerEmail(decoded.email);
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Token decode failed:", err);
      }
    }
  }, []);

  const fetchTasks = () => {
    if (!brokerEmail) return;
    axios
      .get(`http://localhost:5000/api/tasks/${brokerEmail}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Fetching tasks failed:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, [brokerEmail]);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const task = [{
      TaskId: generateUniqueId(),
      task: taskInput,
      date: reminderTime,
      completed: false,
    }];

    axios
      .post("http://localhost:5000/api/tasks/add", {
        email: brokerEmail,
        task,
      })
      .then((res) => {
        fetchTasks();
        setTasks(res.data.tasks);
        setTaskInput("");
        setReminderTime("");
        setNotification(true);
      })
      .catch((err) => console.error("Adding task failed:", err));
  };
  const handleDeleteTask = (TaskId) => {
    axios
      .delete(`http://localhost:5000/api/tasks/delete/${TaskId}`, {
        data: { email: brokerEmail } // Pass broker email in the request body
      })
      .then((res) => {
        fetchTasks();
        setTasks(res.data.tasks);
        setNotification(true);
      })
      .catch((err) => console.error("Deleting task failed:", err));
  };

  const handleToggleComplete = (TaskId) => {
    const updated = tasks.map((task) =>
      task.TaskId === TaskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    // Optionally, sync with backend here
    axios.put("http://localhost:5000/api/tasks/edit/${editingTaskId}",{
      email: brokerEmail,
      task: updated,
      TaskId: TaskId,
      OnlystatusChange:true,

    })
    .then((res)=>{
      fetchTasks()
    })
    .catch((err)=>console.error("Updating task failed:", err));


  };

  const handleEditTask = (TaskId) => {
    const taskToEdit = tasks.find((task) => task.TaskId === TaskId);
    if (taskToEdit) {
      setTaskInput(taskToEdit.task);
      setReminderTime(taskToEdit.date || "");
      setEditingTaskId(TaskId); // Track the task being edited
    }
  };

  const handleSaveEdit = () => {
    if (!editingTaskId) return;

    const updatedTasks = tasks.map((task) =>
      task.TaskId === editingTaskId
        ? { ...task, task: taskInput, date: reminderTime }
        : task
    );

    axios
      .put(`http://localhost:5000/api/tasks/edit/${editingTaskId}`, {
        task: taskInput,
        date: reminderTime,
        email: brokerEmail // Pass broker email in the request body
      })
      .then((res) => {
        fetchTasks();
        setTasks(res.data.tasks);
        setTaskInput("");
        setReminderTime("");
        setEditingTaskId(null);
        setNotification(true);
      })
      .catch((err) => console.error("Saving task failed:", err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col items-center w-full p-12">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">📋 Broker Task Management</h2>

        <div className="flex flex-wrap gap-4 mb-4 w-full max-w-2xl">
          <TextField
            fullWidth
            label="Enter Task"
            variant="outlined"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <TextField
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          {editingTaskId ? (
            <Button
              variant="contained"
              color="warning"
              onClick={handleSaveEdit}
              startIcon={<Save />}
            >
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add
            </Button>
          )}
        </div>

        <div className="w-full max-w-2xl bg-white p-4 rounded shadow-md">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet.</p>
          ) : (
            tasks.map((task,i) => (
              <div key={i} className="flex justify-between items-center border-b py-2 last:border-b-0 px-2">
                <div className="flex items-center gap-3 w-full">
                  <Checkbox
                    checked={task.completed || false}
                    onChange={() => handleToggleComplete(task.TaskId)}
                  />
                  <span className={`text-lg w-full ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.task}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {task.date && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <AccessAlarm fontSize="small" /> {task.date}
                    </span>
                  )}
                  <IconButton color="warning" onClick={() => handleEditTask(task.TaskId)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteTask(task.TaskId)}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>

        <Snackbar
          open={notification}
          autoHideDuration={3000}
          onClose={() => setNotification(false)}
        >
          <Alert severity="success">Task Updated Successfully!</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BrokerTaskPage;
