const TimeSlot = require("../models/TimeSlot");

exports.assignSlot = async (vendorId, preferredTime) => {
  const slot = await TimeSlot.findOne({
    vendor: vendorId,
    startTime: { $lte: preferredTime },
    endTime: { $gte: preferredTime },
    bookedOrders: { $lt: "$maxOrders" },
    isActive: true,
  });

  if (!slot) throw new Error("No available slot");

  slot.bookedOrders += 1;
  await slot.save();
  return slot;
};

exports.createSlot = async (vendorId, startTime, endTime, maxOrders) => {
  const slot = new TimeSlot({
    vendor: vendorId,
    startTime,
    endTime,
    maxOrders,
  });
  return slot.save();
};

exports.deactivateSlot = async (slotId) => {
  return TimeSlot.findByIdAndUpdate(slotId, { isActive: false }, { new: true });
};
