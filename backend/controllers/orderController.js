const Cart = require("../models/Cart");
const orderService = require("../services/orderService");
const { sendNotification } = require("../utils/notification");

/**
 * 📌 Place Order (Cart Checkout or Buy Now)
 * Flow:
 * 1. Validate items (from Cart or Buy Now)
 * 2. Assign to valid time slot
 * 3. Create order
 * 4. Clear cart (if not Buy Now)
 * 5. Notify user
 */
exports.placeOrder = async (req, res) => {
  try {
    const { scheduledTime, notes, buyNowItem } = req.body;
    const userId = req.user.id;

    // 1️⃣ Prepare order items (cart / buy now)
    const { items, totalPrice } = await orderService.prepareOrderItems(
      userId,
      buyNowItem
    );

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to place order" });
    }

    // 2️⃣ Assign to time slot
    const slot = await orderService.assignTimeSlot(scheduledTime);
    if (!slot) {
      return res
        .status(400)
        .json({ message: "Selected time slot is unavailable" });
    }

    // 3️⃣ Create order
    const order = await orderService.createOrder({
      userId,
      vendor: items[0].menuItem.vendor, // ✅ one vendor/order assumption
      items,
      totalPrice,
      scheduledTime,
      notes,
    });

    // 4️⃣ Clear cart (only if checkout, not buy-now)
    if (!buyNowItem) {
      await Cart.findOneAndDelete({ user: userId });
    }

    // 5️⃣ Send notification
    sendNotification(userId, "🎉 Order placed successfully!", order);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Update Time Slot
 * - User can reschedule only before preparation starts
 */
exports.updateTimeSlot = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newTime } = req.body;

    const updatedOrder = await orderService.rescheduleOrder(orderId, newTime);

    return res.status(200).json({
      success: true,
      message: "Time slot updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("❌ Error updating timeslot:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Cancel Order
 * - Allowed only if status = Pending
 */
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const cancelledOrder = await orderService.cancelOrder(orderId, userId);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order: cancelledOrder,
    });
  } catch (error) {
    console.error("❌ Error cancelling order:", error);
    return res.status(500).json({ message: error.message });
  }
};
