// backend/config/createSuperAdmin.js
const User = require("../models/User");

const createSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("✅ Super Admin already exists.");
      return;
    }

    const superAdmin = new User({
      fullName: "CampusEats Super Admin",
      email: "barathmahendrakumar@gmail.com",
      phone: "0000000000",
      password: "campuseastproductadminbarath713522IT502", // plain text (will be hashed by pre("save"))
      role: "admin",
      isVerified: true,
    });

    await superAdmin.save();
    console.log("✅ Super Admin created successfully!");
  } catch (err) {
    console.error("❌ Error creating super admin:", err.message);
  }
};

module.exports = createSuperAdmin;
