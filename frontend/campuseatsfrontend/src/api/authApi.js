import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/auth`;

console.log("API BASE URL:", API_BASE_URL);

// Signup
export const signup = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/signup`, userData);
  return res.data;
};

// Verify OTP
export const verifyOtp = async (otpData) => {
  const res = await axios.post(`${API_BASE_URL}/verify-otp`, otpData);
  return res.data;
};

// Resend OTP
export const resendOtp = async (email) => {
  const res = await axios.post(`${API_BASE_URL}/resend-otp`, { email });
  return res.data;
};

// Login
export const login = async (credentials) => {
  const res = await axios.post(`${API_BASE_URL}/login`, credentials);
  return res.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
  return res.data;
};

// Reset Password
export const resetPassword = async (token, password) => {
  const res = await axios.post(`${API_BASE_URL}/reset-password/${token}`, {
    password,
  });
  return res.data;
};
