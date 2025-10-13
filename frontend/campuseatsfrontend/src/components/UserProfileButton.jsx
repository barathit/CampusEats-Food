import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, ShoppingBag, Heart } from "lucide-react";

/**
 * Enhanced User Profile Button Component
 *
 * Features:
 * - Avatar with profile picture
 * - Dropdown menu with navigation options
 * - Smooth animations and hover effects
 * - Click outside to close
 * - Responsive design
 */
const UserProfileButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", role: "" });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fullName = localStorage.getItem("fullName") || "Student";
    const role = localStorage.getItem("role") || "";
    setUserInfo({ name: fullName, role });

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      alert("You must be logged in as a student to view your profile.");
      return;
    }
    navigate("/user-profile");
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  const menuItems = [
    {
      icon: User,
      label: "View Profile",
      onClick: handleProfileClick,
      color: "#667eea",
    },
    {
      icon: ShoppingBag,
      label: "My Orders",
      onClick: () => {
        navigate("/orders");
        setIsOpen(false);
      },
      color: "#10b981",
    },
    {
      icon: Heart,
      label: "Favorites",
      onClick: () => {
        navigate("/favorites");
        setIsOpen(false);
      },
      color: "#ef4444",
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        navigate("/settings");
        setIsOpen(false);
      },
      color: "#6b7280",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .profile-button-wrapper {
          position: relative;
          display: inline-block;
        }

        .profile-avatar-button {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          background: white;
          position: relative;
        }

        .profile-avatar-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        }

        .profile-avatar-button:active {
          transform: scale(0.98);
        }

        .profile-avatar-button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-online-badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 260px;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          overflow: hidden;
        }

        .profile-dropdown::before {
          content: '';
          position: absolute;
          top: -6px;
          right: 16px;
          width: 12px;
          height: 12px;
          background: white;
          transform: rotate(45deg);
          box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);
        }

        .profile-header {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .profile-header-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: white;
        }

        .profile-header-role {
          font-size: 13px;
          opacity: 0.9;
          margin: 0;
          text-transform: capitalize;
        }

        .profile-menu {
          padding: 8px;
        }

        .profile-menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          gap: 12px;
        }

        .profile-menu-item:hover {
          background: #f3f4f6;
          transform: translateX(4px);
        }

        .profile-menu-item svg {
          flex-shrink: 0;
        }

        .profile-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 8px 0;
        }

        .profile-logout-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #ef4444;
          gap: 12px;
        }

        .profile-logout-item:hover {
          background: #fee2e2;
          transform: translateX(4px);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .profile-dropdown {
            min-width: 240px;
          }
        }
      `}</style>

      <div className="profile-button-wrapper" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="profile-avatar-button"
          title="User Profile"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              userInfo.name
            )}&background=ff6b35&color=fff&size=45&bold=true`}
            alt="Profile"
          />
          <div className="profile-online-badge"></div>
        </button>

        {isOpen && (
          <div className="profile-dropdown">
            <div className="profile-header">
              <h4 className="profile-header-name">{userInfo.name}</h4>
              <p className="profile-header-role">{userInfo.role}</p>
            </div>

            <div className="profile-menu">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="profile-menu-item"
                  >
                    <Icon size={18} style={{ color: item.color }} />
                    {item.label}
                  </button>
                );
              })}

              <div className="profile-divider"></div>

              <button onClick={handleLogout} className="profile-logout-item">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfileButton;
