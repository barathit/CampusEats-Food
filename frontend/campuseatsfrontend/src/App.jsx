import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Login from "./pages/auth/Login";
// import ForgotPassword from "./pages/auth/ForgotPassword"; // optional placeholder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />{" "} */}
        {/* optional */}
      </Routes>
    </Router>
  );
}

export default App;
