const mongoose = require("mongoose");

/**
 * Cart Model
 * ----------------
 * Temporary storage for items a user wants to purchase
 * before checkout.
 *
 * Standard flow: AddToCart -> Checkout -> Order
 */
const cartItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    }, // store snapshot price (prevents mismatch if vendor changes price later)
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
