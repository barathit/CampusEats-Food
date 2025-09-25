import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/admin`; // Admin-specific endpoints
console.log("Admin API BASE URL:", API_BASE_URL);

// 📌 Get Admin Dashboard (List all users)
export const getAdminDashboard = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Delete Any User (Admin Only)
export const deleteUser = async (userId, token) => {
  const res = await axios.delete(`${API_BASE_URL}/delete/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Promote User to Vendor
export const promoteToVendor = async (userId, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/promote/vendor/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// 📌 Promote User to Admin (Only Super Admin)
export const promoteToAdmin = async (userId, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/promote/admin/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
