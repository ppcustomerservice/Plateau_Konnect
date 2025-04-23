// const express = require("express");
// const Task = require("../models/Task"); // Import the Task model
// const router = express.Router();

// // ✅ Add Task API
// router.post("/add", async (req, res) => {
//     try {
//       const { brokerId, text, reminder } = req.body;
  
//       // 🛑 Debugging Logs
//       console.log("Received data:", req.body);
  
//       if (!brokerId || !text) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }
  
//       const newTask = new Task({ brokerId, text, reminder, completed: false });
  
//       await newTask.save();
//       res.status(201).json({ message: "Task added successfully", task: newTask });
//     } catch (err) {
//       console.error("Error adding task:", err); // 🛑 Log error details
//       res.status(500).json({ error: "Failed to add task", details: err.message });
//     }
//   });

//   router.get("/broker/:brokerId", async (req, res) => {
//     try {
//       const { brokerId } = req.params;
//       const tasks = await Task.find({ brokerId }); // Fetch tasks for the broker
//       res.json(tasks);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//       res.status(500).json({ error: "Failed to fetch tasks" });
//     }
//   });
  
  

// module.exports = router;
