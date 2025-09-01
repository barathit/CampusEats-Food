const StudentProfile = require("../models/StudentProfile");
const User = require("../models/User");

// 📌 Create Student Profile (only once)
exports.registerStudent = async (req, res) => {
  try {
    const { rollNumber, department, year } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "student")
      return res.status(403).json({ message: "Only students can register" });

    const existingProfile = await StudentProfile.findOne({ user: userId });
    if (existingProfile)
      return res
        .status(400)
        .json({ message: "Student profile already exists" });

    const studentProfile = new StudentProfile({
      user: userId,
      rollNumber,
      department,
      year,
    });

    await studentProfile.save();
    res
      .status(201)
      .json({ message: "Student registered successfully", studentProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Update Student Profile
exports.updateStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rollNumber, department, year } = req.body;

    let studentProfile = await StudentProfile.findOne({ user: userId });
    if (!studentProfile)
      return res.status(404).json({ message: "Student profile not found" });

    studentProfile.rollNumber = rollNumber || studentProfile.rollNumber;
    studentProfile.department = department || studentProfile.department;
    studentProfile.year = year || studentProfile.year;

    await studentProfile.save();
    res.json({ message: "Student profile updated", studentProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Student Dashboard
exports.getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const studentProfile = await StudentProfile.findOne({
      user: userId,
    }).populate("user", "fullName email");

    if (!studentProfile)
      return res.status(404).json({ message: "Student profile not found" });

    res.json({ message: "Student Dashboard", studentProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
