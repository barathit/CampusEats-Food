const mongoose = require("mongoose");

/**
 * TimeSlot Model
 * ----------------
 * Each vendor has multiple slots (like Swiggy/Zomato).
 * Slots prevent overbooking & manage food court crowd.
 */

const timeSlotSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startTime: { type: Date, required: true }, // e.g., 2:00 PM
    endTime: { type: Date, required: true }, // e.g., 2:30 PM

    maxOrders: { type: Number, default: 20 }, // limit per slot
    bookedOrders: { type: Number, default: 0 }, // updated on each booking

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
