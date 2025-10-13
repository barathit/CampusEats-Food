import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import axios from "axios";

// API Configuration
const config = {
  BASE_URL: "http://localhost:5000/api", // Update this to your actual API URL
};

const API_BASE_URL = `${config.BASE_URL}/menu`;

// API Functions
const searchMenus = async (queryParams) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/search`, {
      params: queryParams,
    });
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

// Mock data fallback
const getMockData = () => ({
  results: 6,
  menu: [
    {
      _id: "1",
      name: "Paneer Tikka Wrap",
      description:
        "Grilled paneer chunks wrapped in soft tortilla with fresh veggies and mint chutney",
      price: 89,
      category: "Lunch",
      isVeg: true,
      availability: true,
      availableCount: 15,
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
      vendor: { fullName: "Taste of India", email: "taste@campus.edu" },
    },
    {
      _id: "2",
      name: "Chicken Biryani Bowl",
      description:
        "Aromatic basmati rice cooked with tender chicken pieces and traditional spices",
      price: 149,
      category: "Lunch",
      isVeg: false,
      availability: true,
      availableCount: 8,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
      vendor: { fullName: "Biryani House", email: "biryani@campus.edu" },
    },
    {
      _id: "3",
      name: "Veggie Supreme Pizza",
      description:
        "Loaded with fresh bell peppers, onions, tomatoes, olives and mozzarella",
      price: 199,
      category: "Dinner",
      isVeg: true,
      availability: true,
      availableCount: 5,
      image:
        "https://images.unsplash.com/photo-1571407970349-bc81e7e96c47?w=400&h=300&fit=crop",
      vendor: { fullName: "Pizza Corner", email: "pizza@campus.edu" },
    },
    {
      _id: "4",
      name: "Masala Dosa",
      description:
        "Crispy rice crepe filled with spiced potato mixture, served with sambar and chutney",
      price: 69,
      category: "Breakfast",
      isVeg: true,
      availability: true,
      availableCount: 20,
      image:
        "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
      vendor: { fullName: "South Indian Express", email: "south@campus.edu" },
    },
    {
      _id: "5",
      name: "Cheese Burst Burger",
      description:
        "Juicy patty with melted cheese, lettuce, tomato and special sauce in toasted bun",
      price: 119,
      category: "Snacks",
      isVeg: false,
      availability: false,
      availableCount: 0,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      vendor: { fullName: "Burger Joint", email: "burger@campus.edu" },
    },
    {
      _id: "6",
      name: "Cold Coffee",
      description:
        "Refreshing iced coffee blended with milk and vanilla ice cream",
      price: 79,
      category: "Snacks",
      isVeg: true,
      availability: true,
      availableCount: 30,
      image:
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
      vendor: { fullName: "Cafe Mocha", email: "cafe@campus.edu" },
    },
    {
      _id: "7",
      name: "Aloo Paratha Combo",
      description: "Stuffed potato paratha served with curd, pickle and butter",
      price: 59,
      category: "Breakfast",
      isVeg: true,
      availability: true,
      availableCount: 25,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      vendor: { fullName: "Paratha Point", email: "paratha@campus.edu" },
    },
    {
      _id: "8",
      name: "Chocolate Shake",
      description:
        "Thick and creamy chocolate milkshake topped with whipped cream",
      price: 89,
      category: "Snacks",
      isVeg: true,
      availability: true,
      availableCount: 18,
      image:
        "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop",
      vendor: { fullName: "Shake Hub", email: "shake@campus.edu" },
    },
  ],
});

const CampusEatsMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    isVeg: "",
    minPrice: "",
    maxPrice: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async (filterParams = {}) => {
    setLoading(true);
    try {
      // Try to fetch from API
      const data = await searchMenus(filterParams);

      if (data && data.menu && data.menu.length > 0) {
        // API returned data
        setMenuItems(data.menu);
        setUsingMockData(false);
      } else {
        // No data from API, use mock data
        console.log("No data from API, using mock data");
        const mockData = getMockData();

        // Apply filters to mock data
        let filtered = mockData.menu;

        if (filterParams.search) {
          const searchLower = filterParams.search.toLowerCase();
          filtered = filtered.filter(
            (item) =>
              item.name.toLowerCase().includes(searchLower) ||
              item.description.toLowerCase().includes(searchLower)
          );
        }

        if (filterParams.category) {
          filtered = filtered.filter(
            (item) => item.category === filterParams.category
          );
        }

        if (filterParams.isVeg !== undefined) {
          filtered = filtered.filter(
            (item) => item.isVeg === (filterParams.isVeg === "true")
          );
        }

        if (filterParams.minPrice) {
          filtered = filtered.filter(
            (item) => item.price >= Number(filterParams.minPrice)
          );
        }

        if (filterParams.maxPrice) {
          filtered = filtered.filter(
            (item) => item.price <= Number(filterParams.maxPrice)
          );
        }

        setMenuItems(filtered);
        setUsingMockData(true);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      // Fallback to mock data on error
      const mockData = getMockData();
      setMenuItems(mockData.menu);
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filterParams = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) filterParams[key] = filters[key];
    });
    fetchMenuItems(filterParams);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      isVeg: "",
      minPrice: "",
      maxPrice: "",
    });
    fetchMenuItems();
    setShowFilters(false);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .menu-card {
          animation: fadeInUp 0.5s ease-out;
        }

        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .skeleton {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .filter-toggle:hover {
          background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }

        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }

        .add-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(40, 167, 69, 0.4);
        }

        .clear-btn:hover {
          background: #f8f9fa;
          border-color: #dee2e6;
        }

        .reset-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }

        .close-filter:hover {
          background: #f8f9fa;
        }

        @media (max-width: 768px) {
          .nav-content {
            flex-direction: column !important;
          }
          .logo {
            font-size: 24px !important;
          }
          .search-bar {
            max-width: 100% !important;
          }
          .page-title {
            font-size: 32px !important;
          }
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .card-footer {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .add-btn {
            width: 100%;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent} className="nav-content">
          <h1 style={styles.logo} className="logo">
            🍔 CampusEats
          </h1>
          <div style={styles.searchBar} className="search-bar">
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && applyFilters()}
              style={styles.searchInput}
            />
          </div>
          <button
            style={styles.filterToggle}
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
      </nav>

      {/* Mock Data Indicator */}
      {usingMockData && (
        <div style={styles.mockDataBanner}>
          ℹ️ Using demo data - API not available or returned no results
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div style={styles.filterPanel}>
          <div style={styles.filterContent}>
            <div style={styles.filterHeader}>
              <h3 style={styles.filterTitle}>Filter Menu</h3>
              <button
                style={styles.closeFilter}
                className="close-filter"
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.filterGrid} className="filter-grid">
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Category</label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  style={styles.filterSelect}
                >
                  <option value="">All Categories</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Food Type</label>
                <select
                  value={filters.isVeg}
                  onChange={(e) => handleFilterChange("isVeg", e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">All</option>
                  <option value="true">Veg Only</option>
                  <option value="false">Non-Veg</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Min Price (₹)</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                  placeholder="0"
                  style={styles.filterInput}
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Max Price (₹)</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  placeholder="500"
                  style={styles.filterInput}
                />
              </div>
            </div>

            <div style={styles.filterActions}>
              <button
                style={styles.clearBtn}
                className="clear-btn"
                onClick={clearFilters}
              >
                Clear All
              </button>
              <button
                style={styles.applyBtn}
                className="apply-btn"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <h2 style={styles.pageTitle} className="page-title">
              Explore Our Menu
            </h2>
            <p style={styles.pageSubtitle}>
              Delicious food from your favorite campus vendors
            </p>
          </div>

          {loading ? (
            <div style={styles.menuGrid} className="menu-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} style={styles.skeletonCard} className="skeleton">
                  <div style={styles.skeletonImage}></div>
                  <div style={styles.skeletonContent}>
                    <div style={styles.skeletonTitle}></div>
                    <div style={styles.skeletonText}></div>
                    <div style={styles.skeletonText}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : menuItems.length === 0 ? (
            <div style={styles.noResults}>
              <div style={styles.noResultsIcon}>🔍</div>
              <h3 style={styles.noResultsTitle}>No items found</h3>
              <p style={styles.noResultsText}>
                Try adjusting your filters or search query
              </p>
              <button
                style={styles.resetBtn}
                className="reset-btn"
                onClick={clearFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div style={styles.resultsCount}>
                Found {menuItems.length} delicious{" "}
                {menuItems.length === 1 ? "item" : "items"}
              </div>
              <div style={styles.menuGrid} className="menu-grid">
                {menuItems.map((item, index) => (
                  <div
                    key={item._id}
                    className="menu-card"
                    style={{
                      ...styles.menuCard,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div style={styles.cardImageWrapper}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.cardImage}
                      />
                      <div style={styles.vegBadge}>
                        <span
                          style={{
                            ...styles.vegIndicator,
                            borderColor: item.isVeg ? "#28a745" : "#dc3545",
                          }}
                        >
                          <span
                            style={{
                              ...styles.vegDot,
                              backgroundColor: item.isVeg
                                ? "#28a745"
                                : "#dc3545",
                            }}
                          ></span>
                        </span>
                      </div>
                      {!item.availability && (
                        <div style={styles.outOfStock}>Out of Stock</div>
                      )}
                    </div>

                    <div style={styles.cardContent}>
                      <div style={styles.cardTop}>
                        <h3 style={styles.cardTitle}>{item.name}</h3>
                        <span style={styles.category}>{item.category}</span>
                      </div>

                      <p style={styles.cardDescription}>
                        {truncateText(item.description, 80)}
                      </p>

                      {item.vendor && (
                        <p style={styles.vendorName}>
                          🏪 {item.vendor.fullName}
                        </p>
                      )}

                      <div style={styles.cardFooter} className="card-footer">
                        <div style={styles.priceSection}>
                          <span style={styles.price}>₹{item.price}</span>
                          {item.availability && item.availableCount <= 10 && (
                            <span style={styles.stock}>
                              Only {item.availableCount} left!
                            </span>
                          )}
                        </div>

                        <button
                          className="add-btn"
                          style={{
                            ...styles.addBtn,
                            ...(item.availability ? {} : styles.disabledBtn),
                          }}
                          disabled={!item.availability}
                        >
                          {item.availability ? "Add to Cart" : "Unavailable"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>CampusEats</h4>
            <p style={styles.footerText}>Fuel your campus hunger 🍔</p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <p style={styles.footerText}>support@campuseats.com</p>
            <p style={styles.footerText}>+91 98765 43210</p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Hours</h4>
            <p style={styles.footerText}>Mon - Fri: 8AM - 10PM</p>
            <p style={styles.footerText}>Sat - Sun: 9AM - 11PM</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          © 2025 CampusEats. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  navbar: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    whiteSpace: "nowrap",
  },
  searchBar: {
    flex: "1",
    minWidth: "250px",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "50px",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "15px",
    color: "#333",
  },
  filterToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    backgroundColor: "#ff6b35",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  mockDataBanner: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "12px 24px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
    borderBottom: "1px solid #ffeeba",
  },
  filterPanel: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e9ecef",
  },
  filterContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
  },
  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  filterTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  },
  closeFilter: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    padding: "8px",
    borderRadius: "8px",
    transition: "background 0.3s ease",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
  },
  filterSelect: {
    padding: "12px",
    border: "2px solid #e9ecef",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.3s ease",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  filterInput: {
    padding: "12px",
    border: "2px solid #e9ecef",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  filterActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  clearBtn: {
    padding: "12px 24px",
    border: "2px solid #e9ecef",
    borderRadius: "50px",
    backgroundColor: "#fff",
    color: "#666",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  applyBtn: {
    padding: "12px 32px",
    border: "none",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  },
  main: {
    padding: "40px 24px",
  },
  contentWrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  pageTitle: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "12px",
  },
  pageSubtitle: {
    fontSize: "18px",
    color: "#666",
    fontWeight: "400",
  },
  resultsCount: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px",
    fontWeight: "500",
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "28px",
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  cardImageWrapper: {
    position: "relative",
    width: "100%",
    height: "220px",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  vegBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "6px 8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  vegIndicator: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    border: "2px solid",
    borderRadius: "4px",
  },
  vegDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  outOfStock: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.85)",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "50px",
    fontSize: "16px",
    fontWeight: "600",
  },
  cardContent: {
    padding: "20px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    gap: "12px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    lineHeight: "1.3",
  },
  category: {
    padding: "4px 12px",
    backgroundColor: "#f0f0f0",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#666",
    whiteSpace: "nowrap",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#777",
    lineHeight: "1.6",
    marginBottom: "12px",
  },
  vendorName: {
    fontSize: "13px",
    color: "#999",
    marginBottom: "16px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  priceSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ff6b35",
  },
  stock: {
    fontSize: "12px",
    color: "#dc3545",
    fontWeight: "500",
  },
  addBtn: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
  },
  disabledBtn: {
    background: "#ddd",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  skeletonCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  skeletonImage: {
    width: "100%",
    height: "220px",
    backgroundColor: "#e9ecef",
  },
  skeletonContent: {
    padding: "20px",
  },
  skeletonTitle: {
    width: "70%",
    height: "24px",
    backgroundColor: "#e9ecef",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  skeletonText: {
    width: "100%",
    height: "16px",
    backgroundColor: "#e9ecef",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  noResults: {
    textAlign: "center",
    padding: "80px 20px",
  },
  noResultsIcon: {
    fontSize: "64px",
    marginBottom: "24px",
  },
  noResultsTitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "12px",
  },
  noResultsText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "28px",
  },
  resetBtn: {
    padding: "14px 32px",
    border: "none",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  },
  footer: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "48px 24px 24px",
    marginTop: "80px",
  },
  footerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    marginBottom: "32px",
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  footerText: {
    fontSize: "14px",
    color: "#bdc3c7",
    lineHeight: "1.6",
  },
  footerBottom: {
    textAlign: "center",
    paddingTop: "24px",
    borderTop: "1px solid #34495e",
    fontSize: "14px",
    color: "#95a5a6",
  },
};

export default CampusEatsMenu;
