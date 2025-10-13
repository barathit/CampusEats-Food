const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

/**
 * ===========================
 * 📌 Order Routes
 * ===========================
 * - Only logged-in users (students/staff) can place orders
 * - Vendors/Admin may have separate routes for managing orders
 */

// ✅ Place Order (Cart Checkout or Buy Now)
router.post(
  "/place",
  authMiddleware,
  roleMiddleware("student", "staff"),
  orderController.placeOrder
);

// ✅ Update Time Slot (reschedule)
router.put(
  "/update-slot/:orderId",
  authMiddleware,
  roleMiddleware("student", "staff"),
  orderController.updateTimeSlot
);

// ✅ Cancel Order
router.put(
  "/cancel/:orderId",
  authMiddleware,
  roleMiddleware("student", "staff"),
  orderController.cancelOrder
);

module.exports = router;
