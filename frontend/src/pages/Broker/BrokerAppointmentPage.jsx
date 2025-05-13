import React, { useState, useEffect } from "react";
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
import BrokerSidebar from "../Broker/BrokerSidebar";

const localizer = momentLocalizer(moment);

export default function BrokerAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notification, setNotification] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    client: "",
    email: "",
    platform: "Zoom",
    url: "",
    start: new Date(),
    repeat: "None",
  });

  // ▶️ Fetch saved appointments on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        // compute end = start + 1h for UI display
        const withEnd = data.map((a) => ({
          ...a,
          end: moment(a.start).add(1, "hour").toDate(),
        }));
        setAppointments(withEnd);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleOpenDialog = (slotInfo) => {
    const start = slotInfo.start || slotInfo;
    setNewAppointment({
      client: "",
      email: "",
      platform: "Zoom",
      url: "",
      start,
      repeat: "None",
    });
    setSelectedEvent(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAppointment = async () => {
    try {
      console.log("Saving appointment:", newAppointment); 
      const { client, email, platform, url, start, repeat } = newAppointment;
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, email, platform, url, start, repeat }),
      });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || "Failed to save");

      // compute end for UI display
      const end = moment(start).add(1, "hour").toDate();
      setAppointments((prev) => [...prev, { ...saved, end }]);
      setNotification(true);
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to save appointment:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BrokerSidebar />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4, overflowX: "auto" }}>
        <Typography
          variant="h2"
          sx={{ color: "#FF6600", mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          📅 Broker Appointments
        </Typography>

        <Box
          sx={{ width: "100%", height: "75vh", bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 2 }}
        >
          <Calendar
            localizer={localizer}
            events={appointments.map((a) => ({
              title: a.client,
              start: new Date(a.start),
              end: a.end,
            }))}
            startAccessor="start"
            endAccessor="end"
            selectable
            views={["month", "week", "day"]}
            defaultView="week"
            onSelectSlot={handleOpenDialog}
            onDoubleClickSlot={handleOpenDialog}
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setNewAppointment({
                client: event.client,
                email: event.email,
                platform: event.platform,
                url: event.url,
                start: new Date(event.start),
                repeat: event.repeat,
              });
              setOpenDialog(true);
            }}
            step={30}
            timeslots={2}
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
              <InputLabel>Platform</InputLabel>
              <Select
                name="platform"
                value={newAppointment.platform}
                onChange={handleInputChange}
              >
                {["Zoom", "Google Meet", "Microsoft Teams", "Other"].map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
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
              onChange={(e) =>
                setNewAppointment((prev) => ({
                  ...prev,
                  start: new Date(e.target.value),
                }))
              }
              value={moment(newAppointment.start).format("YYYY-MM-DDTHH:mm")}
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

        <Snackbar
          open={notification}
          autoHideDuration={6000}
          onClose={() => setNotification(false)}
        >
          <Alert onClose={() => setNotification(false)} severity="success" sx={{ width: "100%" }}>
            Appointment successfully saved!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
