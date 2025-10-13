const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createRazorpayOrder = async (order) => {
  const options = {
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: "receipt_" + order._id,
    payment_capture: 1,
  };
  return razorpay.orders.create(options);
};

exports.verifyPaymentSignature = (orderId, paymentId, signature) => {
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(orderId + "|" + paymentId);
  return hmac.digest("hex") === signature;
};
