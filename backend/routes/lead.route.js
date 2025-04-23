const express = require("express");
const Lead = require("../models/Lead"); // Import Lead model
const { getLeadTrends } = require("../controllers/leadsController");
const router = express.Router();

// 🔒 Get leads for a specific broker via their email (uses the existing `email` field)
router.get("/broker/:email", async (req, res) => {
  try {
    const brokerEmail = req.params.email;
    const leads = await Lead.find({ email: brokerEmail });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch broker leads" });
  }
});

// ✅ Get all leads (for Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// ✅ Get lead trends
router.get("/trends", getLeadTrends);

// ✅ Add a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, interest, status = "New" } = req.body;
    const newLead = new Lead({ name, email, phone, interest, status });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: "Error adding lead" });
  }
});

// ✅ Update lead status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: "Error updating lead status" });
  }
});

module.exports = router;
