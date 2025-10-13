/**
 * CampusEats Home Page Sections - Production Quality Component
 *
 * Optional Installation for enhanced swipe (recommended):
 * npm install react-swipeable
 *
 * Usage in your Home.js:
 * import HomePage from "../components/HomePage";
 *
 * export default function Home() {
 *   return (
 *     <div className="min-h-screen flex flex-col">
 *       <Navbar />
 *       <HeroSection />
 *       <HomePage />
 *       <Footer />
 *     </div>
 *   );
 * }
 */

import React, { useState, useEffect, useRef } from "react";

// Sample Data Arrays - Replace with API data
const restaurantsData = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: ["Indian", "North Indian"],
    rating: 4.5,
    ratingCount: 1240,
    deliveryTime: "25-30",
    area: "Sector 18",
    priceLevel: "₹₹",
    deliveryFee: "₹29",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop&crop=center",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: ["Italian", "Pizza"],
    rating: 4.2,
    ratingCount: 892,
    deliveryTime: "20-25",
    area: "Cyber Hub",
    priceLevel: "₹₹₹",
    deliveryFee: "₹39",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&crop=center",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Burger Junction",
    cuisine: ["American", "Fast Food"],
    rating: 4.0,
    ratingCount: 567,
    deliveryTime: "15-20",
    area: "DLF Phase 1",
    priceLevel: "₹₹",
    deliveryFee: "₹25",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=250&fit=crop&crop=center",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Sushi Palace",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    ratingCount: 234,
    deliveryTime: "30-35",
    area: "Golf Course Road",
    priceLevel: "₹₹₹₹",
    deliveryFee: "₹49",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop&crop=center",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Taco Bell",
    cuisine: ["Mexican", "Fast Food"],
    rating: 4.1,
    ratingCount: 678,
    deliveryTime: "18-23",
    area: "MG Road",
    priceLevel: "₹₹",
    deliveryFee: "₹32",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=250&fit=crop&crop=center",
    isFavorite: false,
  },
  {
    id: 6,
    name: "Chinese Express",
    cuisine: ["Chinese", "Asian"],
    rating: 4.3,
    ratingCount: 445,
    deliveryTime: "22-28",
    area: "Connaught Place",
    priceLevel: "₹₹",
    deliveryFee: "₹35",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=250&fit=crop&crop=center",
    isFavorite: true,
  },
  {
    id: 7,
    name: "Cafe Mocha",
    cuisine: ["Continental", "Cafe"],
    rating: 4.6,
    ratingCount: 321,
    deliveryTime: "35-40",
    area: "Khan Market",
    priceLevel: "₹₹₹",
    deliveryFee: "₹45",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop&crop=center",
    isFavorite: false,
  },
  {
    id: 8,
    name: "Biryani House",
    cuisine: ["Indian", "Biryani"],
    rating: 4.4,
    ratingCount: 987,
    deliveryTime: "28-35",
    area: "Old Delhi",
    priceLevel: "₹₹₹",
    deliveryFee: "₹40",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d383?w=400&h=250&fit=crop&crop=center",
    isFavorite: false,
  },
];

const offersData = [
  {
    id: 1,
    title: "FLAT 50% OFF",
    subtitle: "On your first order",
    couponCode: "FIRST50",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop&crop=center",
    ctaPrimary: "Order Now",
    ctaSecondary: "View Menu",
  },
  {
    id: 2,
    title: "BUY 2 GET 1 FREE",
    subtitle: "On all combo meals",
    couponCode: "COMBO321",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop&crop=center",
    ctaPrimary: "Grab Deal",
    ctaSecondary: "See Details",
  },
  {
    id: 3,
    title: "₹100 CASHBACK",
    subtitle: "On orders above ₹500",
    couponCode: "SAVE100",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop&crop=center",
    ctaPrimary: "Use Code",
    ctaSecondary: "Terms Apply",
  },
  {
    id: 4,
    title: "FREE DELIVERY",
    subtitle: "No minimum order value",
    couponCode: "FREEDEL",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=400&fit=crop&crop=center",
    ctaPrimary: "Order Free",
    ctaSecondary: "Limited Time",
  },
];

const menuData = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil",
    price: 299,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center",
    badge: "Veg",
    isVeg: true,
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken",
    price: 399,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d383?w=300&h=200&fit=crop&crop=center",
    badge: "Non-Veg",
    isVeg: false,
  },
  {
    id: 3,
    name: "Classic Burger",
    description: "Juicy beef patty with cheese and veggies",
    price: 249,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop&crop=center",
    badge: "Non-Veg",
    isVeg: false,
  },
  {
    id: 4,
    name: "Pad Thai Noodles",
    description: "Stir-fried rice noodles with vegetables",
    price: 329,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop&crop=center",
    badge: "Veg",
    isVeg: true,
  },
  {
    id: 5,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with ice cream",
    price: 149,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop&crop=center",
    badge: "Veg",
    isVeg: true,
  },
  {
    id: 6,
    name: "Grilled Salmon",
    description: "Fresh salmon with herbs and lemon",
    price: 599,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop&crop=center",
    badge: "Non-Veg",
    isVeg: false,
  },
  {
    id: 7,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with caesar dressing",
    price: 199,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&crop=center",
    badge: "Veg",
    isVeg: true,
  },
  {
    id: 8,
    name: "Chicken Tacos",
    description: "Spicy chicken with fresh salsa",
    price: 279,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=200&fit=crop&crop=center",
    badge: "Non-Veg",
    isVeg: false,
  },
  {
    id: 9,
    name: "Veggie Wrap",
    description: "Fresh vegetables wrapped in tortilla",
    price: 179,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop&crop=center",
    badge: "Veg",
    isVeg: true,
  },
  {
    id: 10,
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with herbs",
    price: 349,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop&crop=center",
    badge: "Veg",
    isVeg: true,
  },
];

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-5">
    <h2 className="display-5 fw-bold text-dark mb-2">{title}</h2>
    {subtitle && <p className="lead text-muted">{subtitle}</p>}
  </div>
);

// Restaurant Card Component
const RestaurantCard = ({ restaurant, onFavoriteToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const StarRating = ({ rating, count }) => (
    <div className="d-flex align-items-center">
      <div className="stars me-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-text">
        {rating} ({count})
      </span>
    </div>
  );

  return (
    <div
      className="restaurant-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex="0"
      role="button"
      aria-label={`${restaurant.name} restaurant card`}
    >
      <div className="card-image-container">
        {!imageLoaded && <div className="image-placeholder"></div>}
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-image"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        <button
          className={`favorite-btn ${restaurant.isFavorite ? "active" : ""} ${
            isHovered ? "visible" : ""
          }`}
          onClick={() => onFavoriteToggle(restaurant.id)}
          onKeyPress={(e) =>
            handleKeyPress(e, () => onFavoriteToggle(restaurant.id))
          }
          aria-label={`${
            restaurant.isFavorite ? "Remove from" : "Add to"
          } favorites`}
        >
          ♥
        </button>
      </div>
      <div className="card-content">
        <h5 className="restaurant-name">{restaurant.name}</h5>
        <div className="cuisine-tags mb-2">
          {restaurant.cuisine.map((tag, index) => (
            <span key={index} className="cuisine-tag">
              {tag}
            </span>
          ))}
        </div>
        <StarRating rating={restaurant.rating} count={restaurant.ratingCount} />
        <div className="delivery-info mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <span className="delivery-time">
              {restaurant.deliveryTime} mins
            </span>
            <span className="price-level">{restaurant.priceLevel}</span>
          </div>
          <div className="location-info">
            <span className="area">{restaurant.area}</span>
            <span className="delivery-fee">
              • {restaurant.deliveryFee} delivery fee
            </span>
          </div>
        </div>
        <button
          className={`menu-btn ${isHovered ? "visible" : ""}`}
          onKeyPress={(e) => handleKeyPress(e, () => console.log("View menu"))}
        >
          See Menu
        </button>
      </div>
    </div>
  );
};

// Restaurants Section Component
const RestaurantsSection = () => {
  const [favorites, setFavorites] = useState(
    restaurantsData.reduce(
      (acc, restaurant) => ({
        ...acc,
        [restaurant.id]: restaurant.isFavorite,
      }),
      {}
    )
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(restaurantsData.length - 1)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(restaurantsData.length - 1)) %
        Math.ceil(restaurantsData.length - 1)
    );
  };

  // Native touch handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && isMobile) nextSlide();
    if (isRightSwipe && isMobile) prevSlide();
  };

  const updatedRestaurants = restaurantsData.map((restaurant) => ({
    ...restaurant,
    isFavorite: favorites[restaurant.id],
  }));

  return (
    <section className="restaurants-section py-5">
      <div className="container">
        <SectionHeader
          title="Restaurants near you"
          subtitle="Delicious food delivered to your doorstep"
        />

        {isMobile ? (
          <div className="mobile-slider-container">
            <div
              className="mobile-slider"
              ref={containerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {updatedRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="slide-item">
                  <RestaurantCard
                    restaurant={restaurant}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                </div>
              ))}
            </div>
            <button
              className="slider-arrow left"
              onClick={prevSlide}
              aria-label="Previous restaurants"
            >
              ‹
            </button>
            <button
              className="slider-arrow right"
              onClick={nextSlide}
              aria-label="Next restaurants"
            >
              ›
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {updatedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="col-xl-3 col-lg-4 col-md-6">
                <RestaurantCard
                  restaurant={restaurant}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Offer Card Component
const OfferCard = ({ offer, isActive, style }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`offer-card ${isActive ? "active" : ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="offer-content"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className="offer-image-container">
          <img
            src={offer.image}
            alt={offer.title}
            className="offer-image"
            loading="lazy"
          />
          <div className="offer-overlay"></div>
        </div>
        <div className="offer-text">
          <div className="discount-badge">{offer.title}</div>
          <h3 className="offer-subtitle">{offer.subtitle}</h3>
          {offer.couponCode && (
            <div className="coupon-code">
              <span>Code: {offer.couponCode}</span>
            </div>
          )}
          <div className="offer-actions">
            <button className="btn-primary-offer">{offer.ctaPrimary}</button>
            <button className="btn-secondary-offer">
              {offer.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Offers Section Component
const OffersSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offersData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToOffer = (index) => {
    setCurrentOffer(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % offersData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevOffer = () => {
    setCurrentOffer(
      (prev) => (prev - 1 + offersData.length) % offersData.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextOffer();
    if (isRightSwipe) prevOffer();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") prevOffer();
      if (e.key === "ArrowRight") nextOffer();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <section className="offers-section py-5">
      <div className="container">
        <SectionHeader
          title="Hot Offers"
          subtitle="Don't miss out on these amazing deals!"
        />

        <div
          className="offers-container"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="offers-wrapper">
            {offersData.map((offer, index) => {
              let position = "hidden";
              let style = {};

              if (index === currentOffer) {
                position = "active";
                style = {
                  transform: "translateX(0) scale(1)",
                  zIndex: 3,
                  opacity: 1,
                };
              } else if (
                index ===
                (currentOffer - 1 + offersData.length) % offersData.length
              ) {
                position = "prev";
                style = {
                  transform: "translateX(-60%) scale(0.85)",
                  zIndex: 2,
                  opacity: 0.7,
                };
              } else if (index === (currentOffer + 1) % offersData.length) {
                position = "next";
                style = {
                  transform: "translateX(60%) scale(0.85)",
                  zIndex: 2,
                  opacity: 0.7,
                };
              } else {
                style = {
                  transform: "translateX(0) scale(0.7)",
                  zIndex: 1,
                  opacity: 0,
                };
              }

              return (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isActive={index === currentOffer}
                  style={style}
                />
              );
            })}
          </div>

          <button
            className="offer-arrow left"
            onClick={prevOffer}
            aria-label="Previous offer"
          >
            ‹
          </button>
          <button
            className="offer-arrow right"
            onClick={nextOffer}
            aria-label="Next offer"
          >
            ›
          </button>

          <div className="offer-dots">
            {offersData.map((_, index) => (
              <button
                key={index}
                className={`offer-dot ${
                  index === currentOffer ? "active" : ""
                }`}
                onClick={() => goToOffer(index)}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

  const StarRating = ({ rating }) => (
    <div className="product-rating">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
      <span className="rating-value">{rating}</span>
    </div>
  );

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!imageLoaded && <div className="image-placeholder"></div>}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        <div className={`veg-badge ${product.isVeg ? "veg" : "non-veg"}`}>
          <div className="badge-indicator"></div>
        </div>
      </div>
      <div className="product-content">
        <h6 className="product-name">{product.name}</h6>
        <p className="product-description">{product.description}</p>
        <StarRating rating={product.rating} />
        <div className="product-footer">
          <div className="price-section">
            <span className="product-price">₹{product.price}</span>
          </div>
          <div className="quantity-controls">
            {quantity === 0 ? (
              <button
                className="add-btn"
                onClick={incrementQuantity}
                aria-label={`Add ${product.name} to cart`}
              >
                Add
              </button>
            ) : (
              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Menu Section Component
const MenuSection = () => (
  <section className="menu-section py-5">
    <div className="container">
      <SectionHeader
        title="Popular Dishes"
        subtitle="Most loved items on our menu"
      />

      <div className="products-grid">
        {menuData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

// Main HomePage Component
const HomePage = () => {
  return (
    <div className="homepage">
      <style jsx>{`
        :root {
          --brand: #ff6b35;
          --brand-light: #ff8c00;
          --brand-dark: #e55a2b;
          --accent: #ffd700;
          --accent-light: #ffed4e;
          --muted: #6c757d;
          --success: #28a745;
          --danger: #dc3545;
          --light-gray: #f8f9fa;
          --border-color: #dee2e6;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
          --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --border-radius: 12px;
          --border-radius-lg: 16px;
        }

        .homepage {
          background: white;
        }

        /* Restaurant Cards Styles */
        .restaurants-section {
          background: white;
        }

        .restaurant-card {
          background: white;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
          position: relative;
          will-change: transform;
        }

        .restaurant-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .restaurant-card:focus {
          outline: 3px solid var(--brand);
          outline-offset: 2px;
        }

        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .restaurant-card:hover .card-image {
          transform: scale(1.05);
        }

        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--muted);
          cursor: pointer;
          transition: var(--transition);
          opacity: 0;
          transform: scale(0.8);
          backdrop-filter: blur(10px);
        }

        .favorite-btn.visible {
          opacity: 1;
          transform: scale(1);
        }

        .favorite-btn.active {
          color: var(--danger);
          background: rgba(255, 255, 255, 1);
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 1);
        }

        .card-content {
          padding: 20px;
          position: relative;
        }

        .restaurant-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 8px;
        }

        .cuisine-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .cuisine-tag {
          background: var(--light-gray);
          color: var(--muted);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stars {
          display: inline-flex;
          gap: 2px;
        }

        .star {
          color: #ddd;
          font-size: 14px;
          transition: color 0.2s;
        }

        .star.filled {
          color: var(--accent);
        }

        .rating-text {
          font-size: 0.875rem;
          color: var(--muted);
        }

        .delivery-info {
          font-size: 0.875rem;
          color: var(--muted);
        }

        .delivery-time {
          font-weight: 600;
          color: var(--brand);
        }

        .price-level {
          font-weight: 600;
          color: #212529;
        }

        .location-info {
          margin-top: 4px;
        }

        .area {
          font-weight: 500;
        }

        .delivery-fee {
          color: var(--muted);
        }

        .menu-btn {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: var(--brand);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          opacity: 0;
          transform: translateY(10px);
        }

        .menu-btn.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .menu-btn:hover {
          background: var(--brand-dark);
          transform: translateY(-2px);
        }

        /* Mobile Slider Styles */
        .mobile-slider-container {
          position: relative;
          overflow: hidden;
          border-radius: var(--border-radius-lg);
        }

        .mobile-slider {
          display: flex;
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .slide-item {
          flex: 0 0 100%;
          padding: 0 10px;
        }

        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: var(--brand);
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
          z-index: 10;
        }

        .slider-arrow:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .slider-arrow.left {
          left: 10px;
        }

        .slider-arrow.right {
          right: 10px;
        }

        /* Offers Section Styles */
        .offers-section {
          background: linear-gradient(135deg, #fff8f0 0%, #fff 100%);
          position: relative;
        }

        .offers-container {
          position: relative;
          height: 500px;
          perspective: 1200px;
          overflow: hidden;
        }

        .offers-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .offer-card {
          position: absolute;
          width: 80%;
          max-width: 600px;
          height: 350px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          will-change: transform, opacity;
        }

        .offer-content {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .offer-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .offer-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .offer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 107, 53, 0.8) 0%,
            rgba(255, 140, 0, 0.6) 100%
          );
        }

        .offer-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          z-index: 2;
        }

        .discount-badge {
          font-size: 3rem;
          font-weight: 900;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
          margin-bottom: 16px;
          line-height: 1;
        }

        .offer-subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        }

        .coupon-code {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 20px;
          border-radius: 25px;
          margin-bottom: 24px;
          font-weight: 600;
          letter-spacing: 2px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .offer-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary-offer {
          background: white;
          color: var(--brand);
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-primary-offer:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
        }

        .btn-secondary-offer {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 10px 28px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-secondary-offer:hover {
          background: white;
          color: var(--brand);
        }

        .offer-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--brand);
          cursor: pointer;
          transition: var(--transition);
          z-index: 5;
        }

        .offer-arrow:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .offer-arrow.left {
          left: 20px;
        }

        .offer-arrow.right {
          right: 20px;
        }

        .offer-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 5;
        }

        .offer-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .offer-dot.active {
          background: white;
          transform: scale(1.3);
        }

        /* Menu Section Styles */
        .menu-section {
          background: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 992px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1400px) {
          .products-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .product-card {
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: var(--transition);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .product-image-container {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .veg-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 4px;
          padding: 2px;
        }

        .badge-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .veg .badge-indicator {
          background: var(--success);
        }

        .non-veg .badge-indicator {
          background: var(--danger);
        }

        .product-content {
          padding: 16px;
        }

        .product-name {
          font-size: 1rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .product-description {
          font-size: 0.875rem;
          color: var(--muted);
          margin-bottom: 8px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .product-rating .star {
          font-size: 12px;
        }

        .rating-value {
          font-size: 0.875rem;
          color: var(--muted);
          margin-left: 4px;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--brand);
        }

        .add-btn {
          background: var(--brand);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .add-btn:hover {
          background: var(--brand-dark);
          transform: translateY(-2px);
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          background: var(--light-gray);
          border-radius: 20px;
          padding: 4px;
        }

        .qty-btn {
          background: var(--brand);
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .qty-btn:hover {
          background: var(--brand-dark);
          transform: scale(1.1);
        }

        .qty-display {
          padding: 0 12px;
          font-weight: 600;
          color: var(--brand);
          min-width: 24px;
          text-align: center;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 767px) {
          .discount-badge {
            font-size: 2rem;
          }

          .offer-subtitle {
            font-size: 1.2rem;
          }

          .offers-container {
            height: 400px;
          }

          .offer-card {
            width: 90%;
            height: 300px;
          }

          .offer-arrow {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .offer-arrow.left {
            left: 10px;
          }

          .offer-arrow.right {
            right: 10px;
          }

          .product-image-container {
            height: 140px;
          }
        }

        /* Focus and Accessibility Styles */
        .restaurant-card:focus,
        .offer-card:focus,
        .product-card:focus {
          outline: 3px solid var(--brand);
          outline-offset: 2px;
        }

        .menu-btn:focus,
        .add-btn:focus,
        .qty-btn:focus,
        .btn-primary-offer:focus,
        .btn-secondary-offer:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        /* Performance Optimizations */
        .restaurant-card,
        .offer-card,
        .product-card {
          will-change: transform;
        }

        .card-image,
        .product-image,
        .offer-image {
          will-change: transform;
        }
      `}</style>

      <RestaurantsSection />
      <OffersSection />
      <MenuSection />
    </div>
  );
};

export default HomePage;
