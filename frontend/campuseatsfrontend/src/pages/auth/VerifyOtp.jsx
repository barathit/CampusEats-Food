import React, { useState, useRef, useEffect } from "react";
import { verifyOtp, resendOtp } from "../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/VerifyOtp.css";
import logo from "../../assets/logo.png";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("email");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please signup again.");
      navigate("/signup");
    } else {
      localStorage.setItem("email", email);
    }
  }, [email, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 5) inputsRef.current[index + 1].focus();

      // Auto-submit if all boxes filled
      if (newOtp.every((digit) => digit !== "")) {
        handleSubmitAuto(newOtp.join(""));
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmitAuto = async (otpValue) => {
    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp: otpValue });

      toast.success(response.message || "✅ OTP verified successfully!");

      // Save info in localStorage (optional)
      localStorage.setItem("fullName", response.fullName || "");
      localStorage.setItem("email", response.email || email);

      // ✅ Navigate to login for both user and vendor
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "❌ OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitAuto(otp.join(""));
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const response = await resendOtp(email);
      toast.success(response.message || "✅ OTP resent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-left">
        <img src={logo} alt="CampusEats Logo" />
      </div>

      <div className="verify-right">
        <h2>Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                required
              />
            ))}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="verify-footer">
          Didn't receive OTP?{" "}
          <button
            className="resend-btn"
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default VerifyOtp;
