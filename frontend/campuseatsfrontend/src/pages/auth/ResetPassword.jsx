import React, { useState } from "react";
import { resetPassword } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../../styles/resetforgot.css";
import logo from "../../assets/logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // get state passed from ForgotPassword
  const { token } = useParams(); // optional: if using token in URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Use token from URL or email from state
      await resetPassword(token || location.state?.token, password);
      toast.success("✅ Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "❌ Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-left">
        <img src={logo} alt="Logo" />
      </div>

      <div className="reset-right">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p>
          Back to <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
