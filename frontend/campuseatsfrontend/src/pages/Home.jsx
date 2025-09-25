import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HomePage from "../components/HomePage"; // Add this import

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <HomePage /> {/* Add this component here */}
      <Footer />
    </div>
  );
}
