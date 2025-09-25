import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/timeslots`;

console.log("TimeSlot API BASE URL:", API_BASE_URL);

// ================== GET VENDOR SLOTS ==================
export const getVendorSlots = async (vendorId, token) => {
  const res = await axios.get(`${API_BASE_URL}/vendor/${vendorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== BOOK A SLOT ==================
export const bookSlot = async (orderId, slotId, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/book`,
    { orderId, slotId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ================== UPDATE / RESCHEDULE SLOT ==================
export const updateSlot = async (orderId, newSlotId, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/reschedule`,
    { orderId, newSlotId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
