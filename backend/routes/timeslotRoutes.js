const express = require("express");
const router = express.Router();

const timeslotController = require("../controllers/timeslotController");
const authMiddleware = require("../middleware/authMiddleware");

// Debug log (AFTER import)
console.log("AUTH MIDDLEWARE:", authMiddleware);

/**
 * ===========================
 * 📌 Time Slot Routes
 * ===========================
 * - Get vendor slots
 * - Book a slot
 * - Reschedule (update) slot
 */

// ✅ Get all active slots for a vendor
// Example: GET /api/timeslots/vendor/:vendorId
router.get(
  "/vendor/:vendorId",
  authMiddleware, // user must be logged in
  timeslotController.getVendorSlots
);

// ✅ Book a time slot for an order
// Example: POST /api/timeslots/book
router.post(
  "/book",
  authMiddleware, // only logged in users can book
  timeslotController.bookSlot
);

// ✅ Reschedule time slot
// Example: PUT /api/timeslots/reschedule
router.put(
  "/reschedule",
  authMiddleware, // only logged in users
  timeslotController.updateSlot
);

module.exports = router;
