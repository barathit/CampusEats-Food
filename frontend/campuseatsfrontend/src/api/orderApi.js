import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/orders`;

console.log("Order API BASE URL:", API_BASE_URL);

// ================== PLACE ORDER ==================
export const placeOrder = async (orderData, token) => {
  // orderData = { scheduledTime, notes, buyNowItem }
  const res = await axios.post(`${API_BASE_URL}/place`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== UPDATE TIME SLOT ==================
export const updateTimeSlot = async (orderId, newTime, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/timeslot/${orderId}`,
    { newTime },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ================== CANCEL ORDER ==================
export const cancelOrder = async (orderId, token) => {
  const res = await axios.delete(`${API_BASE_URL}/cancel/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== GET USER ORDERS (OPTIONAL) ==================
export const getUserOrders = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== GET ORDER DETAILS BY ID (OPTIONAL) ==================
export const getOrderDetails = async (orderId, token) => {
  const res = await axios.get(`${API_BASE_URL}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
