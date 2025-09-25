import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Smartphone,
  CreditCard,
  Shield,
  Clock,
  Heart,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setNewsletterEmail("");
  };

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Order Food", href: "#", icon: "🍔" },
        { name: "Track Order", href: "#", icon: "📍" },
        { name: "Menu", href: "#", icon: "📋" },
        { name: "Offers & Deals", href: "#", icon: "🎯" },
        { name: "Campus Locations", href: "#", icon: "🏫" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#", icon: "❓" },
        { name: "Customer Care", href: "#", icon: "💬" },
        { name: "Report Issue", href: "#", icon: "⚠️" },
        { name: "Refund Policy", href: "#", icon: "💰" },
        { name: "Terms & Conditions", href: "#", icon: "📜" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About CampusEats", href: "#", icon: "🏢" },
        { name: "Careers", href: "#", icon: "💼" },
        { name: "Partner With Us", href: "#", icon: "🤝" },
        { name: "Press Kit", href: "#", icon: "📰" },
        { name: "Contact Us", href: "#", icon: "📞" },
      ],
    },
  ];

  const campusLocations = [
    "Main Gate",
    "Hostel Block A",
    "Hostel Block B",
    "Library",
    "Sports Complex",
    "Academic Block",
    "Cafeteria",
    "Admin Building",
  ];

  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "UPI", logo: "📱" },
    { name: "Paytm", logo: "📱" },
    { name: "PhonePe", logo: "📱" },
    { name: "Google Pay", logo: "📱" },
  ];

  return (
    <>
      {/* Main Footer */}
      <footer
        className="text-white position-relative"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div className="container-xl position-relative">
          {/* Top Section */}
          <div className="row py-5">
            {/* Brand Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="mb-4">
                <h2
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "2.5rem",
                    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  🍽️ CampusEats
                </h2>
                <p
                  className="text-light mb-4"
                  style={{ fontSize: "16px", lineHeight: "1.6" }}
                >
                  Your favorite campus food delivery app. Fresh, fast, and
                  convenient meals delivered right to your doorstep across the
                  campus.
                </p>
              </div>

              {/* Stats */}
              <div className="row text-center mb-4">
                <div className="col-4">
                  <div
                    className="p-3 rounded-3 mb-2"
                    style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                  >
                    <h4 className="fw-bold text-warning mb-0">50K+</h4>
                    <small className="text-light">Happy Students</small>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="p-3 rounded-3 mb-2"
                    style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                  >
                    <h4 className="fw-bold text-warning mb-0">100+</h4>
                    <small className="text-light">Restaurants</small>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="p-3 rounded-3 mb-2"
                    style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                  >
                    <h4 className="fw-bold text-warning mb-0">24/7</h4>
                    <small className="text-light">Service</small>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3 text-warning">
                  📧 Stay Updated
                </h5>
                <form onSubmit={handleNewsletterSubmit} className="d-flex">
                  <input
                    type="email"
                    className="form-control me-2 border-0 rounded-pill px-4"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                    }}
                    required
                  />
                  <button
                    type="submit"
                    className="btn rounded-pill px-4"
                    style={{
                      background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                      border: "none",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="col-lg-2 col-md-6 mb-4">
                <h5 className="fw-semibold mb-4 text-warning">
                  {section.title}
                </h5>
                <ul className="list-unstyled">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <a
                        href={link.href}
                        className="text-decoration-none d-flex align-items-center"
                        style={{
                          color: "#cbd5e1",
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                          padding: "4px 0",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#ff6b35";
                          e.target.style.paddingLeft = "8px";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#cbd5e1";
                          e.target.style.paddingLeft = "0px";
                        }}
                      >
                        <span className="me-2">{link.icon}</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact & Locations */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="fw-semibold mb-4 text-warning">
                Campus Locations
              </h5>
              <div className="mb-4">
                {campusLocations.slice(0, 5).map((location, index) => (
                  <div key={index} className="mb-2">
                    <small
                      className="text-light d-flex align-items-center"
                      style={{ fontSize: "13px" }}
                    >
                      <MapPin size={12} className="me-2 text-warning" />
                      {location}
                    </small>
                  </div>
                ))}
                <a
                  href="#"
                  className="text-warning small fw-medium"
                  style={{ fontSize: "13px" }}
                >
                  View all locations →
                </a>
              </div>

              {/* Contact Info */}
              <div>
                <h6 className="fw-semibold mb-3 text-warning">Contact</h6>
                <div className="mb-2">
                  <a
                    href="tel:+919876543210"
                    className="text-light text-decoration-none d-flex align-items-center small"
                  >
                    <Phone size={14} className="me-2 text-warning" />
                    +91-9876-543-210
                  </a>
                </div>
                <div className="mb-2">
                  <a
                    href="mailto:support@campuseats.com"
                    className="text-light text-decoration-none d-flex align-items-center small"
                  >
                    <Mail size={14} className="me-2 text-warning" />
                    support@campuseats.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Features & Social */}
          <div
            className="row py-4 border-top border-bottom"
            style={{ borderColor: "rgba(255,255,255,0.1) !important" }}
          >
            {/* App Download */}
            <div className="col-lg-4 col-md-6 mb-3">
              <h6 className="fw-semibold mb-3 text-warning">
                📱 Download Our App
              </h6>
              <div className="d-flex gap-3">
                <button
                  className="btn btn-outline-light rounded-pill px-4 py-2 d-flex align-items-center"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255,107,53,0.1)";
                    e.target.style.borderColor = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                >
                  <Smartphone size={16} className="me-2" />
                  Play Store
                </button>
                <button
                  className="btn btn-outline-light rounded-pill px-4 py-2 d-flex align-items-center"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255,107,53,0.1)";
                    e.target.style.borderColor = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                >
                  🍎 App Store
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="col-lg-4 col-md-6 mb-3">
              <h6 className="fw-semibold mb-3 text-warning">💳 We Accept</h6>
              <div className="d-flex flex-wrap gap-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center px-3 py-2 rounded-pill"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      fontSize: "12px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span className="me-2">{method.logo}</span>
                    {method.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="col-lg-4 col-md-12 mb-3">
              <h6 className="fw-semibold mb-3 text-warning">🌐 Follow Us</h6>
              <div className="d-flex gap-3">
                {[
                  { icon: Facebook, color: "#1877f2" },
                  { icon: Instagram, color: "#e4405f" },
                  { icon: Twitter, color: "#1da1f2" },
                  { icon: Youtube, color: "#ff0000" },
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <button
                      key={index}
                      className="btn rounded-circle p-3 border-0"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        width: "50px",
                        height: "50px",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = social.color;
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor =
                          "rgba(255,255,255,0.1)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      <IconComponent size={20} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="row py-4 align-items-center">
            <div className="col-lg-6 col-md-8 mb-3 mb-lg-0">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <p className="mb-0 text-light">
                  © 2025 CampusEats. All rights reserved.
                </p>
                <div className="d-flex gap-3">
                  <a href="#" className="text-light small text-decoration-none">
                    Privacy Policy
                  </a>
                  <span className="text-light">|</span>
                  <a href="#" className="text-light small text-decoration-none">
                    Terms of Service
                  </a>
                  <span className="text-light">|</span>
                  <a href="#" className="text-light small text-decoration-none">
                    Cookies
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-4 d-flex justify-content-md-end align-items-center gap-3">
              <div className="d-flex align-items-center text-light small">
                <Shield size={16} className="me-2 text-success" />
                SSL Secured
              </div>
              <div className="d-flex align-items-center text-light small">
                <Clock size={16} className="me-2 text-info" />
                24/7 Support
              </div>
              <div className="text-light small">
                Made with <Heart size={14} className="text-danger mx-1" /> for
                Students
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className="btn position-fixed rounded-circle border-0 shadow-lg"
        onClick={scrollToTop}
        style={{
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          background: "linear-gradient(45deg, #ff6b35, #f7931e)",
          color: "white",
          zIndex: 1000,
          transition: "all 0.3s ease",
          transform: showBackToTop ? "scale(1)" : "scale(0)",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 8px 25px rgba(255,107,53,0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        }}
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Footer;
