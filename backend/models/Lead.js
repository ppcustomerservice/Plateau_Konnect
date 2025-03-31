const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  interest: { type: String }, // e.g., "buying", "selling"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lead", LeadSchema);
