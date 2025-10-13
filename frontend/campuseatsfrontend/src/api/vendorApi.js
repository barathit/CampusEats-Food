import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/vendor`; // Vendor-specific endpoints
console.log("Vendor API BASE URL:", API_BASE_URL);

// 📌 Register or Update Vendor Profile
export const registerVendor = async (vendorData, token) => {
  const res = await axios.post(`${API_BASE_URL}/register`, vendorData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Update Vendor Profile (optional separate endpoint)
export const updateVendorProfile = async (vendorData, token) => {
  const res = await axios.put(`${API_BASE_URL}/update`, vendorData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Get Vendor Dashboard
export const getVendorDashboard = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
