const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Property = require("../models/Property");
const Inquiry = require("../models/Inquiry");
const Lead = require("../models/Lead");
const listing =require("../models/listing.model")

router.get("/metrics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await listing.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const totalBrokers = await User.countDocuments({ role: "Broker" });
    const totalBuilders = await User.countDocuments({ role: "Builder" });
    const totalBuyers = await User.countDocuments({ role: "Buyer" });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({
      totalUsers,
      totalProperties,
      totalLeads,
      totalBrokers,
      totalBuilders,
      totalBuyers,
      totalInquiries,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
