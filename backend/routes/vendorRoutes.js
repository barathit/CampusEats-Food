const express = require("express");
const {
  registerVendor,
  updateVendorProfile,
  vendorDashboard,
} = require("../controllers/vendorController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/register",
  authMiddleware,
  roleMiddleware("vendor"),
  registerVendor
);
router.put(
  "/update",
  authMiddleware,
  roleMiddleware("vendor"),
  updateVendorProfile
);
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("vendor"),
  vendorDashboard
);

module.exports = router;
