const express = require("express");
const Lead = require("../models/Lead"); // Import Lead model
const { getLeadTrends } = require("../controllers/leadsController");
const router = express.Router();

// ✅ Get all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.get("/trends", getLeadTrends);

// ✅ Add a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, interest } = req.body;
    const newLead = new Lead({ name, email, phone, interest });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: "Error adding lead" });
  }
});

module.exports = router;
