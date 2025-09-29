import React, { useState } from "react";
import { login } from "../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      // Navigate based on role
      setTimeout(() => {
        if (response.role === "admin") {
          navigate("/admindashboard");
        } else if (response.role === "vendor") {
          navigate("/registervendor");
        } else {
          navigate("/home");
        }
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Quick login for super admin (development only)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: -200px;
          right: -200px;
          animation: float 8s ease-in-out infinite;
        }

        .login-page::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          bottom: -150px;
          left: -150px;
          animation: float 10s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .login-container {
          display: flex;
          width: 100%;
          max-width: 1200px;
          margin: auto;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          margin: 40px 20px;
        }

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: -100px;
          left: -100px;
        }

        .logo-section {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .logo-icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .brand-name {
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .brand-tagline {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          line-height: 1.6;
        }

        .features-list {
          margin-top: 40px;
          list-style: none;
          padding: 0;
        }

        .features-list li {
          color: white;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 500;
        }

        .features-list li::before {
          content: '✓';
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .login-right {
          flex: 1;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-header {
          margin-bottom: 40px;
        }

        .login-title {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .login-subtitle {
          font-size: 15px;
          color: #6b7280;
        }

        .quick-admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #fef3c7;
          color: #92400e;
          border: 2px solid #fcd34d;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.3s ease;
        }

        .quick-admin-btn:hover {
          background: #fde68a;
          transform: translateY(-2px);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
          font-family: 'Inter', sans-serif;
        }

        .form-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #667eea;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: #6b7280;
        }

        .login-footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-footer a:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          font-size: 13px;
          color: #9ca3af;
          font-weight: 500;
        }

        @media (max-width: 968px) {
          .login-left {
            display: none;
          }

          .login-container {
            max-width: 500px;
          }

          .login-right {
            padding: 40px 30px;
          }
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 0;
          }

          .login-container {
            margin: 0;
            border-radius: 0;
            min-height: 100vh;
          }

          .login-right {
            padding: 30px 20px;
          }

          .login-title {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-container">
          {/* Left Side - Branding */}
          <div className="login-left">
            <div className="logo-section">
              <div className="logo-icon">🍽️</div>
              <h1 className="brand-name">CampusEats</h1>
              <p className="brand-tagline">
                Your favorite campus food,
                <br />
                delivered fresh & fast
              </p>

              <ul className="features-list">
                <li>Order from multiple vendors</li>
                <li>Track your delivery in real-time</li>
                <li>Exclusive student discounts</li>
                <li>Quick & easy checkout</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="login-right">
            <div className="login-header">
              <h2 className="login-title">Welcome Back!</h2>
              <p className="login-subtitle">
                Please enter your credentials to continue
              </p>

              {/* Quick Admin Login Button (Development Only) */}
              {/* <button
                type="button"
                className="quick-admin-btn"
                onClick={handleQuickAdminLogin}
                title="Quick login as Super Admin"
              >
                <Shield size={14} />
                Super Admin Login
              </button> */}
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Input */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            <div className="login-footer">
              Don't have an account? <a href="/">Sign Up</a>
            </div>

            <div className="login-footer">
              Forgot password? <a href="/forgot-password">Reset Password</a>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Login;
