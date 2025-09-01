require("dotenv").config();
console.log("ENV LOADED:", process.env.SMTP_USER);

const createSuperAdmin = require("./config/createSuperAdmin");

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// Import Models
const User = require("./models/User");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
connectDB();

// Run Super Admin creation ONLY after DB connection is open
mongoose.connection.once("open", async () => {
  console.log("✅ MongoDB connected successfully");
  await createSuperAdmin();
});

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/campuseats/api/auth", authRoutes);
app.use("/campuseats/api/vendor", vendorRoutes);
app.use("/campuseats/api/student", studentRoutes);
app.use("/campuseats/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
