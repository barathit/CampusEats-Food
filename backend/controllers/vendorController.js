const VendorProfile = require("../models/VendorProfile");
const User = require("../models/User");

// 📌 Register / Update Vendor Profile
exports.registerVendor = async (req, res) => {
  try {
    const { hotelName, location, foodCourtName } = req.body;
    const userId = req.user.id;

    // Ensure only vendor role can register
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "vendor")
      return res.status(403).json({ message: "Only vendors can register" });

    let vendorProfile = await VendorProfile.findOne({ user: userId });

    if (vendorProfile) {
      // Update existing profile
      vendorProfile.hotelName = hotelName || vendorProfile.hotelName;
      vendorProfile.location = location || vendorProfile.location;
      vendorProfile.foodCourtName =
        foodCourtName || vendorProfile.foodCourtName;
      await vendorProfile.save();
      return res.json({ message: "Vendor profile updated", vendorProfile });
    }

    // Create new vendor profile
    vendorProfile = new VendorProfile({
      user: userId,
      hotelName,
      location,
      foodCourtName,
    });
    await vendorProfile.save();

    res
      .status(201)
      .json({ message: "Vendor registered successfully", vendorProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Separate Update Vendor Profile (PUT /update) – optional
exports.updateVendorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { hotelName, location, foodCourtName } = req.body;

    const vendorProfile = await VendorProfile.findOneAndUpdate(
      { user: userId },
      { hotelName, location, foodCourtName },
      { new: true }
    );

    if (!vendorProfile) {
      return res.status(404).json({ message: "Vendor profile not found" });
    }

    res.json({ message: "Vendor profile updated", vendorProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Vendor Dashboard (Only Accessible by Vendor)
exports.vendorDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const vendorProfile = await VendorProfile.findOne({
      user: userId,
    }).populate("user", "fullName email");

    if (!vendorProfile)
      return res.status(404).json({ message: "Vendor profile not found" });

    res.json({ message: "Vendor Dashboard", vendorProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
