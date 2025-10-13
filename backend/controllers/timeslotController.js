const TimeSlot = require("../models/TimeSlot");
const Order = require("../models/Order");

/**
 * ===========================
 * 📌 Time Slot Controller
 * ===========================
 * Handles:
 * - Fetching vendor slots
 * - Booking slots for orders
 * - Updating (rescheduling) slots
 */

/**
 * 📌 Get all active slots for a vendor
 * ------------------------------------
 * Example: GET /api/timeslots/vendor/:vendorId
 */
exports.getVendorSlots = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    const slots = await TimeSlot.find({
      vendor: vendorId,
      isActive: true,
    }).sort("startTime");

    return res.status(200).json({
      message: "Available slots fetched",
      slots,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Book a slot for an order
 * ------------------------------------
 * Example: POST /api/timeslots/book
 * Body: { orderId, slotId }
 */
exports.bookSlot = async (req, res) => {
  try {
    const { orderId, slotId } = req.body;
    const userId = req.user.id;

    // ✅ Validate order belongs to user
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Validate slot availability
    const slot = await TimeSlot.findById(slotId);
    if (!slot || !slot.isActive)
      return res.status(404).json({ message: "Time slot not found" });

    if (slot.bookedOrders >= slot.maxOrders) {
      return res.status(400).json({ message: "Time slot is full" });
    }

    // ✅ Book slot
    slot.bookedOrders += 1;
    await slot.save();

    // ✅ Attach slot to order
    order.timeSlot = slot._id;
    await order.save();

    return res.status(200).json({
      message: "Time slot booked successfully",
      order,
      slot,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Update (Reschedule) slot
 * ------------------------------------
 * Example: PUT /api/timeslots/reschedule
 * Body: { orderId, newSlotId }
 */
exports.updateSlot = async (req, res) => {
  try {
    const { orderId, newSlotId } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "timeSlot"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    // 🕒 Prevent rescheduling if prep already started
    const currentTime = new Date();
    const prepStartTime = new Date(order.timeSlot.startTime);
    prepStartTime.setHours(prepStartTime.getHours() - 1);

    if (currentTime >= prepStartTime) {
      return res
        .status(400)
        .json({ message: "Cannot change slot, food prep started" });
    }

    // ✅ Free old slot
    const oldSlot = await TimeSlot.findById(order.timeSlot._id);
    if (oldSlot) {
      oldSlot.bookedOrders = Math.max(0, oldSlot.bookedOrders - 1);
      await oldSlot.save();
    }

    // ✅ Assign new slot
    const newSlot = await TimeSlot.findById(newSlotId);
    if (!newSlot || !newSlot.isActive)
      return res.status(404).json({ message: "New slot not found" });

    if (newSlot.bookedOrders >= newSlot.maxOrders) {
      return res.status(400).json({ message: "New time slot is full" });
    }

    newSlot.bookedOrders += 1;
    await newSlot.save();

    order.timeSlot = newSlot._id;
    await order.save();

    return res.status(200).json({
      message: "Time slot updated successfully",
      order,
      newSlot,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
