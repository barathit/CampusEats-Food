import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/payment`;

console.log("Payment API BASE URL:", API_BASE_URL);

// ================== INITIATE PAYMENT ==================
export const initiatePayment = async (orderId, paymentMethod, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/initiate`,
    { orderId, paymentMethod },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ================== PAYMENT CALLBACK / STATUS ==================
export const paymentCallback = async (transactionId, status, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/callback`,
    { transactionId, status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
