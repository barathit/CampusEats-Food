import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/cart`;

console.log("Cart API BASE URL:", API_BASE_URL);

// ================== GET USER CART ==================
export const getCart = async (token) => {
  const res = await axios.get(`${API_BASE_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== ADD ITEM TO CART ==================
export const addToCart = async (menuItemId, quantity, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/add`,
    { menuItemId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ================== REMOVE ITEM FROM CART ==================
export const removeFromCart = async (menuItemId, token) => {
  const res = await axios.delete(`${API_BASE_URL}/remove/${menuItemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== UPDATE CART ITEM QUANTITY ==================
export const updateCartItem = async (menuItemId, quantity, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/update/${menuItemId}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
