import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/menu`;

console.log("Menu API BASE URL:", API_BASE_URL);

// ================== VENDOR ==================

// Add Menu Item (Vendor)
export const addMenuItem = async (menuData, token) => {
  const res = await axios.post(`${API_BASE_URL}/add`, menuData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update Menu Item (Vendor)
export const updateMenuItem = async (id, menuData, token) => {
  const res = await axios.put(`${API_BASE_URL}/update/${id}`, menuData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update Menu Availability (Vendor)
export const updateMenuAvailability = async (id, availabilityData, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/availability/${id}`,
    availabilityData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Get Vendor Menu with Counts
export const getVendorMenuWithCount = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/vendor`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get Vendor Menu
export const getVendorMenu = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/vendor/menu`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete Menu Item (Vendor)
export const deleteMenuItem = async (id, token) => {
  const res = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== STUDENT ==================

// Get Menu by Vendor (Student)
export const getMenuByVendor = async (vendorId) => {
  const res = await axios.get(`${API_BASE_URL}/vendor/${vendorId}`);
  return res.data;
};

// ================== ADMIN ==================

// Get All Menus (Admin)
export const getAllMenus = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete Menu Item by Admin
export const adminDeleteMenuItem = async (id, token) => {
  const res = await axios.delete(`${API_BASE_URL}/admin/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== SEARCH / FILTER ==================

// Search & Filter Menus
export const searchMenus = async (queryParams) => {
  // queryParams = { search, category, isVeg, minPrice, maxPrice }
  const res = await axios.get(`${API_BASE_URL}/search`, {
    params: queryParams,
  });
  return res.data;
};
