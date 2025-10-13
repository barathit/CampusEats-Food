import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ShoppingBag,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Package,
  ChefHat,
  Truck,
} from "lucide-react";

// Mock API functions - replace with your actual orderApi imports
const mockPlaceOrder = async (orderData, token) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    order: { id: Date.now(), ...orderData, status: "Pending" },
  };
};

const mockGetUserOrders = async (token) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    orders: [
      {
        _id: "1",
        vendor: { name: "Campus Cafe" },
        items: [{ menuItem: { name: "Burger", price: 120 }, quantity: 2 }],
        totalPrice: 240,
        scheduledTime: "2025-10-13T14:30:00",
        status: "Preparing",
        notes: "Extra cheese please",
        createdAt: "2025-10-13T12:00:00",
      },
      {
        _id: "2",
        vendor: { name: "Pizza Corner" },
        items: [
          { menuItem: { name: "Margherita Pizza", price: 299 }, quantity: 1 },
        ],
        totalPrice: 299,
        scheduledTime: "2025-10-13T18:00:00",
        status: "Pending",
        notes: "",
        createdAt: "2025-10-13T11:30:00",
      },
    ],
  };
};

const mockGetOrderDetails = async (orderId, token) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    order: {
      _id: orderId,
      vendor: { name: "Campus Cafe", location: "Block A" },
      items: [
        {
          menuItem: {
            name: "Burger",
            price: 120,
            description: "Juicy beef patty",
          },
          quantity: 2,
        },
        {
          menuItem: {
            name: "Fries",
            price: 60,
            description: "Crispy golden fries",
          },
          quantity: 1,
        },
      ],
      totalPrice: 300,
      scheduledTime: "2025-10-13T14:30:00",
      status: "Preparing",
      notes: "Extra cheese please",
      createdAt: "2025-10-13T12:00:00",
    },
  };
};

const mockUpdateTimeSlot = async (orderId, newTime, token) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, message: "Time slot updated" };
};

const mockCancelOrder = async (orderId, token) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, message: "Order cancelled" };
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [orderToReschedule, setOrderToReschedule] = useState(null);
  const [newScheduledTime, setNewScheduledTime] = useState("");

  // Place Order Form State
  const [scheduledTime, setScheduledTime] = useState("");
  const [notes, setNotes] = useState("");
  const [buyNow, setBuyNow] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const token = "your-auth-token"; // Replace with actual token from context/localStorage

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await mockGetUserOrders(token);
      setOrders(response.orders || []);
    } catch (error) {
      showToast("Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!scheduledTime) {
      showToast("Please select a scheduled time", "error");
      return;
    }

    setPlacingOrder(true);
    try {
      const orderData = {
        scheduledTime,
        notes,
        buyNowItem: buyNow ? {} : null,
      };
      const response = await mockPlaceOrder(orderData, token);
      showToast("Order placed successfully! 🎉", "success");
      setScheduledTime("");
      setNotes("");
      setBuyNow(false);
      fetchOrders();
    } catch (error) {
      showToast(error.message || "Failed to place order", "error");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const response = await mockGetOrderDetails(orderId, token);
      setSelectedOrder(response.order);
      setShowModal(true);
    } catch (error) {
      showToast("Failed to fetch order details", "error");
    }
  };

  const handleReschedule = (order) => {
    setOrderToReschedule(order);
    setNewScheduledTime("");
    setShowRescheduleModal(true);
  };

  const confirmReschedule = async () => {
    if (!newScheduledTime) {
      showToast("Please select a new time", "error");
      return;
    }

    try {
      await mockUpdateTimeSlot(orderToReschedule._id, newScheduledTime, token);
      showToast("Order rescheduled successfully! ⏰", "success");
      setShowRescheduleModal(false);
      fetchOrders();
    } catch (error) {
      showToast(error.message || "Failed to reschedule", "error");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await mockCancelOrder(orderId, token);
      showToast("Order cancelled successfully", "success");
      setShowCancelConfirm(null);
      fetchOrders();
    } catch (error) {
      showToast(error.message || "Failed to cancel order", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFA726";
      case "Preparing":
        return "#42A5F5";
      case "Completed":
        return "#28A745";
      case "Cancelled":
        return "#EF5350";
      default:
        return "#666";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={16} />;
      case "Preparing":
        return <ChefHat size={16} />;
      case "Completed":
        return <CheckCircle size={16} />;
      case "Cancelled":
        return <X size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="order-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .order-page {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
          min-height: 100vh;
          padding: 20px;
          color: #333;
        }

        .header {
          background: linear-gradient(135deg, #FF6B35 0%, #FF8C61 100%);
          color: white;
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
          position: sticky;
          top: 20px;
          z-index: 10;
        }

        .header h1 {
          font-size: 32px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header p {
          opacity: 0.9;
          margin-top: 8px;
          font-weight: 300;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .place-order-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          height: fit-content;
          animation: fadeInUp 0.5s ease;
        }

        .place-order-card h2 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #FF6B35;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #E9ECEF;
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #FF6B35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .toggle-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .toggle {
          position: relative;
          width: 50px;
          height: 26px;
          background: #E9ECEF;
          border-radius: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle.active {
          background: #28A745;
        }

        .toggle-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .toggle.active .toggle-slider {
          left: 27px;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #FF6B35 0%, #FF8C61 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .orders-section h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .refresh-btn {
          background: white;
          border: 2px solid #FF6B35;
          color: #FF6B35;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: #FF6B35;
          color: white;
          transform: rotate(90deg);
        }

        .orders-grid {
          display: grid;
          gap: 20px;
        }

        .order-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease;
          border: 2px solid transparent;
        }

        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          border-color: #FF6B35;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .vendor-info h3 {
          font-size: 20px;
          color: #333;
          margin-bottom: 4px;
        }

        .order-id {
          font-size: 12px;
          color: #999;
        }

        .status-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
          padding: 16px;
          background: #F8F9FA;
          border-radius: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #555;
        }

        .detail-value {
          font-weight: 600;
          color: #333;
        }

        .order-actions {
          display: flex;
          gap: 10px;
        }

        .btn-action {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 14px;
        }

        .btn-reschedule {
          background: #E3F2FD;
          color: #1976D2;
        }

        .btn-reschedule:hover {
          background: #1976D2;
          color: white;
        }

        .btn-cancel {
          background: #FFEBEE;
          color: #D32F2F;
        }

        .btn-cancel:hover {
          background: #D32F2F;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 20px;
          animation: fadeIn 0.5s ease;
        }

        .empty-state-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }

        .empty-state p {
          color: #999;
          font-size: 14px;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #E9ECEF;
          border-top-color: #FF6B35;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          padding: 20px;
        }

        .modal {
          background: white;
          border-radius: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #E9ECEF;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }

        .modal-header h2 {
          font-size: 24px;
          color: #333;
        }

        .close-btn {
          background: #F8F9FA;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: #FF6B35;
          color: white;
        }

        .modal-content {
          padding: 24px;
        }

        .progress-bar {
          display: flex;
          justify-content: space-between;
          margin: 24px 0;
          position: relative;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 40px;
          right: 40px;
          height: 3px;
          background: #E9ECEF;
          z-index: 0;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .progress-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #E9ECEF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          transition: all 0.3s ease;
        }

        .progress-step.active .progress-icon {
          background: #FF6B35;
          color: white;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
        }

        .progress-step.completed .progress-icon {
          background: #28A745;
          color: white;
        }

        .progress-label {
          font-size: 12px;
          font-weight: 500;
          color: #999;
        }

        .progress-step.active .progress-label,
        .progress-step.completed .progress-label {
          color: #333;
        }

        .order-items {
          background: #F8F9FA;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .order-items h3 {
          font-size: 16px;
          margin-bottom: 12px;
          color: #333;
        }

        .item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #E9ECEF;
        }

        .item:last-child {
          border-bottom: none;
        }

        .item-name {
          font-weight: 500;
        }

        .item-desc {
          font-size: 12px;
          color: #999;
        }

        .item-price {
          font-weight: 600;
          color: #FF6B35;
        }

        .total-section {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          background: #F8F9FA;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideInRight 0.3s ease;
          z-index: 2000;
          max-width: 400px;
        }

        .toast.success {
          border-left: 4px solid #28A745;
        }

        .toast.error {
          border-left: 4px solid #EF5350;
        }

        .confirm-dialog {
          background: white;
          border-radius: 20px;
          padding: 30px;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .confirm-dialog h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: #333;
        }

        .confirm-dialog p {
          color: #666;
          margin-bottom: 24px;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
        }

        .btn-confirm {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-confirm.cancel {
          background: #E9ECEF;
          color: #333;
        }

        .btn-confirm.cancel:hover {
          background: #DEE2E6;
        }

        .btn-confirm.danger {
          background: #EF5350;
          color: white;
        }

        .btn-confirm.danger:hover {
          background: #D32F2F;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 968px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .header {
            padding: 20px;
          }

          .header h1 {
            font-size: 24px;
          }

          .order-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <h1>
          <ShoppingBag size={32} /> My Orders 🍔
        </h1>
        <p>Manage your campus food orders with ease</p>
      </div>

      <div className="content-grid">
        {/* Place Order Section */}
        <div className="place-order-card">
          <h2>
            <Calendar size={24} /> Place New Order
          </h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Scheduled Time *</label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className="form-group">
              <label>Special Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions..."
              />
            </div>
            <div className="toggle-container">
              <div
                className={`toggle ${buyNow ? "active" : ""}`}
                onClick={() => setBuyNow(!buyNow)}
              >
                <div className="toggle-slider" />
              </div>
              <span>Buy Now (Skip Cart)</span>
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={placingOrder}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
              <ShoppingBag size={18} />
            </button>
          </form>
        </div>

        {/* Orders List Section */}
        <div className="orders-section">
          <h2>
            <span>Your Orders</span>
            <button className="refresh-btn" onClick={fetchOrders}>
              <RefreshCw size={16} /> Refresh
            </button>
          </h2>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner" />
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🍱</div>
              <h3>No Orders Yet</h3>
              <p>Start ordering your favorite campus food!</p>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="order-card"
                  onClick={() => handleViewDetails(order._id)}
                >
                  <div className="order-header">
                    <div className="vendor-info">
                      <h3>{order.vendor.name}</h3>
                      <div className="order-id">
                        Order #{order._id.slice(-6)}
                      </div>
                    </div>
                    <div
                      className="status-badge"
                      style={{ background: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="detail-item">
                      <Clock size={16} />
                      <div>
                        <div style={{ fontSize: "12px", color: "#999" }}>
                          Scheduled
                        </div>
                        <div className="detail-value">
                          {formatDate(order.scheduledTime)}
                        </div>
                      </div>
                    </div>
                    <div className="detail-item">
                      <Package size={16} />
                      <div>
                        <div style={{ fontSize: "12px", color: "#999" }}>
                          Total
                        </div>
                        <div className="detail-value">₹{order.totalPrice}</div>
                      </div>
                    </div>
                  </div>

                  {order.notes && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        marginBottom: "16px",
                        fontStyle: "italic",
                      }}
                    >
                      Note: {order.notes}
                    </div>
                  )}

                  <div
                    className="order-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {order.status === "Pending" && (
                      <>
                        <button
                          className="btn-action btn-reschedule"
                          onClick={() => handleReschedule(order)}
                        >
                          <Clock size={16} />
                          Reschedule
                        </button>
                        <button
                          className="btn-action btn-cancel"
                          onClick={() => setShowCancelConfirm(order._id)}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "Preparing" && (
                      <div
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          color: "#42A5F5",
                          fontWeight: "500",
                        }}
                      >
                        Your order is being prepared 👨‍🍳
                      </div>
                    )}
                    {order.status === "Completed" && (
                      <div
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          color: "#28A745",
                          fontWeight: "500",
                        }}
                      >
                        Order completed! ✓
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className={`progress-step ${
                    selectedOrder.status !== "Cancelled" ? "completed" : ""
                  }`}
                >
                  <div className="progress-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="progress-label">Placed</div>
                </div>
                <div
                  className={`progress-step ${
                    selectedOrder.status === "Preparing" ||
                    selectedOrder.status === "Completed"
                      ? "active"
                      : ""
                  } ${selectedOrder.status === "Completed" ? "completed" : ""}`}
                >
                  <div className="progress-icon">
                    <ChefHat size={20} />
                  </div>
                  <div className="progress-label">Preparing</div>
                </div>
                <div
                  className={`progress-step ${
                    selectedOrder.status === "Completed" ? "completed" : ""
                  }`}
                >
                  <div className="progress-icon">
                    <Truck size={20} />
                  </div>
                  <div className="progress-label">Ready</div>
                </div>
              </div>

              {/* Vendor Info */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
                  {selectedOrder.vendor.name}
                </h3>
                <div style={{ color: "#999", fontSize: "14px" }}>
                  {selectedOrder.vendor.location &&
                    `📍 ${selectedOrder.vendor.location}`}
                </div>
                <div
                  style={{ color: "#999", fontSize: "14px", marginTop: "4px" }}
                >
                  Order ID: #{selectedOrder._id.slice(-8)}
                </div>
              </div>

              {/* Order Items */}
              <div className="order-items">
                <h3>Order Items</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="item">
                    <div>
                      <div className="item-name">
                        {item.menuItem.name} × {item.quantity}
                      </div>
                      {item.menuItem.description && (
                        <div className="item-desc">
                          {item.menuItem.description}
                        </div>
                      )}
                    </div>
                    <div className="item-price">
                      ₹{item.menuItem.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Details */}
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #E9ECEF",
                  }}
                >
                  <span style={{ color: "#666" }}>Scheduled Time</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatDate(selectedOrder.scheduledTime)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #E9ECEF",
                  }}
                >
                  <span style={{ color: "#666" }}>Order Status</span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: getStatusColor(selectedOrder.status),
                    }}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                {selectedOrder.notes && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid #E9ECEF",
                    }}
                  >
                    <span style={{ color: "#666" }}>Special Notes</span>
                    <span style={{ fontWeight: "500", fontStyle: "italic" }}>
                      {selectedOrder.notes}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="total-section">
                <span>Total Amount</span>
                <span style={{ color: "#FF6B35" }}>
                  ₹{selectedOrder.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && orderToReschedule && (
        <div
          className="modal-overlay"
          onClick={() => setShowRescheduleModal(false)}
        >
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Reschedule Order</h3>
            <p>
              Choose a new time for your order from{" "}
              {orderToReschedule.vendor.name}
            </p>
            <div
              className="form-group"
              style={{ marginBottom: "24px", textAlign: "left" }}
            >
              <label>New Scheduled Time</label>
              <input
                type="datetime-local"
                value={newScheduledTime}
                onChange={(e) => setNewScheduledTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                style={{ width: "100%" }}
              />
            </div>
            <div className="confirm-actions">
              <button
                className="btn-confirm cancel"
                onClick={() => setShowRescheduleModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm"
                style={{ background: "#FF6B35", color: "white" }}
                onClick={confirmReschedule}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowCancelConfirm(null)}
        >
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <h3>Cancel Order?</h3>
            <p>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="confirm-actions">
              <button
                className="btn-confirm cancel"
                onClick={() => setShowCancelConfirm(null)}
              >
                Keep Order
              </button>
              <button
                className="btn-confirm danger"
                onClick={() => handleCancelOrder(showCancelConfirm)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? (
            <CheckCircle size={24} color="#28A745" />
          ) : (
            <AlertCircle size={24} color="#EF5350" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
