const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Import Routes
const userRoutes = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");
const enumRouter = require("./routes/enum.route.js");
const listingRouter = require("./routes/listing.route.js");
const adminRoutes = require("./routes/admin");
const leadRouter = require("./routes/lead.route.js");
const taskRoutes = require("./routes/task.routes"); 

// Custom Error Handlers
const CustomError = require("./utils/error/CustomError.js");
const { globalErrorHandler } = require("./utils/error/errorHelpers.js");

dotenv.config();

const app = express();

// Handle Unhandled Rejections & Exceptions
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Apply CORS Middleware
app.use(
  cors({
    origin: [
      "https://merry-rugelach-ad5ed9.netlify.app",
      "https://broker.propertyplateau.com",
      "http://localhost:3000",
      "https://main.d29k7expne17jm.amplifyapp.com/" ,
      "https://main.d29k7expne17jm.amplifyapp.com" ,
      "https://www.broker.propertyplateau.com/" ,
      "https://www.broker.propertyplateau.com" 
    ],
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

//   app.get("/api/users/agents", (req, res) => {
//     res.json([{ name: "John Doe", email: "john@example.com", phone: "1234567890", role: "Broker" }]);
// });

// Register API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/enums", enumRouter);
app.use("/api/listings", listingRouter);
app.use("/api/leads", leadRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/appointments", require("./routes/appointment"));



// Default route to check server status
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// Serve Static Files in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"), function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

// Handle Undefined Routes
app.use("*", (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

// Register Global Error Handler
app.use(globalErrorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
