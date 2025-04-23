const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Property Plateau" <${process.env.EMAIL_ID}>`,
      to,
      subject,
      html,
    });
    console.log("Mail sent to:", to);
  } catch (error) {
    console.error("Error sending mail:", error.message);
  }
};

module.exports = sendMail;
