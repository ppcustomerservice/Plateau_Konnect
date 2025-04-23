import React, { useState } from "react";
import { Container, Typography, TextField, Button, Switch, FormControlLabel, Select, MenuItem, Divider } from "@mui/material";
import BrokerSidebar from "../Broker/BrokerSidebar";

const BrokerSettingsPage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    agencyName: "",
    licenseNumber: "",
    experience: "",
    specializations: "",
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appointmentReminders: true,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleSaveSettings = () => {
    console.log("Profile: ", profile);
    console.log("Notifications: ", notifications);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BrokerSidebar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#FF6600" }}>
          ⚙️ Broker Settings
        </Typography>
        
        <Typography variant="h6" sx={{ mt: 3 }}>👤 Profile Settings</Typography>
        <TextField label="Full Name" name="fullName" fullWidth margin="normal" value={profile.fullName} onChange={handleProfileChange} />
        <TextField label="Phone Number" name="phoneNumber" fullWidth margin="normal" value={profile.phoneNumber} onChange={handleProfileChange} />
        <TextField label="Location" name="location" fullWidth margin="normal" value={profile.location} onChange={handleProfileChange} />
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6">🏢 Business Information</Typography>
        <TextField label="Agency Name" name="agencyName" fullWidth margin="normal" value={profile.agencyName} onChange={handleProfileChange} />
        <TextField label="License Number" name="licenseNumber" fullWidth margin="normal" value={profile.licenseNumber} onChange={handleProfileChange} />
        <TextField label="Years of Experience" name="experience" fullWidth margin="normal" value={profile.experience} onChange={handleProfileChange} />
        <TextField label="Specializations" name="specializations" fullWidth margin="normal" value={profile.specializations} onChange={handleProfileChange} />
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6">🔔 Notification Preferences</Typography>
        <FormControlLabel control={<Switch checked={notifications.emailAlerts} onChange={handleNotificationsChange} name="emailAlerts" />} label="Email Alerts" />
        <FormControlLabel control={<Switch checked={notifications.smsAlerts} onChange={handleNotificationsChange} name="smsAlerts" />} label="SMS Alerts" />
        <FormControlLabel control={<Switch checked={notifications.appointmentReminders} onChange={handleNotificationsChange} name="appointmentReminders" />} label="Appointment Reminders" />
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6">💳 Subscription Plan</Typography>
        <Select fullWidth value={"Basic"} disabled>
          <MenuItem value="Basic">Basic Plan</MenuItem>
          <MenuItem value="Pro">Pro Plan</MenuItem>
          <MenuItem value="Premium">Premium Plan</MenuItem>
        </Select>
        
        <Divider sx={{ my: 3 }} />
        
        <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </Container>
    </div>
  );
};

export default BrokerSettingsPage;