const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  client: { type: String, required: true },
  email: { type: String, required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  start: { type: Date, required: true },
  repeat: { type: String, default: "None" }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
