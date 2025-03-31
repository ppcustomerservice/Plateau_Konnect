import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  TextField,
} from "@mui/material";
import Sidebar from "../../pages/Admin/Sidebar";

const SettingsPage = () => {
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [timeSlots, setTimeSlots] = useState("09:00 - 18:00");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveSettings = () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Settings saved:", {
      meetingDuration,
      notifications,
      theme,
      timeSlots,
      password,
    });
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <Container maxWidth="md" sx={{ py: 5, bgcolor: theme === "dark" ? "#1e1e1e" : "#f5f5f5", color: theme === "dark" ? "#ffffff" : "#333", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          sx={{ color: "#FF6600", mb: 4, fontWeight: "bold", textAlign: "center", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
        >
          <span role="img" aria-label="settings">⚙️</span> Settings
        </Typography>

        <Box sx={{ maxWidth: "600px", mx: "auto", bgcolor: theme === "dark" ? "#2c2c2c" : "white", p: 4, borderRadius: 2, boxShadow: 4 }}>
          <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
            <InputLabel sx={{ background: theme === "dark" ? "#2c2c2c" : "white", px: 1 }}>Default Meeting Duration</InputLabel>
            <Select value={meetingDuration} onChange={(e) => setMeetingDuration(e.target.value)}>
              {[15, 30, 45, 60].map((duration) => (
                <MenuItem key={duration} value={duration}>{duration} minutes</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
            <InputLabel sx={{ background: theme === "dark" ? "#2c2c2c" : "white", px: 1 }}>Available Time Slots</InputLabel>
            <Select value={timeSlots} onChange={(e) => setTimeSlots(e.target.value)}>
              {["09:00 - 18:00", "08:00 - 20:00", "24/7"].map((slot) => (
                <MenuItem key={slot} value={slot}>{slot}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>Enable Notifications</Typography>
            <Switch checked={notifications} onChange={() => setNotifications(!notifications)} color="warning" />
          </Box>

          <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
            <InputLabel sx={{ background: theme === "dark" ? "#2c2c2c" : "white", px: 1 }}>Theme</InputLabel>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 3, background: theme === "dark" ? "#2c2c2c" : "white", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mt: 3, background: theme === "dark" ? "#2c2c2c" : "white", borderRadius: 1 }}
          />

          <Button
            onClick={handleSaveSettings}
            variant="contained"
            sx={{ bgcolor: "#FF6600", color: "white", mt: 4, width: "100%", fontSize: "1rem", fontWeight: "bold", py: 1.5, borderRadius: 2 }}
          >
            Save Settings
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SettingsPage;
