import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Tag,
  Calendar,
  Percent,
  X,
  Check,
  AlertCircle,
  Search,
} from "lucide-react";

const OfferManagement = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const token = "sampletoken";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockOffers = [
        {
          _id: "1",
          title: "Weekend Special",
          description: "Get amazing discounts on all burgers this weekend!",
          discountPercentage: 25,
          startDate: "2025-10-11T00:00:00",
          endDate: "2025-10-13T23:59:59",
          isActive: true,
        },
        {
          _id: "2",
          title: "Student Saver",
          description: "Show your student ID and save big on combo meals",
          discountPercentage: 15,
          startDate: "2025-10-10T00:00:00",
          endDate: "2025-10-20T23:59:59",
          isActive: true,
        },
        {
          _id: "3",
          title: "First Order Bonus",
          description: "New customers get extra discount on their first order",
          discountPercentage: 30,
          startDate: "2025-10-01T00:00:00",
          endDate: "2025-10-31T23:59:59",
          isActive: true,
        },
      ];
      setOffers(mockOffers);
    } catch (error) {
      showToast("Failed to fetch offers", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToast("Please enter offer title", "error");
      return false;
    }
    if (!formData.description.trim()) {
      showToast("Please enter offer description", "error");
      return false;
    }
    if (
      !formData.discountPercentage ||
      formData.discountPercentage <= 0 ||
      formData.discountPercentage > 100
    ) {
      showToast("Please enter valid discount percentage (1-100)", "error");
      return false;
    }
    if (!formData.startDate || !formData.endDate) {
      showToast("Please select start and end dates", "error");
      return false;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      showToast("End date must be after start date", "error");
      return false;
    }
    return true;
  };

  const handleCreateOffer = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newOffer = {
        _id: Date.now().toString(),
        ...formData,
        discountPercentage: parseFloat(formData.discountPercentage),
        isActive: true,
      };

      setOffers((prev) => [newOffer, ...prev]);
      showToast("Offer created successfully! 🎉", "success");
      resetForm();
      setShowCreateForm(false);
    } catch (error) {
      showToast("Failed to create offer", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOffer = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === editingOffer._id
            ? {
                ...offer,
                ...formData,
                discountPercentage: parseFloat(formData.discountPercentage),
              }
            : offer
        )
      );

      showToast("Offer updated successfully! ✅", "success");
      resetForm();
      setEditingOffer(null);
    } catch (error) {
      showToast("Failed to update offer", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
      showToast("Offer deleted successfully", "success");
      setDeleteConfirm(null);
    } catch (error) {
      showToast("Failed to delete offer", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discountPercentage: offer.discountPercentage.toString(),
      startDate: offer.startDate.split("T")[0],
      endDate: offer.endDate.split("T")[0],
    });
    setShowCreateForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discountPercentage: "",
      startDate: "",
      endDate: "",
    });
  };

  const cancelEdit = () => {
    setEditingOffer(null);
    resetForm();
    setShowCreateForm(false);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredOffers = offers.filter(
    (offer) =>
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          background: "linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)",
          color: "white",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(255, 107, 53, 0.3)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Tag size={32} />
                Offer Management
              </h1>
              <p style={{ fontSize: "14px", opacity: 0.9 }}>
                Create and manage special offers for your customers
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{
                background: "white",
                color: "#ff6b35",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Plus size={20} />
              Create Offer
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "30px 20px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
            >
              Active Offers
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: 700, color: "#ff6b35" }}
            >
              {offers.length}
            </div>
          </div>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
            >
              Avg. Discount
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: 700, color: "#28a745" }}
            >
              {offers.length > 0
                ? Math.round(
                    offers.reduce((sum, o) => sum + o.discountPercentage, 0) /
                      offers.length
                  )
                : 0}
              %
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div style={{ position: "relative", maxWidth: "400px" }}>
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
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 48px",
                borderRadius: "12px",
                border: "2px solid #e9ecef",
                fontSize: "16px",
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.3s ease",
              }}
            />
          </div>
        </div>

        {showCreateForm && (
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "20px",
              marginBottom: "30px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              animation: "slideDown 0.3s ease",
            }}
          >
            <style>{`
              @keyframes slideDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#333" }}>
                {editingOffer ? "Edit Offer" : "Create New Offer"}
              </h2>
              <button
                onClick={cancelEdit}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <X size={24} color="#999" />
              </button>
            </div>

            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  Offer Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekend Special"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid #e9ecef",
                    fontSize: "16px",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your offer..."
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid #e9ecef",
                    fontSize: "16px",
                    fontFamily: "'Poppins', sans-serif",
                    resize: "vertical",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      color: "#333",
                    }}
                  >
                    Discount (%) *
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    placeholder="25"
                    min="1"
                    max="100"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      fontSize: "16px",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      color: "#333",
                    }}
                  >
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      fontSize: "16px",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      color: "#333",
                    }}
                  >
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      fontSize: "16px",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  onClick={cancelEdit}
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "2px solid #e9ecef",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: "white",
                    color: "#666",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={editingOffer ? handleUpdateOffer : handleCreateOffer}
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: "14px",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    background: "linear-gradient(135deg, #ff6b35, #ff8c61)",
                    color: "white",
                    opacity: loading ? 0.7 : 1,
                    boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
                  }}
                >
                  {loading
                    ? "Saving..."
                    : editingOffer
                    ? "Update Offer"
                    : "Create Offer"}
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && offers.length === 0 ? (
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
              {searchTerm ? "No offers found" : "No offers yet"}
            </h3>
            <p
              style={{ color: "#999", fontSize: "16px", marginBottom: "24px" }}
            >
              {searchTerm
                ? "Try a different search term"
                : "Create your first offer to get started!"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateForm(true)}
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ff8c61)",
                  color: "white",
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Plus size={20} />
                Create Offer
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredOffers.map((offer) => (
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
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "linear-gradient(135deg, #28a745, #34ce57)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "18px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                  }}
                >
                  <Percent size={16} />
                  {offer.discountPercentage}
                </div>

                <div style={{ marginBottom: "16px", paddingRight: "80px" }}>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#333",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Tag size={20} color="#ff6b35" />
                    {offer.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: "1.6",
                    }}
                  >
                    {offer.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                    background: "#f8f9fa",
                    borderRadius: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <Calendar size={16} color="#666" />
                  <span
                    style={{ fontSize: "13px", color: "#666", fontWeight: 500 }}
                  >
                    {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEdit(offer)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "2px solid #ff6b35",
                      borderRadius: "10px",
                      background: "white",
                      color: "#ff6b35",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(offer)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "2px solid #ef5350",
                      borderRadius: "10px",
                      background: "white",
                      color: "#ef5350",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "450px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#ffebee",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <AlertCircle size={40} color="#ef5350" />
            </div>
            <h2
              style={{ fontSize: "24px", marginBottom: "12px", color: "#333" }}
            >
              Delete Offer?
            </h2>
            <p style={{ color: "#666", marginBottom: "8px" }}>
              Are you sure you want to delete this offer?
            </p>
            <p
              style={{ color: "#999", fontSize: "14px", marginBottom: "24px" }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                background: "#f8f9fa",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: "4px",
                }}
              >
                {deleteConfirm.title}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {deleteConfirm.discountPercentage}% OFF
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "16px",
                  background: "#e9ecef",
                  color: "#666",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOffer(deleteConfirm._id)}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #ef5350, #f77a78)",
                  color: "white",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "white",
            padding: "16px 24px",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 2000,
            maxWidth: "400px",
            borderLeft: `4px solid ${
              toast.type === "success" ? "#28a745" : "#ef5350"
            }`,
            animation: "slideInRight 0.3s ease",
          }}
        >
          <style>{`
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(100px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>
          {toast.type === "success" ? (
            <Check size={20} color="#28a745" />
          ) : (
            <AlertCircle size={20} color="#ef5350" />
          )}
          <span style={{ flex: 1, color: "#333", fontWeight: 500 }}>
            {toast.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default OfferManagement;
