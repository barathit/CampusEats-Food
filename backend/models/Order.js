const mongoose = require("mongoose");

/**
 * Order Model
 * ----------------
 * Captures confirmed orders after checkout.
 * Includes scheduling info (time slot),
 * and tracks lifecycle (pending -> confirmed -> prepared -> completed).
 */

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // snapshot price
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },

    // Time slot scheduling
    scheduledTime: { type: Date, required: true }, // when user wants pickup
    prepStartTime: { type: Date }, // backend calculates when vendor starts preparing

    // Order lifecycle
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Ready",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },

    notes: { type: String, trim: true }, // user optional notes
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
