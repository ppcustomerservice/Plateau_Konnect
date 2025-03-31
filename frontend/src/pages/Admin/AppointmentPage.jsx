import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../Admin/Sidebar"; // ✅ Import Sidebar

const localizer = momentLocalizer(moment);

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    email: "",
    platform: "Zoom",
    url: "",
    start: new Date(),
    end: new Date(),
    repeat: "None",
  });
  const [notification, setNotification] = useState(false);

  const handleOpenDialog = ({ start }) => {
    setNewAppointment({
      ...newAppointment,
      start,
      end: moment(start).add(1, "hour").toDate(),
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const addRepeatedAppointments = (appt) => {
    let repeatedAppointments = [appt];
    if (appt.repeat === "Daily") {
      for (let i = 1; i <= 6; i++) {
        repeatedAppointments.push({
          ...appt,
          start: moment(appt.start).add(i, "days").toDate(),
          end: moment(appt.end).add(i, "days").toDate(),
        });
      }
    } else if (appt.repeat === "Weekly") {
      for (let i = 1; i <= 4; i++) {
        repeatedAppointments.push({
          ...appt,
          start: moment(appt.start).add(i, "weeks").toDate(),
          end: moment(appt.end).add(i, "weeks").toDate(),
        });
      }
    } else if (appt.repeat === "Monthly") {
      for (let i = 1; i <= 3; i++) {
        repeatedAppointments.push({
          ...appt,
          start: moment(appt.start).add(i, "months").toDate(),
          end: moment(appt.end).add(i, "months").toDate(),
        });
      }
    }
    return repeatedAppointments;
  };

  const handleSaveAppointment = () => {
    const newAppointments = addRepeatedAppointments(newAppointment);
    setAppointments([...appointments, ...newAppointments]);
    setNotification(true);
    setOpenDialog(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setNewAppointment(event);
    setOpenDialog(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
          py: 4,
          overflowX: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#FF6600",
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          📅 Appointments Management
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            height: "75vh",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            overflow: "hidden",
          }}
        >
          <Calendar
            localizer={localizer}
            events={appointments.map((a) => ({
              title: a.client,
              start: new Date(a.start),
              end: new Date(a.end),
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            selectable
            onSelectSlot={handleOpenDialog}
            onSelectEvent={handleEventClick}
            step={30}
            timeslots={2}
            defaultView="week"
            popup
            longPressThreshold={10}
          />
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: "#FF6600", color: "white" }}>
            {selectedEvent ? "Reschedule Appointment" : "Schedule Appointment"}
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            <TextField
              label="Client Name"
              name="client"
              fullWidth
              margin="dense"
              onChange={handleInputChange}
              value={newAppointment.client}
            />
            <TextField
              label="Client Email"
              name="email"
              fullWidth
              margin="dense"
              onChange={handleInputChange}
              value={newAppointment.email}
            />
            <TextField
              label="Meeting URL"
              name="url"
              fullWidth
              margin="dense"
              onChange={handleInputChange}
              value={newAppointment.url}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Repeat</InputLabel>
              <Select name="repeat" value={newAppointment.repeat} onChange={handleInputChange}>
                {["None", "Daily", "Weekly", "Monthly"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="datetime-local"
              label="Start Time"
              name="start"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              value={moment(newAppointment.start).format("YYYY-MM-DDTHH:mm")}
            />
            <TextField
              type="datetime-local"
              label="End Time"
              name="end"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              value={moment(newAppointment.end).format("YYYY-MM-DDTHH:mm")}
            />
            <Button
              onClick={handleSaveAppointment}
              variant="contained"
              sx={{ bgcolor: "#FF6600", color: "white", mt: 2, width: "100%" }}
            >
              {selectedEvent ? "Reschedule" : "Save"}
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default AppointmentPage;
