const mongoose = require("mongoose");

/**
 * Payment Model
 * ----------------
 * Stores all payment-related details.
 * Useful for auditing and refunds.
 */

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },

    provider: {
      type: String,
      enum: ["Razorpay", "Stripe", "UPI", "COD"],
      required: true,
    },
    transactionId: { type: String, required: true }, // Payment gateway reference

    status: {
      type: String,
      enum: ["Initiated", "Success", "Failed", "Refunded"],
      default: "Initiated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
