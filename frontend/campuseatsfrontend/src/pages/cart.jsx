import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

// Simulated API functions (replace with your actual imports)
const cartApi = {
  getCart: async (token) => {
    // Simulate API call with demo data
    return {
      cart: {
        items: [
          {
            _id: "1",
            menuItem: {
              _id: "m1",
              name: "Butter Chicken with Naan",
              description:
                "Creamy tomato-based curry with tender chicken pieces, served with fresh butter naan",
              price: 180,
              image:
                "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
            },
            quantity: 2,
          },
          {
            _id: "2",
            menuItem: {
              _id: "m2",
              name: "Paneer Tikka Masala",
              description: "Grilled cottage cheese in rich spiced gravy",
              price: 150,
              image:
                "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
            },
            quantity: 1,
          },
          {
            _id: "3",
            menuItem: {
              _id: "m3",
              name: "Veggie Supreme Pizza",
              description:
                "Loaded with fresh vegetables, olives, and extra cheese",
              price: 220,
              image:
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
            },
            quantity: 1,
          },
        ],
        totalPrice: 730,
      },
    };
  },
  updateCartItem: async (menuItemId, quantity, token) => {
    return { message: "Cart updated", cart: {} };
  },
  removeFromCart: async (menuItemId, token) => {
    return { message: "Item removed", cart: {} };
  },
};

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [itemToRemove, setItemToRemove] = useState(null);

  // Simulated token (replace with actual auth token)
  const token = "demo-token";

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await cartApi.getCart(token);
      setCart(data.cart);
    } catch (error) {
      showToast("Failed to load cart", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const updateQuantity = async (menuItemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity < 1) {
      setItemToRemove(menuItemId);
      return;
    }

    try {
      setUpdating(true);
      await cartApi.updateCartItem(menuItemId, newQuantity, token);

      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.menuItem._id === menuItemId
            ? { ...item, quantity: newQuantity }
            : item
        ),
        totalPrice: prev.items.reduce(
          (sum, item) =>
            item.menuItem._id === menuItemId
              ? sum + item.menuItem.price * newQuantity
              : sum + item.menuItem.price * item.quantity,
          0
        ),
      }));

      showToast("Cart updated!", "success");
    } catch (error) {
      showToast("Failed to update cart", "error");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (menuItemId) => {
    try {
      setUpdating(true);
      await cartApi.removeFromCart(menuItemId, token);

      setCart((prev) => {
        const updatedItems = prev.items.filter(
          (item) => item.menuItem._id !== menuItemId
        );
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.menuItem.price * item.quantity,
          0
        );

        return {
          ...prev,
          items: updatedItems,
          totalPrice: newTotal,
        };
      });

      setItemToRemove(null);
      showToast("Item removed from cart", "success");
    } catch (error) {
      showToast("Failed to remove item", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = () => {
    setShowCheckoutSuccess(true);
    setTimeout(() => {
      setShowCheckoutSuccess(false);
      // Navigate to checkout page or place order
    }, 2500);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <ShoppingBag size={80} color="#FF6B35" strokeWidth={1.5} />
        <h2 style={styles.emptyTitle}>Your cart is empty 🍽️</h2>
        <p style={styles.emptyText}>Add some delicious items to get started!</p>
        <button
          style={styles.browseButton}
          onClick={() => alert("Navigate to menu")}
        >
          Browse Menu <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>

      <div style={styles.pageContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <ShoppingCart size={32} color="#FF6B35" />
            <div>
              <h1 style={styles.headerTitle}>Your Cart</h1>
              <p style={styles.headerSubtitle}>
                {itemCount} item{itemCount !== 1 ? "s" : ""} ready to order
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Cart Items */}
          <div style={styles.itemsSection}>
            {cart.items.map((item, index) => (
              <div
                key={item._id}
                style={{
                  ...styles.cartItem,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  style={styles.itemImage}
                />

                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.menuItem.name}</h3>
                  <p style={styles.itemDescription}>
                    {item.menuItem.description}
                  </p>
                  <p style={styles.itemPrice}>₹{item.menuItem.price}</p>
                </div>

                <div style={styles.itemActions}>
                  <div style={styles.quantityControl}>
                    <button
                      style={styles.quantityButton}
                      onClick={() =>
                        updateQuantity(item.menuItem._id, item.quantity, -1)
                      }
                      disabled={updating}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      style={styles.quantityButton}
                      onClick={() =>
                        updateQuantity(item.menuItem._id, item.quantity, 1)
                      }
                      disabled={updating}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    style={styles.removeButton}
                    onClick={() => setItemToRemove(item.menuItem._id)}
                    disabled={updating}
                  >
                    <Trash2 size={20} />
                  </button>

                  <p style={styles.itemTotal}>
                    ₹{item.menuItem.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div style={styles.summarySection}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Items ({itemCount})</span>
                <span style={styles.summaryValue}>₹{cart.totalPrice}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Delivery Fee</span>
                <span style={styles.summaryValueFree}>FREE</span>
              </div>

              <div style={styles.summaryDivider}></div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryTotalLabel}>Total Amount</span>
                <span style={styles.summaryTotalValue}>₹{cart.totalPrice}</span>
              </div>

              <button
                style={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={updating}
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>

              <p style={styles.secureText}>🔒 Secure checkout guaranteed</p>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div
            style={{
              ...styles.toast,
              backgroundColor: toast.type === "error" ? "#DC3545" : "#28A745",
            }}
          >
            {toast.message}
          </div>
        )}

        {/* Remove Confirmation Modal */}
        {itemToRemove && (
          <div
            style={styles.modalOverlay}
            onClick={() => setItemToRemove(null)}
          >
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Remove Item?</h3>
              <p style={styles.modalText}>
                Are you sure you want to remove this item from your cart?
              </p>
              <div style={styles.modalActions}>
                <button
                  style={styles.modalCancelButton}
                  onClick={() => setItemToRemove(null)}
                >
                  Cancel
                </button>
                <button
                  style={styles.modalConfirmButton}
                  onClick={() => removeItem(itemToRemove)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Success Popup */}
        {showCheckoutSuccess && (
          <div style={styles.successOverlay}>
            <div style={styles.successModal}>
              <CheckCircle size={64} color="#28A745" />
              <h2 style={styles.successTitle}>Order Placed Successfully! 🎉</h2>
              <p style={styles.successText}>
                Your delicious food is on its way!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#F8F9FA",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#F8F9FA",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #FF6B35",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#666",
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#F8F9FA",
    padding: "20px",
  },
  emptyTitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginTop: "24px",
    marginBottom: "12px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "32px",
  },
  browseButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#FF6B35",
    color: "white",
    border: "none",
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
  },
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #E5E7EB",
    padding: "24px 20px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    margin: 0,
  },
  headerSubtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "4px 0 0 0",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "32px auto",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "32px",
  },
  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cartItem: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    gap: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease",
  },
  itemImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
    flexShrink: 0,
  },
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
  },
  itemDescription: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
    lineHeight: "1.5",
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#FF6B35",
    margin: "4px 0 0 0",
  },
  itemActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "12px",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#F8F9FA",
    borderRadius: "8px",
    padding: "4px",
  },
  quantityButton: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "white",
    color: "#FF6B35",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  quantity: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    minWidth: "32px",
    textAlign: "center",
  },
  removeButton: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#FEE2E2",
    color: "#DC3545",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  itemTotal: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#333",
    margin: 0,
  },
  summarySection: {
    position: "sticky",
    top: "120px",
    height: "fit-content",
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    animation: "slideIn 0.5s ease",
  },
  summaryTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  summaryLabel: {
    fontSize: "15px",
    color: "#666",
  },
  summaryValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  summaryValueFree: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#28A745",
  },
  summaryDivider: {
    height: "1px",
    backgroundColor: "#E5E7EB",
    margin: "20px 0",
  },
  summaryTotalLabel: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  summaryTotalValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#FF6B35",
  },
  checkoutButton: {
    width: "100%",
    backgroundColor: "#FF6B35",
    color: "white",
    border: "none",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
  },
  secureText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#666",
    marginTop: "16px",
  },
  toast: {
    position: "fixed",
    bottom: "32px",
    right: "32px",
    color: "white",
    padding: "16px 24px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    zIndex: 1000,
    animation: "slideIn 0.3s ease",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "400px",
    width: "90%",
    animation: "scaleIn 0.3s ease",
  },
  modalTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "12px",
  },
  modalText: {
    fontSize: "15px",
    color: "#666",
    marginBottom: "24px",
    lineHeight: "1.6",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
  },
  modalCancelButton: {
    flex: 1,
    padding: "12px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "10px",
    border: "2px solid #E5E7EB",
    backgroundColor: "white",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  modalConfirmButton: {
    flex: 1,
    padding: "12px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#DC3545",
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  successOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
    animation: "fadeIn 0.3s ease",
  },
  successModal: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "48px",
    textAlign: "center",
    animation: "scaleIn 0.4s ease",
    maxWidth: "400px",
  },
  successTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    marginTop: "20px",
    marginBottom: "12px",
  },
  successText: {
    fontSize: "16px",
    color: "#666",
  },
};

// Add media queries for responsive design
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @media (max-width: 1024px) {
      div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr !important;
      }
    }
    
    @media (max-width: 768px) {
      div[style*="display: flex"][style*="gap: 20px"] {
        flex-direction: column !important;
      }
      
      img[style*="width: 120px"] {
        width: 80px !important;
        height: 80px !important;
      }
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4) !important;
    }
    
    button:active:not(:disabled) {
      transform: translateY(0);
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
}

export default CartPage;
