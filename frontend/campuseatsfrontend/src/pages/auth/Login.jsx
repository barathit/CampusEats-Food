import React, { useState } from "react";
import { login } from "../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData);
      toast.success(response.message || "✅ Login successful!");

      // Store token and user info in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("fullName", response.fullName);
      localStorage.setItem("email", response.email);

      // Navigate to dashboard or home page after login
      setTimeout(() => {
        navigate("/dashboard"); // change this route as per your app
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <img src={logo} alt="CampusEats Logo" />
      </div>

      {/* Right Side */}
      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="/">Sign Up</a>
        </p>
        <p className="login-footer">
          Forgot password? <a href="/forgot-password">Reset</a>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
