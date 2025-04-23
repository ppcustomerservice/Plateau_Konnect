// const Task = require("../models/Task");
// const User = require("../models/User");

// exports.createTask = async (req, res) => {
//   const { task, date } = req.body;
//   const email = req.user.email;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.role !== "Broker") {
//       return res.status(403).json({ error: "Only brokers can create tasks." });
//     }

//     const newTask = new Task({ task, date, email });
//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ error: "Error creating task." });
//   }
// };

// exports.getBrokerTasks = async (req, res) => {
//   try {
//     const brokerEmailFromToken = req.user.email;        // Securely from token
//     const emailParam = req.params.email;                // From URL

//     if (emailParam !== brokerEmailFromToken) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const tasks = await Task.find({ email: brokerEmailFromToken }).sort({ createdAt: -1 });

//     res.status(200).json(tasks);
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     res.status(500).json({ message: "Server error" });
//   }

// };
// exports.createTask = async (req, res) => {
//   try {
//     const brokerEmailFromToken = req.user.email;
//     const { email, task, date } = req.body;

//     if (email !== brokerEmailFromToken) {
//       return res.status(403).json({ message: "You can only create tasks for your account" });
//     }

//     if (!email || !task) {
//       return res.status(400).json({ message: "Email and task are required" });
//     }

//     const newTask = new Task({ email, task, date });
//     await newTask.save();

//     res.status(201).json(newTask);
//   } catch (err) {
//     console.error("Error creating task:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

