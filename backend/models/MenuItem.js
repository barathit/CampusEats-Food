const mongoose = require("mongoose");

// Addon Schema
const addonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Menu Item Schema
const menuItemSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Other"],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    isVeg: { type: Boolean, default: true },
    availability: { type: Boolean, default: true }, // true if item is available
    availableCount: { type: Number, default: 0 }, // stock count
    image: { type: String },
    addons: [addonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
