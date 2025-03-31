// user.routes.js
const express = require("express");
const {
  updateUser,
  deleteUser,
  getMetrics,
  getAgents,
  createUser, // ✅ New function to fetch agents
} = require("../controllers/user.controller.js");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.put("/update/:id", verifyJWT, updateUser);
router.delete("/delete/:id", verifyJWT, deleteUser);
router.get("/metrics", verifyJWT, getMetrics);



router.get("/agents",getAgents); 



module.exports = router;