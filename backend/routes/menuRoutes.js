const express = require("express");
const {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getVendorMenu,
  getMenuByVendor,
  getAllMenus,
  adminDeleteMenuItem,
  searchMenus,
  updateMenuAvailability, // ✅ new
  getVendorMenuWithCount, // ✅ optional: total count
} = require("../controllers/menuController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Vendor Routes
router.post("/add", authMiddleware, roleMiddleware("vendor"), addMenuItem);
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("vendor"),
  updateMenuItem
);
router.put(
  "/update-availability/:id", // ✅ new endpoint
  authMiddleware,
  roleMiddleware("vendor"),
  updateMenuAvailability
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("vendor"),
  deleteMenuItem
);
router.get("/my-menu", authMiddleware, roleMiddleware("vendor"), getVendorMenu);
router.get(
  "/my-menu-with-count", // ✅ optional: includes total available count
  authMiddleware,
  roleMiddleware("vendor"),
  getVendorMenuWithCount
);

// Student Routes
router.get(
  "/vendor/:vendorId",
  authMiddleware,
  roleMiddleware("student"),
  getMenuByVendor
);
router.get("/search", authMiddleware, roleMiddleware("student"), searchMenus);

// Admin Routes
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllMenus);
router.delete(
  "/admin/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminDeleteMenuItem
);

module.exports = router;
