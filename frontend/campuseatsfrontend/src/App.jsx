import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/Home";
import SignupVendor from "./pages/auth/vendorsignup";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import CampusEatsMenu from "./pages/menu";
import OrderPage from "./pages/order";
import CartPage from "./pages/cart";
import TimeSlotSelection from "./pages/timeslot";
import PaymentPage from "./pages/payment";
import OfferManagement from "./pages/offermanagement";
import OfferShowcase from "./pages/offershowcase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token?" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registervendor" element={<SignupVendor />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/campuseatsmenu" element={<CampusEatsMenu />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/timeslotselection" element={<TimeSlotSelection />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/offermanagement" element={<OfferManagement />} />
        <Route path="/offershowcase" element={<OfferShowcase />} />
      </Routes>

      {/* ✅ Global ToastContainer for all pages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
