require("dotenv").config();
console.log("ENV LOADED:", process.env.SMTP_USER);

const createSuperAdmin = require("./config/createSuperAdmin");

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Models
const User = require("./models/User");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes"); // 🆕
const timeslotRoutes = require("./routes/timeslotRoutes"); // 🆕
const paymentRoutes = require("./routes/paymentRoutes"); // 🆕
const offerRoutes = require("./routes/offerRoutes"); // 🆕

// Load env
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
app.use("/campuseats/api/menu", menuRoutes);
app.use("/campuseats/api/order", orderRoutes);
app.use("/campuseats/api/cart", cartRoutes); // 🆕
app.use("/campuseats/api/timeslot", timeslotRoutes); // 🆕
app.use("/campuseats/api/payment", paymentRoutes); // 🆕
app.use("/campuseats/api/offer", offerRoutes); // 🆕

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
