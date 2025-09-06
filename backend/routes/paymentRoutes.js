const express = require("express");
const {
  initiatePayment,
  paymentCallback,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// User initiates payment
router.post("/initiate", authMiddleware, initiatePayment);

// Mock payment callback (from gateway)
router.post("/callback", paymentCallback);

module.exports = router;
