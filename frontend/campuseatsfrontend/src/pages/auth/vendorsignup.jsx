import React, { useState, useEffect } from "react";
import { registerVendor } from "../../api/vendorApi";
import { useNavigate } from "react-router-dom";

const SignupVendor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "hotel",
    hotelName: "",
    foodCourtName: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "vendor") {
      navigate("/home");
      return;
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to register as a vendor.");
        setLoading(false);
        return;
      }

      const payload = {
        location: formData.location,
        ...(formData.type === "hotel"
          ? { hotelName: formData.hotelName }
          : { foodCourtName: formData.foodCourtName }),
      };

      const response = await registerVendor(payload, token);
      setMessage(response.message);

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        .vendor-signup-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .vendor-signup-container::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: -150px;
          right: -150px;
          animation: float 6s ease-in-out infinite;
        }

        .vendor-signup-container::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          bottom: -100px;
          left: -100px;
          animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .signup-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 50px 40px;
          width: 100%;
          max-width: 500px;
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .brand-logo {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 32px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .brand-title {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .brand-subtitle {
          color: #6c757d;
          font-size: 15px;
          font-weight: 400;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #2d3748;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-control, .form-select {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #fff;
          font-family: 'Poppins', sans-serif;
        }

        .form-control:focus, .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23667eea' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          appearance: none;
        }

        .type-toggle {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .type-btn {
          flex: 1;
          padding: 14px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 15px;
          color: #4a5568;
        }

        .type-btn:hover {
          border-color: #667eea;
          transform: translateY(-2px);
        }

        .type-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-submit {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 12px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(102, 126, 234, 0.5);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .alert {
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 500;
          animation: slideDown 0.4s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 2px solid #c3e6cb;
        }

        .alert-danger {
          background: #f8d7da;
          color: #721c24;
          border: 2px solid #f5c6cb;
        }

        .input-icon {
          position: relative;
        }

        .input-icon input {
          padding-left: 45px;
        }

        .input-icon::before {
          content: '';
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: #667eea;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 576px) {
          .signup-card {
            padding: 40px 25px;
          }

          .brand-title {
            font-size: 26px;
          }

          .type-toggle {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="vendor-signup-container">
        <div className="signup-card">
          <div className="brand-header">
            <div className="brand-logo">🍽️</div>
            <h1 className="brand-title">CampusEats</h1>
            <p className="brand-subtitle">Join Our Vendor Network</p>
          </div>

          {message && <div className="alert alert-success">✓ {message}</div>}

          {error && <div className="alert alert-danger">✗ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Register As</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={`type-btn ${
                    formData.type === "hotel" ? "active" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, type: "hotel" })}
                >
                  🏨 Hotel
                </button>
                <button
                  type="button"
                  className={`type-btn ${
                    formData.type === "foodcourt" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, type: "foodcourt" })
                  }
                >
                  🍔 Food Court
                </button>
              </div>
            </div>

            {formData.type === "hotel" ? (
              <div className="form-group">
                <label className="form-label">Hotel Name</label>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  placeholder="Enter your hotel name"
                  className="form-control"
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Food Court Name</label>
                <input
                  type="text"
                  name="foodCourtName"
                  value={formData.foodCourtName}
                  onChange={handleChange}
                  placeholder="Enter your food court name"
                  className="form-control"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your business location"
                className="form-control"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Registering...
                </>
              ) : (
                "Complete Registration"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupVendor;
