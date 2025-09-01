const User = require("../models/User");
const VendorProfile = require("../models/VendorProfile");
const StudentProfile = require("../models/StudentProfile");

// 📌 Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ message: "Admin Dashboard", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Delete Any User (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await VendorProfile.deleteOne({ user: userId });
    await StudentProfile.deleteOne({ user: userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Promote User to Vendor
exports.promoteToVendor = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "vendor";
    await user.save();

    res.json({ message: "User promoted to vendor", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Promote User to Admin (Only Main Admin Allowed)
exports.promoteToAdmin = async (req, res) => {
  try {
    if (req.user.email !== "barathmahendrakumar@gmail.com")
      return res
        .status(403)
        .json({ message: "Only super admin can promote admins" });

    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
