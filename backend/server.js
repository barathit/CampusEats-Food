require("dotenv").config();
console.log("ENV LOADED:", process.env.SMTP_USER);

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/campuseats/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
