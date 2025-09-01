const express = require("express");
const {
  registerStudent,
  updateStudent,
  getStudentDashboard,
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/register",
  authMiddleware,
  roleMiddleware("student"),
  registerStudent
);
router.put("/update", authMiddleware, roleMiddleware("student"), updateStudent);
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("student"),
  getStudentDashboard
);

module.exports = router;
