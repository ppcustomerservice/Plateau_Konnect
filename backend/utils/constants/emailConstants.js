const fs = require("fs");
const path = require("path");

// Read HTML template once
const rawAppointmentTemplate = fs.readFileSync(
  path.resolve(__dirname, '../view', 'appointment-template.html'),
  'utf-8'
);

const forgotPasswordMailContent = {
  subject: "Password Reset",
  html: fs.readFileSync(path.resolve(__dirname, '../view', 'forgot-password-template.html'), 'utf-8'),
  from: "",
  to: ""
};

const userRegistrationMailContent = {
  subject: "Welcome to Property Plateau",
  html: fs.readFileSync(path.resolve(__dirname, '../view', 'user-registration-template.html'), 'utf-8'),
  from: "",
  to: ""
};

const propertyRegistrationMailContent = {
  subject: "Property Added Successfully",
  html: fs.readFileSync(path.resolve(__dirname, '../view', 'property-registration-template.html'), 'utf-8'),
  from: "",
  to: ""
};

// Turn into function to inject dynamic content
const appointmentMailContent = ({ client, start, platform, url }) => {
  const html = rawAppointmentTemplate
    .replace("{{CLIENT_NAME}}", client)
    .replace("{{APPOINTMENT_TIME}}", start)
    .replace("{{PLATFORM}}", platform)
    .replace(/{{URL}}/g, url);

  return {
    subject: "Appointment Scheduled Successfully",
    html,
    from: process.env.EMAIL_ID,
  };
};

module.exports = {
  forgotPasswordMailContent,
  userRegistrationMailContent,
  propertyRegistrationMailContent,
  appointmentMailContent,
};
