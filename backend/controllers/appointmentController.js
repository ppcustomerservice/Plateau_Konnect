const Appointment = require("../models/appointment.model");
const { appointmentMailContent } = require("../utils/constants/emailConstants");
const sendMail = require("../utils/mailer");
const moment = require("moment");

async function saveAppointment(req, res) {
  try {
    const { client, email, platform, url, start, repeat } = req.body;
    if (!client || !email || !url) {
      return res.status(400).json({ error: "Client, email, and URL are required." });
    }
    const startTime = new Date(start);

    // Save without 'end'
    const newAppointment = await Appointment.create({
      client,
      email,
      platform,
      url,
      start: startTime,
      repeat,
    });

    // Prepare and send email
    const formattedStartTime = moment(startTime).format("MMMM Do YYYY, h:mm A");
    const mailData = appointmentMailContent({
      client,
      start: formattedStartTime,
      platform,
      url,
    });

    await sendMail({
      to: email,
      subject: mailData.subject,
      html: mailData.html,
    });

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
