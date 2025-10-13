const Order = require("../models/Order");
const Cart = require("../models/Cart");
const TimeSlot = require("../models/TimeSlot");

/**
 * 📌 Prepare Order Items (From Cart or Buy Now)
 */
exports.prepareOrderItems = async (userId, buyNowItem) => {
  let items = [];
  let totalPrice = 0;

  if (buyNowItem) {
    // Direct checkout ("Buy Now")
    items.push({
      menuItem: buyNowItem.menuItemId,
      quantity: buyNowItem.quantity,
      price: buyNowItem.price,
    });
    totalPrice = buyNowItem.price * buyNowItem.quantity;
  } else {
    // From Cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.menuItem"
    );
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    items = cart.items.map((item) => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity,
      price: item.price,
    }));
    totalPrice = cart.totalPrice;
  }

  return { items, totalPrice };
};

/**
 * 📌 Assign Time Slot
 */
exports.assignTimeSlot = async (scheduledTime) => {
  const slot = await TimeSlot.findOne({
    startTime: { $lte: scheduledTime },
    endTime: { $gte: scheduledTime },
    isActive: true,
  });

  if (!slot || slot.bookedOrders >= slot.maxOrders) {
    return null; // Unavailable
  }

  slot.bookedOrders += 1;
  await slot.save();

  return slot;
};

/**
 * 📌 Create Order
 */
exports.createOrder = async ({
  userId,
  vendor,
  items,
  totalPrice,
  scheduledTime,
  notes,
}) => {
  const order = new Order({
    user: userId,
    vendor,
    items,
    totalPrice,
    scheduledTime,
    notes,
    status: "Pending", // Default initial status
  });

  await order.save();
  return order;
};

/**
 * 📌 Reschedule Order (before prep starts)
 */
exports.rescheduleOrder = async (orderId, newTime) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  const now = new Date();
  if (order.scheduledTime < now) {
    throw new Error("Cannot reschedule past time slots");
  }

  // Release old slot
  const oldSlot = await TimeSlot.findOne({
    startTime: { $lte: order.scheduledTime },
    endTime: { $gte: order.scheduledTime },
  });
  if (oldSlot) {
    oldSlot.bookedOrders = Math.max(0, oldSlot.bookedOrders - 1);
    await oldSlot.save();
  }

  // Assign new slot
  const newSlot = await this.assignTimeSlot(newTime);
  if (!newSlot) {
    throw new Error("New time slot unavailable");
  }

  order.scheduledTime = newTime;
  await order.save();

  return order;
};

/**
 * 📌 Cancel Order
 */
exports.cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new Error("Order not found");

  if (order.status === "Preparing" || order.status === "Ready") {
    throw new Error("Cannot cancel, order already in progress");
  }

  // Free slot capacity
  const slot = await TimeSlot.findOne({
    startTime: { $lte: order.scheduledTime },
    endTime: { $gte: order.scheduledTime },
  });
  if (slot) {
    slot.bookedOrders = Math.max(0, slot.bookedOrders - 1);
    await slot.save();
  }

  order.status = "Cancelled";
  await order.save();

  return order;
};
