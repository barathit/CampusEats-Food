import React, { useState, useEffect } from "react";
import {
  Tag,
  Percent,
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  Gift,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";

const OfferShowcase = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchActiveOffers();
  }, []);

  const fetchActiveOffers = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with: const response = await getActiveOffers();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockOffers = [
        {
          _id: "1",
          title: "Weekend Special",
          description:
            "Get amazing discounts on all burgers this weekend! Perfect for your Friday cravings.",
          discountPercentage: 25,
          startDate: "2025-10-11T00:00:00",
          endDate: "2025-10-13T23:59:59",
          isActive: true,
          category: "weekend",
          featured: true,
        },
        {
          _id: "2",
          title: "Student Saver",
          description:
            "Show your student ID and save big on combo meals. Valid on all days!",
          discountPercentage: 15,
          startDate: "2025-10-10T00:00:00",
          endDate: "2025-10-20T23:59:59",
          isActive: true,
          category: "student",
          featured: false,
        },
        {
          _id: "3",
          title: "First Order Bonus",
          description:
            "New customers get extra discount on their first order. Welcome to CampusEats!",
          discountPercentage: 30,
          startDate: "2025-10-01T00:00:00",
          endDate: "2025-10-31T23:59:59",
          isActive: true,
          category: "new-user",
          featured: true,
        },
        {
          _id: "4",
          title: "Lunch Rush Deal",
          description:
            "Beat the lunch rush with our exclusive midday deals. Available 11 AM - 2 PM.",
          discountPercentage: 20,
          startDate: "2025-10-10T00:00:00",
          endDate: "2025-10-25T23:59:59",
          isActive: true,
          category: "time-special",
          featured: false,
        },
        {
          _id: "5",
          title: "Mega Monday",
          description:
            "Start your week right with massive discounts every Monday!",
          discountPercentage: 35,
          startDate: "2025-10-13T00:00:00",
          endDate: "2025-10-13T23:59:59",
          isActive: true,
          category: "weekend",
          featured: true,
        },
        {
          _id: "6",
          title: "Combo Bonanza",
          description:
            "Order any combo meal and get extra savings. More food, less money!",
          discountPercentage: 18,
          startDate: "2025-10-08T00:00:00",
          endDate: "2025-10-18T23:59:59",
          isActive: true,
          category: "combo",
          featured: false,
        },
      ];
      setOffers(mockOffers);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const categories = [
    { id: "all", name: "All Offers", icon: Tag },
    { id: "weekend", name: "Weekend", icon: Sparkles },
    { id: "student", name: "Student", icon: TrendingUp },
    { id: "new-user", name: "New User", icon: Gift },
  ];

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredOffers = filteredOffers.filter((offer) => offer.featured);
  const regularOffers = filteredOffers.filter((offer) => !offer.featured);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Hero Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)",
          color: "white",
          padding: "60px 24px",
          boxShadow: "0 4px 20px rgba(255, 107, 53, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255, 255, 255, 0.2)",
                padding: "8px 20px",
                borderRadius: "30px",
                marginBottom: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <Sparkles size={20} />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                Amazing Deals Await!
              </span>
            </div>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 800,
                marginBottom: "16px",
                lineHeight: 1.2,
              }}
            >
              🎉 Exclusive Offers
            </h1>
            <p
              style={{
                fontSize: "18px",
                opacity: 0.95,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Save big on your favorite meals with our handpicked deals and
              special offers
            </p>
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}
      >
        {/* Search and Filter Section */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "300px", position: "relative" }}>
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                }}
              />
              <input
                type="text"
                placeholder="Search for offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 48px",
                  borderRadius: "12px",
                  border: "2px solid #e9ecef",
                  fontSize: "16px",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.3s ease",
                  background: "white",
                }}
              />
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "25px",
                    border: isActive ? "none" : "2px solid #e9ecef",
                    background: isActive
                      ? "linear-gradient(135deg, #ff6b35, #ff8c61)"
                      : "white",
                    color: isActive ? "white" : "#666",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                    boxShadow: isActive
                      ? "0 4px 12px rgba(255, 107, 53, 0.3)"
                      : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "100px 20px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "5px solid #e9ecef",
                borderTopColor: "#ff6b35",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Tag size={64} color="#ddd" style={{ marginBottom: "20px" }} />
            <h3
              style={{ fontSize: "24px", color: "#333", marginBottom: "12px" }}
            >
              No offers found
            </h3>
            <p style={{ color: "#999", fontSize: "16px" }}>
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <>
            {/* Featured Offers Section */}
            {featuredOffers.length > 0 && (
              <div style={{ marginBottom: "50px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                  }}
                >
                  <Sparkles size={28} color="#ff6b35" />
                  <h2
                    style={{ fontSize: "32px", fontWeight: 700, color: "#333" }}
                  >
                    Featured Offers
                  </h2>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(380px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {featuredOffers.map((offer) => {
                    const daysLeft = getDaysRemaining(offer.endDate);
                    return (
                      <div
                        key={offer._id}
                        style={{
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #fff8f5 100%)",
                          borderRadius: "24px",
                          padding: "0",
                          boxShadow: "0 8px 24px rgba(255, 107, 53, 0.15)",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          border: "2px solid #ffe8dc",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-8px)";
                          e.currentTarget.style.boxShadow =
                            "0 16px 40px rgba(255, 107, 53, 0.25)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 24px rgba(255, 107, 53, 0.15)";
                        }}
                      >
                        {/* Featured Badge */}
                        <div
                          style={{
                            background:
                              "linear-gradient(135deg, #ff6b35, #ff8c61)",
                            padding: "12px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              color: "white",
                              fontSize: "14px",
                              fontWeight: 600,
                            }}
                          >
                            <Sparkles size={16} />
                            FEATURED
                          </div>
                          <div
                            style={{
                              background: "rgba(255, 255, 255, 0.3)",
                              padding: "4px 12px",
                              borderRadius: "12px",
                              color: "white",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                          </div>
                        </div>

                        <div style={{ padding: "24px" }}>
                          {/* Discount Badge */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              background:
                                "linear-gradient(135deg, #28a745, #34ce57)",
                              color: "white",
                              padding: "12px 24px",
                              borderRadius: "20px",
                              fontSize: "32px",
                              fontWeight: 800,
                              marginBottom: "20px",
                              boxShadow: "0 6px 20px rgba(40, 167, 69, 0.3)",
                            }}
                          >
                            <Percent size={24} />
                            {offer.discountPercentage}
                            <span style={{ fontSize: "18px", fontWeight: 600 }}>
                              OFF
                            </span>
                          </div>

                          <h3
                            style={{
                              fontSize: "28px",
                              fontWeight: 700,
                              color: "#333",
                              marginBottom: "12px",
                            }}
                          >
                            {offer.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "#666",
                              lineHeight: "1.7",
                              marginBottom: "20px",
                            }}
                          >
                            {offer.description}
                          </p>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "14px",
                              background: "white",
                              borderRadius: "12px",
                              marginBottom: "16px",
                              border: "1px solid #ffe8dc",
                            }}
                          >
                            <Calendar size={18} color="#ff6b35" />
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#666",
                                fontWeight: 500,
                              }}
                            >
                              Valid: {formatDate(offer.startDate)} -{" "}
                              {formatDate(offer.endDate)}
                            </span>
                          </div>

                          <button
                            style={{
                              width: "100%",
                              padding: "16px",
                              background:
                                "linear-gradient(135deg, #ff6b35, #ff8c61)",
                              color: "white",
                              border: "none",
                              borderRadius: "14px",
                              fontSize: "16px",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
                            }}
                          >
                            Claim Offer
                            <ArrowRight size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regular Offers Section */}
            {regularOffers.length > 0 && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                  }}
                >
                  <Gift size={28} color="#ff6b35" />
                  <h2
                    style={{ fontSize: "32px", fontWeight: 700, color: "#333" }}
                  >
                    More Great Deals
                  </h2>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {regularOffers.map((offer) => {
                    const daysLeft = getDaysRemaining(offer.endDate);
                    return (
                      <div
                        key={offer._id}
                        style={{
                          background: "white",
                          borderRadius: "20px",
                          padding: "24px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          cursor: "pointer",
                          border: "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 12px 24px rgba(0, 0, 0, 0.15)";
                          e.currentTarget.style.borderColor = "#ff6b35";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(0, 0, 0, 0.08)";
                          e.currentTarget.style.borderColor = "transparent";
                        }}
                      >
                        {/* Days Left Badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            background: daysLeft <= 2 ? "#ef5350" : "#ffa726",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Clock size={14} />
                          {daysLeft}d left
                        </div>

                        {/* Discount Badge */}
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background:
                              "linear-gradient(135deg, #28a745, #34ce57)",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "16px",
                            fontSize: "24px",
                            fontWeight: 700,
                            marginBottom: "16px",
                            boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                          }}
                        >
                          <Percent size={18} />
                          {offer.discountPercentage}
                        </div>

                        <h3
                          style={{
                            fontSize: "22px",
                            fontWeight: 700,
                            color: "#333",
                            marginBottom: "10px",
                            paddingRight: "60px",
                          }}
                        >
                          {offer.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            lineHeight: "1.6",
                            marginBottom: "16px",
                          }}
                        >
                          {offer.description}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px",
                            background: "#f8f9fa",
                            borderRadius: "10px",
                            marginBottom: "16px",
                          }}
                        >
                          <Calendar size={16} color="#666" />
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              fontWeight: 500,
                            }}
                          >
                            {formatDate(offer.startDate)} -{" "}
                            {formatDate(offer.endDate)}
                          </span>
                        </div>

                        <button
                          style={{
                            width: "100%",
                            padding: "12px",
                            background: "white",
                            color: "#ff6b35",
                            border: "2px solid #ff6b35",
                            borderRadius: "12px",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #ff6b35, #ff8c61)";
                            e.currentTarget.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white";
                            e.currentTarget.style.color = "#ff6b35";
                          }}
                        >
                          Claim Now
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          color: "white",
          padding: "60px 24px",
          marginTop: "60px",
        }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{ fontSize: "36px", fontWeight: 700, marginBottom: "16px" }}
          >
            Never Miss a Deal!
          </h2>
          <p style={{ fontSize: "16px", opacity: 0.9, marginBottom: "32px" }}>
            Subscribe to get exclusive offers and early access to our best deals
          </p>
          <button
            style={{
              padding: "16px 48px",
              background: "linear-gradient(135deg, #ff6b35, #ff8c61)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(255, 107, 53, 0.4)",
              transition: "all 0.3s ease",
            }}
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferShowcase;
