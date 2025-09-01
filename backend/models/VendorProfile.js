const mongoose = require("mongoose");

const vendorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    foodCourtName: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorProfile", vendorProfileSchema);
