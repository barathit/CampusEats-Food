const express = require("express");
const {
  getAdminDashboard,
  deleteUser,
  promoteToVendor,
  promoteToAdmin,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminDashboard
);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);
router.put(
  "/promote-to-vendor/:id",
  authMiddleware,
  roleMiddleware("admin"),
  promoteToVendor
);
router.put(
  "/promote-to-admin/:id",
  authMiddleware,
  roleMiddleware("admin"),
  promoteToAdmin
);

module.exports = router;
