const Appointment = require("../models/appointment.model");
const { appointmentMailContent } = require("../utils/constants/emailConstants");
const sendMail = require("../utils/mailer");
const moment = require("moment");

async function saveAppointment(req, res) {
  try {
    const { client, email, platform, url, start, repeat } = req.body;
    const startTime = new Date(start);

    // Save without end
    const newAppointment = await Appointment.create({
      client,
      email,
      platform,
      url,
      start: startTime,
      repeat,
    });

    // send email (omitted for brevity)...

    res.status(200).json(newAppointment);
  } catch (err) {
    console.error("Error in saveAppointment:", err);
    res.status(500).json({ error: err.message });
  }
}

async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find().lean();
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error in getAppointments:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  saveAppointment,
  getAppointments,
};
