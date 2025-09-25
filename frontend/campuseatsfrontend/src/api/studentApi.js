import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/student`; // Student-specific endpoints
console.log("Student API BASE URL:", API_BASE_URL);

// 📌 Register Student Profile (only once)
export const registerStudent = async (studentData, token) => {
  const res = await axios.post(`${API_BASE_URL}/register`, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Update Student Profile
export const updateStudentProfile = async (studentData, token) => {
  const res = await axios.put(`${API_BASE_URL}/update`, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Get Student Dashboard
export const getStudentDashboard = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
