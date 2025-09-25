import React, { useState } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locations = [
    "Main Gate",
    "Hostel",
    "Library",
    "Cafeteria",
    "Sports Complex",
  ];

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white sticky-top"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e5e5e5",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="container-xl px-3">
          <div className="row w-100 align-items-center gx-4">
            {/* Left Section - Logo & Location */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-8 d-flex align-items-center">
              <a
                className="navbar-brand fw-bold me-4 text-decoration-none"
                href="/"
                style={{
                  fontSize: "1.75rem",
                  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                🍽️ CampusEats
              </a>

              {/* Location Dropdown - Desktop */}
              <div className="dropdown d-none d-xl-block position-relative me-3">
                <button
                  className="btn d-flex align-items-center px-3 py-2 rounded-pill border-0"
                  type="button"
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  style={{
                    backgroundColor: "#f8f9fa",
                    transition: "all 0.3s ease",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e9ecef")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#f8f9fa")
                  }
                >
                  <MapPin size={16} className="me-2 text-danger" />
                  <span>Main Gate</span>
                  <ChevronDown size={14} className="ms-2" />
                </button>

                {isLocationOpen && (
                  <div
                    className="dropdown-menu show position-absolute mt-2 border-0 rounded-3"
                    style={{
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      minWidth: "200px",
                      zIndex: 1000,
                      animation: "fadeIn 0.2s ease-in-out",
                    }}
                  >
                    {locations.map((location, index) => (
                      <a
                        key={index}
                        className="dropdown-item py-2 px-3 border-0"
                        href="#"
                        style={{
                          fontSize: "14px",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#fff3e0")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <MapPin size={14} className="me-2 text-danger" />
                        {location}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Middle Section - Search Bar */}
            <div className="col-xl-5 col-lg-4 d-none d-lg-block">
              <div className="position-relative">
                <div
                  className="input-group rounded-pill overflow-hidden"
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    marginLeft: "50px", // <-- Added gap from location
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#ff6b35";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(255,107,53,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow =
                      "0 2px 10px rgba(0,0,0,0.08)";
                  }}
                >
                  <input
                    className="form-control border-0 px-4 py-3"
                    type="search"
                    placeholder="Search for restaurants, food, drinks..."
                    style={{
                      fontSize: "15px",
                      backgroundColor: "#fafafa",
                      outline: "none",
                      boxShadow: "none",
                    }}
                  />
                  <button
                    className="btn border-0 px-4"
                    style={{
                      backgroundColor: "#ff6b35",
                      color: "white",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#e55a2b")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ff6b35")
                    }
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Menu & Actions */}
            <div className="col-xl-4 col-lg-4 d-none d-lg-flex justify-content-end align-items-center">
              {/* Menu Links */}
              <div className="d-flex me-4">
                <a
                  className="text-decoration-none me-4 fw-medium d-flex align-items-center"
                  href="#"
                  style={{
                    color: "#333",
                    fontSize: "15px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#fff3e0";
                    e.target.style.color = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#333";
                  }}
                >
                  Menu
                </a>
                <a
                  className="text-decoration-none fw-medium d-flex align-items-center position-relative"
                  href="#"
                  style={{
                    color: "#333",
                    fontSize: "15px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#fff3e0";
                    e.target.style.color = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#333";
                  }}
                >
                  Offers
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{
                      backgroundColor: "#dc3545",
                      fontSize: "10px",
                      padding: "2px 6px",
                    }}
                  >
                    🔥
                  </span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center">
                <button
                  className="btn me-3 d-flex align-items-center rounded-pill border-0"
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e9ecef";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f8f9fa";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <ShoppingCart size={18} className="me-2" />
                  Cart
                </button>

                <button
                  className="btn text-white fw-medium d-flex align-items-center rounded-pill border-0"
                  style={{
                    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                    padding: "10px 20px",
                    fontSize: "14px",
                    boxShadow: "0 4px 15px rgba(255,107,53,0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 20px rgba(255,107,53,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(255,107,53,0.3)";
                  }}
                >
                  <User size={16} className="me-2" />
                  Login
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="col-4 d-lg-none d-flex justify-content-end">
              <button
                className="btn border-0 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ fontSize: "1.2rem" }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="d-lg-none container-xl px-3 pb-3">
          <div
            className="input-group rounded-3 overflow-hidden"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          >
            <input
              className="form-control border-0 py-2"
              type="search"
              placeholder="Search for food..."
              style={{
                backgroundColor: "#fafafa",
                fontSize: "14px",
              }}
            />
            <button
              className="btn border-0 px-3"
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
              }}
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="d-lg-none border-top"
            style={{
              backgroundColor: "#fafafa",
              animation: "slideDown 0.3s ease",
            }}
          >
            <div className="container-xl px-3 py-3">
              <div className="mb-3 p-3 bg-white rounded-3">
                <div className="d-flex align-items-center text-muted">
                  <MapPin size={16} className="me-2 text-danger" />
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    Main Gate
                  </span>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="mb-3">
                {["Menu", "Offers"].map((item, index) => (
                  <a
                    key={index}
                    className="d-block p-3 mb-2 text-decoration-none bg-white rounded-3"
                    href="#"
                    style={{
                      color: "#333",
                      fontSize: "15px",
                      fontWeight: "500",
                      transition: "background-color 0.2s ease",
                    }}
                    onTouchStart={(e) =>
                      (e.target.style.backgroundColor = "#f8f9fa")
                    }
                    onTouchEnd={(e) =>
                      (e.target.style.backgroundColor = "white")
                    }
                  >
                    {item}
                    {item === "Offers" && <span className="ms-2">🔥</span>}
                  </a>
                ))}

                <a
                  className="d-block p-3 mb-2 text-decoration-none bg-white rounded-3 d-flex align-items-center"
                  href="#"
                  style={{
                    color: "#333",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <ShoppingCart size={16} className="me-2" />
                  Cart
                </a>
              </div>

              <button
                className="btn text-white fw-medium w-100 rounded-3 py-3"
                style={{
                  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                  fontSize: "15px",
                  boxShadow: "0 4px 15px rgba(255,107,53,0.3)",
                }}
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
