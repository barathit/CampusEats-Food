// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Order = require("../models/Order");

// // ✅ Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /**
//  * 📌 Initiate Payment (Generate Razorpay Order)
//  */
// exports.initiatePayment = async (req, res) => {
//   try {
//     const { orderId } = req.body;
//     const userId = req.user.id;

//     // 1. Find order
//     const order = await Order.findOne({ _id: orderId, user: userId });
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     if (order.status !== "pending") {
//       return res.status(400).json({ message: "Order already processed" });
//     }

//     // 2. Create Razorpay order
//     const options = {
//       amount: order.totalAmount * 100, // paise
//       currency: "INR",
//       receipt: "receipt_" + order._id,
//       payment_capture: 1, // auto capture
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     // 3. Save reference in DB
//     order.payment = {
//       method: "razorpay",
//       transactionId: razorpayOrder.id,
//       status: "created",
//     };
//     await order.save();

//     res.json({
//       key: process.env.RAZORPAY_KEY_ID,
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /**
//  * 📌 Verify Payment (after frontend callback)
//  */
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     // Generate signature to verify authenticity
//     const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//     hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const generatedSignature = hmac.digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid payment signature" });
//     }

//     // ✅ Payment success
//     const order = await Order.findOne({
//       "payment.transactionId": razorpay_order_id,
//     });
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.payment.status = "success";
//     order.payment.paymentId = razorpay_payment_id;
//     order.status = "confirmed";
//     await order.save();

//     res.json({ message: "Payment verified successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /**
//  * 📌 Handle Payment Failure
//  */
// exports.paymentFailure = async (req, res) => {
//   try {
//     const { razorpay_order_id } = req.body;

//     const order = await Order.findOne({
//       "payment.transactionId": razorpay_order_id,
//     });
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.payment.status = "failed";
//     order.status = "failed";
//     await order.save();

//     res.json({ message: "Payment marked as failed", order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Order = require("../models/Order");

/**
 * 📌 Initiate Payment
 * -------------------
 * - No Cash on Delivery allowed
 * - Mock flow (like Razorpay/Stripe test mode)
 */
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const userId = req.user.id;

    // ✅ Find the order
    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.menuItem"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order is already processed" });
    }

    if (!["card", "upi", "netbanking"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // ✅ Simulate payment gateway response
    const mockTransactionId = "TXN_" + Date.now();

    // Update order as paid
    order.payment = {
      method: paymentMethod,
      transactionId: mockTransactionId,
      status: "success",
    };
    order.status = "confirmed";
    await order.save();

    res.status(200).json({
      message: "Payment successful",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Mock Payment Callback (webhook simulation)
 * In real flow, payment gateway (e.g. Razorpay) will call this.
 */
exports.paymentCallback = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    const order = await Order.findOne({
      "payment.transactionId": transactionId,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.payment.status = status;
    order.status = status === "success" ? "confirmed" : "failed";
    await order.save();

    res.status(200).json({
      message: "Payment status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
