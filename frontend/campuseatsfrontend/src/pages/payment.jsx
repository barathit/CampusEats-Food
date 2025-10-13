import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Check,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Loader2,
  Package,
  User,
  MapPin,
} from "lucide-react";

// Simulated API functions (replace with actual imports)
const paymentApi = {
  initiatePayment: async (orderId, paymentMethod, token) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      return {
        message: "Payment successful",
        order: {
          _id: orderId,
          payment: {
            method: paymentMethod,
            transactionId: `TXN_${Date.now()}`,
            status: "success",
          },
          status: "confirmed",
          totalAmount: 730,
          deliveryAddress: "Room 204, Hostel Block A, Campus",
          items: [
            {
              menuItem: { name: "Butter Chicken with Naan", price: 180 },
              quantity: 2,
            },
            {
              menuItem: { name: "Paneer Tikka Masala", price: 150 },
              quantity: 1,
            },
            {
              menuItem: { name: "Veggie Supreme Pizza", price: 220 },
              quantity: 1,
            },
          ],
        },
      };
    } else {
      throw new Error("Payment failed. Please try again.");
    }
  },
};

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failed' | null
  const [orderData, setOrderData] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Mock data (replace with actual props or API call)
  const orderId = "order123";
  const token = "sampletoken";
  const mockOrder = {
    _id: orderId,
    totalAmount: 730,
    deliveryAddress: "Room 204, Hostel Block A, Campus",
    vendor: { name: "Campus Canteen" },
    items: [
      {
        menuItem: { name: "Butter Chicken with Naan", price: 180 },
        quantity: 2,
      },
      { menuItem: { name: "Paneer Tikka Masala", price: 150 }, quantity: 1 },
      { menuItem: { name: "Veggie Supreme Pizza", price: 220 }, quantity: 1 },
    ],
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard size={32} />,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone size={32} />,
      description: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building2 size={32} />,
      description: "All major banks supported",
    },
  ];

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setCurrentStep(3);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      showToast("Please select a payment method", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await paymentApi.initiatePayment(
        orderId,
        selectedMethod,
        token
      );

      setOrderData(response.order);
      setPaymentStatus("success");
      showToast("Payment completed successfully!", "success");
    } catch (error) {
      setPaymentStatus("failed");
      showToast(error.message || "Payment failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setSelectedMethod("");
    setCurrentStep(2);
  };

  const handleBackToCart = () => {
    window.location.href = "/cart"; // Or use router navigation
  };

  const handleViewOrders = () => {
    window.location.href = "/orders"; // Or use router navigation
  };

  // Success Screen
  if (paymentStatus === "success") {
    return (
      <>
        <style>{styles.cssAnimations}</style>
        <div style={styles.pageContainer}>
          <div style={styles.successContainer}>
            <div style={styles.successCard}>
              <div style={styles.successIconWrapper}>
                <CheckCircle
                  size={80}
                  color="#28a745"
                  style={{ animation: "scaleIn 0.5s ease" }}
                />
              </div>

              <h1 style={styles.successTitle}>Payment Successful! 🎉</h1>
              <p style={styles.successSubtitle}>
                Your order has been confirmed
              </p>

              <div style={styles.transactionBox}>
                <p style={styles.transactionLabel}>Transaction ID</p>
                <p style={styles.transactionId}>
                  {orderData?.payment?.transactionId}
                </p>
              </div>

              <div style={styles.orderSummarySuccess}>
                <div style={styles.summaryRow}>
                  <span>Order ID</span>
                  <span style={styles.summaryValueBold}>
                    #{orderData?._id?.slice(-8)}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Payment Method</span>
                  <span style={styles.summaryValueBold}>
                    {orderData?.payment?.method?.toUpperCase()}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Total Amount</span>
                  <span style={styles.summaryValueBold}>
                    ₹{orderData?.totalAmount}
                  </span>
                </div>
              </div>

              <div style={styles.successActions}>
                <button style={styles.primaryButton} onClick={handleViewOrders}>
                  View My Orders
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Failure Screen
  if (paymentStatus === "failed") {
    return (
      <>
        <style>{styles.cssAnimations}</style>
        <div style={styles.pageContainer}>
          <div style={styles.failureContainer}>
            <div style={styles.failureCard}>
              <div style={styles.failureIconWrapper}>
                <XCircle
                  size={80}
                  color="#dc3545"
                  style={{ animation: "shake 0.5s ease" }}
                />
              </div>

              <h1 style={styles.failureTitle}>Payment Failed</h1>
              <p style={styles.failureSubtitle}>
                We couldn't process your payment. Please try again.
              </p>

              <div style={styles.failureReasons}>
                <p style={styles.reasonTitle}>Common reasons:</p>
                <ul style={styles.reasonList}>
                  <li>Insufficient balance</li>
                  <li>Network connectivity issues</li>
                  <li>Payment gateway timeout</li>
                </ul>
              </div>

              <div style={styles.failureActions}>
                <button style={styles.retryButton} onClick={handleRetry}>
                  Try Again
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={handleBackToCart}
                >
                  <ArrowLeft size={20} /> Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main Payment Flow
  return (
    <>
      <style>{styles.cssAnimations}</style>
      <div style={styles.pageContainer}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backButton} onClick={handleBackToCart}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={styles.headerTitle}>Complete Payment</h1>
        </div>

        {/* Progress Steps */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(currentStep / 3) * 100}%`,
              }}
            ></div>
          </div>
          <div style={styles.stepsWrapper}>
            {[1, 2, 3].map((step) => (
              <div key={step} style={styles.stepItem}>
                <div
                  style={{
                    ...styles.stepCircle,
                    backgroundColor:
                      currentStep >= step ? "#ff6b35" : "#e0e0e0",
                    color: currentStep >= step ? "white" : "#999",
                  }}
                >
                  {currentStep > step ? <Check size={16} /> : step}
                </div>
                <span style={styles.stepLabel}>
                  {step === 1 ? "Order" : step === 2 ? "Payment" : "Confirm"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.mainContent}>
          {/* Order Summary - Always Visible */}
          <div style={styles.orderSummarySection}>
            <div style={styles.summaryCard}>
              <h2 style={styles.sectionTitle}>
                <Package size={24} /> Order Summary
              </h2>

              <div style={styles.vendorInfo}>
                <User size={20} color="#666" />
                <span style={styles.vendorName}>{mockOrder.vendor.name}</span>
              </div>

              <div style={styles.itemsList}>
                {mockOrder.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <div style={styles.itemInfo}>
                      <span style={styles.itemName}>{item.menuItem.name}</span>
                      <span style={styles.itemQty}>x{item.quantity}</span>
                    </div>
                    <span style={styles.itemPrice}>
                      ₹{item.menuItem.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.divider}></div>

              <div style={styles.addressSection}>
                <MapPin size={18} color="#666" />
                <div>
                  <p style={styles.addressLabel}>Delivery Address</p>
                  <p style={styles.addressText}>{mockOrder.deliveryAddress}</p>
                </div>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.totalSection}>
                <span style={styles.totalLabel}>Total Amount</span>
                <span style={styles.totalAmount}>₹{mockOrder.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div style={styles.paymentSection}>
            {currentStep >= 2 && (
              <div style={styles.paymentCard}>
                <h2 style={styles.sectionTitle}>Select Payment Method</h2>

                <div style={styles.methodsGrid}>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      style={{
                        ...styles.methodCard,
                        borderColor:
                          selectedMethod === method.id ? "#ff6b35" : "#e0e0e0",
                        backgroundColor:
                          selectedMethod === method.id ? "#fff5f0" : "white",
                      }}
                      onClick={() => handleMethodSelect(method.id)}
                    >
                      {selectedMethod === method.id && (
                        <div style={styles.selectedBadge}>
                          <Check size={16} />
                        </div>
                      )}
                      <div style={styles.methodIcon}>{method.icon}</div>
                      <h3 style={styles.methodName}>{method.name}</h3>
                      <p style={styles.methodDescription}>
                        {method.description}
                      </p>
                    </div>
                  ))}
                </div>

                {currentStep === 3 && selectedMethod && (
                  <div style={styles.confirmSection}>
                    <div style={styles.selectedMethodInfo}>
                      <div style={styles.selectedMethodIcon}>
                        {
                          paymentMethods.find((m) => m.id === selectedMethod)
                            ?.icon
                        }
                      </div>
                      <div>
                        <p style={styles.selectedMethodLabel}>
                          Selected Method
                        </p>
                        <p style={styles.selectedMethodName}>
                          {
                            paymentMethods.find((m) => m.id === selectedMethod)
                              ?.name
                          }
                        </p>
                      </div>
                    </div>

                    <button
                      style={styles.payButton}
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={20}
                            style={{ animation: "spin 1s linear infinite" }}
                          />
                          Processing Payment...
                        </>
                      ) : (
                        <>Pay ₹{mockOrder.totalAmount}</>
                      )}
                    </button>

                    <p style={styles.secureText}>
                      🔒 Your payment is secure and encrypted
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div
            style={{
              ...styles.toast,
              backgroundColor: toast.type === "error" ? "#dc3545" : "#28a745",
            }}
          >
            {toast.message}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingCard}>
              <Loader2
                size={60}
                color="#ff6b35"
                style={{ animation: "spin 1s linear infinite" }}
              />
              <h3 style={styles.loadingTitle}>Processing Your Payment</h3>
              <p style={styles.loadingText}>
                Please wait while we confirm your transaction...
              </p>
              <div style={styles.loadingDots}>
                <span style={{ animationDelay: "0s" }}>.</span>
                <span style={{ animationDelay: "0.2s" }}>.</span>
                <span style={{ animationDelay: "0.4s" }}>.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  cssAnimations: `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.5); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  `,
  pageContainer: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f9fafc",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  header: {
    backgroundColor: "white",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  backButton: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f5f5f5",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
  },
  progressContainer: {
    backgroundColor: "white",
    padding: "24px 20px",
    marginBottom: "24px",
  },
  progressBar: {
    width: "100%",
    height: "4px",
    backgroundColor: "#e0e0e0",
    borderRadius: "2px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff6b35",
    transition: "width 0.5s ease",
    borderRadius: "2px",
  },
  stepsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "400px",
    margin: "0 auto",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  stepCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  stepLabel: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gap: "24px",
    animation: "fadeIn 0.5s ease",
  },
  orderSummarySection: {
    position: "sticky",
    top: "120px",
    height: "fit-content",
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  vendorInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  vendorName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    padding: "12px 0",
  },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  itemName: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },
  itemQty: {
    fontSize: "12px",
    color: "#666",
  },
  itemPrice: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ff6b35",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e0e0e0",
    margin: "16px 0",
  },
  addressSection: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  addressLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "4px",
  },
  addressText: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ff6b35",
  },
  paymentSection: {
    animation: "slideIn 0.5s ease",
  },
  paymentCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  methodsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  methodCard: {
    position: "relative",
    padding: "24px",
    border: "2px solid",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
  },
  selectedBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#ff6b35",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  methodIcon: {
    color: "#ff6b35",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "center",
  },
  methodName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  methodDescription: {
    fontSize: "12px",
    color: "#666",
  },
  confirmSection: {
    marginTop: "24px",
    padding: "24px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
  },
  selectedMethodInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  selectedMethodIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    backgroundColor: "#fff5f0",
    color: "#ff6b35",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedMethodLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "4px",
  },
  selectedMethodName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  payButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  secureText: {
    textAlign: "center",
    fontSize: "12px",
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
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    zIndex: 1000,
    animation: "slideIn 0.3s ease",
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  },
  loadingCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "48px",
    textAlign: "center",
    maxWidth: "400px",
    animation: "scaleIn 0.4s ease",
  },
  loadingTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    marginTop: "20px",
    marginBottom: "12px",
  },
  loadingText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  loadingDots: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#ff6b35",
    letterSpacing: "4px",
  },
  successContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  successCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "48px",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    animation: "scaleIn 0.5s ease",
  },
  successIconWrapper: {
    marginBottom: "24px",
  },
  successTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "8px",
  },
  successSubtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px",
  },
  transactionBox: {
    backgroundColor: "#f8f9fa",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "24px",
  },
  transactionLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "4px",
  },
  transactionId: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    fontFamily: "monospace",
  },
  orderSummarySuccess: {
    textAlign: "left",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginBottom: "24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "14px",
    color: "#666",
  },
  summaryValueBold: {
    fontWeight: "600",
    color: "#333",
  },
  successActions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  primaryButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
  },
  secondaryButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "transparent",
    color: "#666",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  failureContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  failureCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "48px",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    animation: "scaleIn 0.5s ease",
  },
  failureIconWrapper: {
    marginBottom: "24px",
  },
  failureTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "8px",
  },
  failureSubtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px",
  },
  failureReasons: {
    textAlign: "left",
    padding: "20px",
    backgroundColor: "#fff5f5",
    borderRadius: "12px",
    marginBottom: "24px",
  },
  reasonTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "12px",
  },
  reasonList: {
    fontSize: "13px",
    color: "#666",
    paddingLeft: "20px",
    margin: 0,
  },
  failureActions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  retryButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
  },
};

// Add responsive styles and hover effects
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @media (max-width: 1024px) {
      div[style*="gridTemplateColumns: '400px 1fr'"] {
        grid-template-columns: 1fr !important;
      }
    }
    
    @media (max-width: 768px) {
      div[style*="gridTemplateColumns: 'repeat"] {
        grid-template-columns: 1fr !important;
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
    
    div[style*="methodCard"]:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    
    div[style*="loadingDots"] span {
      display: inline-block;
      animation: pulse 1.4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default PaymentPage;
