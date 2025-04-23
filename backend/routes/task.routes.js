const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Add a task
// router.post('/add', async (req, res) => {
//   const { email, task } = req.body;
//   console.log(task)

//   try {
//     const user = await User.findOneAndUpdate(
//       { email },
//       { $push: { tasks: task } },
//       { new: true }
//     );

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ message: 'Task added', tasks: user.tasks });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Add a task
router.post('/add', async (req, res) => {
  const { email, task } = req.body;
  
  // Ensure task is an object and the tasks array exists
  if (!Array.isArray(task)) {
    return res.status(400).json({ error: "Task must be an array" });
  }
 
  try {

  
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { tasks: { $each: task } } },
      // { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Task added', tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get tasks for a user
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete('/delete/:TaskId', async (req, res) => {
  const { TaskId } = req.params;
  const { email } = req.body; // Broker email passed from the frontend
  
  try {
    // Find user by email and check if task exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the task exists in the user's tasks array
    const taskExists = user.tasks.some(task => task.TaskId === TaskId);
    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found for this user' });
    }

    // Proceed with deleting the task
    const updatedUser = await User.findOneAndUpdate(
      { email, 'tasks.TaskId': TaskId },
      { $pull: { tasks: { TaskId } } }, // Remove the task by TaskId
      // { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to delete task' });
    }

    // Return the updated task list
    res.status(200).json({ tasks: updatedUser.tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/edit/:TaskId', async (req, res) => {

console.log("status",req.body.task);

  if(req.body.OnlystatusChange){

    try {
      // Find user by email
console.log("email",req.body.email)
      const user = await User.findOne({ email:req.body.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the task exists in the user's tasks array
      const taskExists = user.tasks.some(t => t.TaskId === req.body.TaskId);
      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found for this user' });
      }
  
      // Proceed with updating the task
      const updatedUser = await User.findOneAndUpdate(
        { email: req.body.email, 'tasks.TaskId': req.body.TaskId },
        {
          $set: {
            'tasks.$': req.body.task  // Replace entire task object
          }
        },
       
      );
      if (!updatedUser) {
        return res.status(500).json({ message: 'Failed to update task', });

      }
  
      // Return the updated task list
      res.status(200).json({ tasks: updatedUser.tasks });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

  }
  else{
  const { TaskId } = req.params;
  const { email, task, date } = req.body; // Broker email passed from the frontend
  
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the task exists in the user's tasks array
    const taskExists = user.tasks.some(t => t.TaskId === TaskId);
    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found for this user' });
    }

    // Proceed with updating the task
    const updatedUser = await User.findOneAndUpdate(
      { email, 'tasks.TaskId': TaskId },
      { $set: { 'tasks.$.task': task, 'tasks.$.date': date } }, // Update task by TaskId
      // { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to update task' });
    }

    // Return the updated task list
    res.status(200).json({ tasks: updatedUser.tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
});


module.exports = router;
