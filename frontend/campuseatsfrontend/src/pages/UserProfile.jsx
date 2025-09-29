import React, { useState, useEffect } from "react";
import { getStudentDashboard, updateStudentProfile } from "../api/studentApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Mail, BookOpen, Calendar, Edit2, Save, X } from "lucide-react";

const UserProfile = () => {
  const [studentProfile, setStudentProfile] = useState({
    rollNumber: "",
    department: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Login required");

        const fullName = localStorage.getItem("fullName") || "Student";
        const email = localStorage.getItem("email") || "";
        setUserInfo({ name: fullName, email });

        const response = await getStudentDashboard(token);
        const profile = response.studentProfile;
        setStudentProfile({
          rollNumber: profile.rollNumber,
          department: profile.department,
          year: profile.year,
        });
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setStudentProfile({ ...studentProfile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateStudentProfile(studentProfile, token);
      toast.success(response.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your profile...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <div style={styles.pageContainer}>
        <div style={styles.profileCard}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.avatarSection}>
              <div style={styles.avatarWrapper}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userInfo.name
                  )}&background=ff6b35&color=fff&size=120&bold=true`}
                  alt="Profile"
                  style={styles.avatar}
                />
                <div style={styles.onlineBadge}></div>
              </div>
              <div style={styles.userInfo}>
                <h1 style={styles.userName}>{userInfo.name}</h1>
                <p style={styles.userRole}>
                  <User size={14} style={{ marginRight: "6px" }} />
                  Student
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={styles.editButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(255, 107, 53, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(255, 107, 53, 0.2)";
                }}
              >
                <Edit2 size={16} style={{ marginRight: "8px" }} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                style={styles.cancelButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f1f3f5";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff";
                }}
              >
                <X size={16} style={{ marginRight: "8px" }} />
                Cancel
              </button>
            )}
          </div>

          {/* Divider */}
          <div style={styles.divider}></div>

          {/* Profile Form */}
          <form onSubmit={handleUpdate} style={styles.form}>
            <div style={styles.formGrid}>
              {/* Email (Read-only) */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Mail size={16} style={styles.labelIcon} />
                  Email Address
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="email"
                    value={userInfo.email}
                    disabled
                    style={{ ...styles.input, ...styles.inputDisabled }}
                  />
                </div>
                <span style={styles.helperText}>Email cannot be changed</span>
              </div>

              {/* Roll Number */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <BookOpen size={16} style={styles.labelIcon} />
                  Roll Number
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="text"
                    name="rollNumber"
                    value={studentProfile.rollNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={
                      isEditing
                        ? styles.input
                        : { ...styles.input, ...styles.inputDisabled }
                    }
                    placeholder="Enter your roll number"
                  />
                </div>
              </div>

              {/* Department */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <BookOpen size={16} style={styles.labelIcon} />
                  Department
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="text"
                    name="department"
                    value={studentProfile.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={
                      isEditing
                        ? styles.input
                        : { ...styles.input, ...styles.inputDisabled }
                    }
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>

              {/* Year */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Calendar size={16} style={styles.labelIcon} />
                  Academic Year
                </label>
                <div style={styles.inputWrapper}>
                  <select
                    name="year"
                    value={studentProfile.year}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={
                      isEditing
                        ? styles.select
                        : { ...styles.select, ...styles.inputDisabled }
                    }
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  disabled={updating}
                  style={styles.submitButton}
                  onMouseEnter={(e) => {
                    if (!updating) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(255, 107, 53, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!updating) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 6px 20px rgba(255, 107, 53, 0.3)";
                    }
                  }}
                >
                  {updating ? (
                    <>
                      <div style={styles.buttonSpinner}></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} style={{ marginRight: "8px" }} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Info Card */}
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>ℹ️</div>
            <div>
              <h4 style={styles.infoTitle}>Profile Information</h4>
              <p style={styles.infoText}>
                Keep your profile up to date to help us serve you better. Your
                information is secure and private.
              </p>
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

const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "20px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
  },
  profileCard: {
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "40px",
    maxWidth: "900px",
    width: "100%",
    animation: "slideUp 0.6s ease-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid white",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  onlineBadge: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: "18px",
    height: "18px",
    background: "#10b981",
    border: "3px solid white",
    borderRadius: "50%",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 8px 0",
  },
  userRole: {
    fontSize: "14px",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #ff6b35, #f7931e)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(255, 107, 53, 0.2)",
  },
  cancelButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    background: "white",
    color: "#6b7280",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(to right, transparent, #e5e7eb, transparent)",
    margin: "30px 0",
  },
  form: {
    marginBottom: "30px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "30px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  labelIcon: {
    marginRight: "8px",
    color: "#ff6b35",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "white",
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "white",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  inputDisabled: {
    backgroundColor: "#f9fafb",
    cursor: "not-allowed",
    color: "#9ca3af",
  },
  helperText: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "6px",
    fontStyle: "italic",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 32px",
    background: "linear-gradient(135deg, #ff6b35, #f7931e)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.3)",
    minWidth: "180px",
  },
  buttonSpinner: {
    width: "16px",
    height: "16px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "8px",
  },
  infoCard: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    background: "linear-gradient(135deg, #fff3e0 0%, #ffe6cc 100%)",
    borderRadius: "12px",
    border: "2px solid #ffd699",
  },
  infoIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  infoTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 6px 0",
  },
  infoText: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.6",
  },
};

export default UserProfile;
