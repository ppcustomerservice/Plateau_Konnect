const express = require("express");
const { saveAppointment, getAppointments } = require("../controllers/appointmentController");
const router = express.Router();

// GET /api/appointments — fetch all saved appointments
router.get("/", getAppointments);

// POST /api/appointments — save a new appointment
router.post("/", saveAppointment);

module.exports = router;
