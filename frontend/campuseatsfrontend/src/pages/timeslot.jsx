import React, { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowLeft,
  X,
} from "lucide-react";

const TimeSlotSelection = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [currentBookedSlot, setCurrentBookedSlot] = useState(null);

  const token = "sampletoken";
  const vendorId = "123";
  const orderId = "order456";

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockSlots = [
        {
          _id: "1",
          startTime: "2025-10-13T10:00:00",
          endTime: "2025-10-13T10:30:00",
          maxOrders: 5,
          bookedOrders: 2,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "2",
          startTime: "2025-10-13T11:00:00",
          endTime: "2025-10-13T11:30:00",
          maxOrders: 5,
          bookedOrders: 5,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "3",
          startTime: "2025-10-13T12:00:00",
          endTime: "2025-10-13T12:30:00",
          maxOrders: 8,
          bookedOrders: 3,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "4",
          startTime: "2025-10-13T13:00:00",
          endTime: "2025-10-13T13:30:00",
          maxOrders: 6,
          bookedOrders: 1,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "5",
          startTime: "2025-10-13T14:00:00",
          endTime: "2025-10-13T14:30:00",
          maxOrders: 5,
          bookedOrders: 4,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "6",
          startTime: "2025-10-13T15:00:00",
          endTime: "2025-10-13T15:30:00",
          maxOrders: 7,
          bookedOrders: 0,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "7",
          startTime: "2025-10-14T10:00:00",
          endTime: "2025-10-14T10:30:00",
          maxOrders: 6,
          bookedOrders: 1,
          isActive: true,
          vendor: vendorId,
        },
        {
          _id: "8",
          startTime: "2025-10-14T11:30:00",
          endTime: "2025-10-14T12:00:00",
          maxOrders: 8,
          bookedOrders: 2,
          isActive: true,
          vendor: vendorId,
        },
      ];
      setSlots(mockSlots);
    } catch (error) {
      showToast("Failed to fetch time slots", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot) => {
    if (slot.bookedOrders >= slot.maxOrders) {
      showToast("This slot is fully booked", "error");
      return;
    }
    setSelectedSlot(slot);
  };

  const handleBookSlot = () => {
    if (!selectedSlot) {
      showToast("Please select a time slot", "error");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmBooking = async () => {
    setBooking(true);
    setShowConfirmModal(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (isRescheduling) {
        showToast("Time slot rescheduled successfully! ⏰", "success");
        setIsRescheduling(false);
        setCurrentBookedSlot(selectedSlot);
      } else {
        showToast("Time slot booked successfully! 🎉", "success");
        setCurrentBookedSlot(selectedSlot);
      }
      setSelectedSlot(null);
      fetchSlots();
    } catch (error) {
      showToast("Failed to book slot", "error");
    } finally {
      setBooking(false);
    }
  };

  const handleReschedule = () => {
    setIsRescheduling(true);
    setSelectedSlot(null);
    showToast("Select a new time slot to reschedule", "info");
  };

  const cancelReschedule = () => {
    setIsRescheduling(false);
    setSelectedSlot(null);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const getAvailabilityStatus = (slot) => {
    const remaining = slot.maxOrders - slot.bookedOrders;
    if (remaining === 0)
      return { text: "Full", color: "#EF5350", badge: "full" };
    if (remaining <= 2)
      return { text: "Almost Full", color: "#FFA726", badge: "limited" };
    return { text: "Available", color: "#28A745", badge: "available" };
  };

  const getSlotDate = (slot) => {
    return formatDate(slot.startTime);
  };

  const groupSlotsByDate = () => {
    const grouped = {};
    slots.forEach((slot) => {
      const date = getSlotDate(slot);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(slot);
    });
    return grouped;
  };

  const groupedSlots = groupSlotsByDate();

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

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)",
          color: "white",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(255, 107, 53, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 700 }}>
                🍱 CampusEats
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: 300 }}>
                Pick your perfect time slot 🍱
              </div>
            </div>
          </div>
          <button
            onClick={() => window.history.back()}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
          >
            <ArrowLeft size={18} />
            Back to Menu
          </button>
        </div>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}
      >
        {/* Current Booking Banner */}
        {currentBookedSlot && !isRescheduling && (
          <div
            style={{
              background: "linear-gradient(135deg, #28a745 0%, #34ce57 100%)",
              color: "white",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(40, 167, 69, 0.3)",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle size={20} />
                Your Current Booking
              </h3>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                {formatTime(currentBookedSlot.startTime)} -{" "}
                {formatTime(currentBookedSlot.endTime)}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                {formatDate(currentBookedSlot.startTime)}
              </div>
            </div>
            <button
              onClick={handleReschedule}
              style={{
                background: "white",
                color: "#28a745",
                border: "none",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Clock size={18} />
              Reschedule
            </button>
          </div>
        )}

        {/* Reschedule Mode Banner */}
        {isRescheduling && (
          <div
            style={{
              background: "linear-gradient(135deg, #ffa726 0%, #ffb84d 100%)",
              color: "white",
              padding: "16px 20px",
              borderRadius: "12px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <strong>Rescheduling Mode</strong>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Select a new time slot below
              </div>
            </div>
            <button
              onClick={cancelReschedule}
              style={{
                background: "white",
                color: "#ffa726",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Cancel
            </button>
          </div>
        )}

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
        ) : slots.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>📅</div>
            <h3
              style={{ fontSize: "24px", color: "#333", marginBottom: "12px" }}
            >
              No Time Slots Available
            </h3>
            <p style={{ color: "#999", fontSize: "16px" }}>
              Please check back later for available booking slots
            </p>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontSize: "28px",
                marginBottom: "24px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Calendar size={28} />
              Available Time Slots
            </h2>

            {Object.entries(groupedSlots).map(([date, dateSlots]) => (
              <div key={date} style={{ marginBottom: "40px" }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ff6b35",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    paddingBottom: "12px",
                    borderBottom: "2px solid #ff6b35",
                  }}
                >
                  <Calendar size={20} />
                  {date}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {dateSlots.map((slot) => {
                    const status = getAvailabilityStatus(slot);
                    const isFull = slot.bookedOrders >= slot.maxOrders;
                    const isSelected = selectedSlot?._id === slot._id;
                    const fillPercentage =
                      (slot.bookedOrders / slot.maxOrders) * 100;

                    return (
                      <div
                        key={slot._id}
                        onClick={() => !isFull && handleSlotSelect(slot)}
                        style={{
                          background: isSelected
                            ? "linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)"
                            : isFull
                            ? "#f8f9fa"
                            : "white",
                          borderRadius: "16px",
                          padding: "24px",
                          cursor: isFull ? "not-allowed" : "pointer",
                          transition: "all 0.3s ease",
                          border: isSelected
                            ? "3px solid #ff6b35"
                            : "3px solid transparent",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow: isSelected
                            ? "0 8px 24px rgba(255, 107, 53, 0.3)"
                            : "0 4px 12px rgba(0, 0, 0, 0.08)",
                          opacity: isFull ? 0.6 : 1,
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              top: "12px",
                              right: "12px",
                              background: "#28a745",
                              color: "white",
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircle size={20} />
                          </div>
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              color: "#ff6b35",
                            }}
                          >
                            <Clock size={24} />
                            <div>
                              <div
                                style={{ fontSize: "20px", fontWeight: 700 }}
                              >
                                {formatTime(slot.startTime)}
                              </div>
                              <div style={{ fontSize: "12px", color: "#999" }}>
                                to {formatTime(slot.endTime)}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              background:
                                status.badge === "available"
                                  ? "#e8f5e9"
                                  : status.badge === "limited"
                                  ? "#fff3e0"
                                  : "#ffebee",
                              color: status.color,
                            }}
                          >
                            {status.text}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginTop: "12px",
                            padding: "12px",
                            background: "#f8f9fa",
                            borderRadius: "10px",
                          }}
                        >
                          <Users size={16} color="#666" />
                          <div
                            style={{
                              flex: 1,
                              height: "8px",
                              background: "#e9ecef",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${fillPercentage}%`,
                                background:
                                  fillPercentage > 80
                                    ? "linear-gradient(90deg, #ffa726, #ffb84d)"
                                    : fillPercentage === 100
                                    ? "linear-gradient(90deg, #ef5350, #f77a78)"
                                    : "linear-gradient(90deg, #28a745, #34ce57)",
                                borderRadius: "4px",
                                transition: "width 0.3s ease",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#666",
                            }}
                          >
                            {slot.bookedOrders}/{slot.maxOrders}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Book Section */}
      {selectedSlot && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "white",
            padding: "20px",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
            zIndex: 90,
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{ fontSize: "16px", color: "#666", marginBottom: "4px" }}
              >
                Selected Time Slot
              </h3>
              <div
                style={{ fontSize: "24px", fontWeight: 700, color: "#ff6b35" }}
              >
                {formatTime(selectedSlot.startTime)} -{" "}
                {formatTime(selectedSlot.endTime)}
              </div>
            </div>
            <button
              onClick={handleBookSlot}
              disabled={booking}
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)",
                color: "white",
                border: "none",
                padding: "16px 48px",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: 700,
                cursor: booking ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 4px 16px rgba(255, 107, 53, 0.3)",
                opacity: booking ? 0.6 : 1,
              }}
            >
              <Clock size={20} />
              {booking
                ? "Booking..."
                : isRescheduling
                ? "Confirm Reschedule"
                : "Book Slot"}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
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
                background: "linear-gradient(135deg, #ff6b35, #ff8c61)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "white",
              }}
            >
              <Clock size={40} />
            </div>
            <h2
              style={{ fontSize: "24px", marginBottom: "12px", color: "#333" }}
            >
              {isRescheduling ? "Confirm Reschedule?" : "Confirm Booking?"}
            </h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              {isRescheduling
                ? "Your current booking will be changed to:"
                : "You are about to book this time slot:"}
            </p>
            <div
              style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "12px",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#ff6b35",
                  marginBottom: "8px",
                }}
              >
                {formatTime(selectedSlot.startTime)} -{" "}
                {formatTime(selectedSlot.endTime)}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                {formatDate(selectedSlot.startTime)}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  background: "#e9ecef",
                  color: "#666",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #ff6b35, #ff8c61)",
                  color: "white",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
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
              toast.type === "success"
                ? "#28a745"
                : toast.type === "error"
                ? "#ef5350"
                : "#42a5f5"
            }`,
          }}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} color="#28a745" />
          ) : toast.type === "error" ? (
            <AlertCircle size={20} color="#ef5350" />
          ) : (
            <AlertCircle size={20} color="#42a5f5" />
          )}
          <span style={{ flex: 1, color: "#333", fontWeight: 500 }}>
            {toast.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelection;
