import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/admin`;

export const getAdminDashboard = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUser = async (userId, token) => {
  const res = await axios.delete(`${API_BASE_URL}/delete-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const promoteToVendor = async (userId, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/promote-to-vendor/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const promoteToAdmin = async (userId, token) => {
  const res = await axios.put(
    `${API_BASE_URL}/promote-to-admin/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
