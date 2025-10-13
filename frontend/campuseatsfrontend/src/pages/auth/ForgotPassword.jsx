import React, { useState } from "react";
import { forgotPassword } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/resetforgot.css"; // optional custom styles
import logo from "../../assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("❌ Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword(email);
      toast.success(response.message || "✅ OTP sent to your email");

      // Navigate to Reset Password page after 1-2s delay
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-left">
        <img src={logo} alt="Logo" />
      </div>

      <div className="forgot-right">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p>
          Remembered your password? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
