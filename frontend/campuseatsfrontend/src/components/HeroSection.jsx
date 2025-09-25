import React, { useState, useEffect, useCallback } from "react";

const CampusEatsHero = () => {
  // Carousel data - easily add/remove slides
  const slides = [
    {
      id: 1,
      title: "Hot & Fresh Meals Delivered Fast!",
      subtitle: "Order now and get 20% off your first meal",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Order Now",
      gradient:
        "linear-gradient(135deg, rgba(255,107,53,0.9) 0%, rgba(255,69,0,0.8) 100%)",
    },
    {
      id: 2,
      title: "Campus Special: Buy 2 Get 1 Free!",
      subtitle: "Limited time offer on all combo meals",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Grab Deal",
      gradient:
        "linear-gradient(135deg, rgba(255,140,0,0.9) 0%, rgba(255,107,53,0.8) 100%)",
    },
    {
      id: 3,
      title: "Midnight Cravings? We Got You!",
      subtitle: "24/7 delivery service for hungry students",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Order Late",
      gradient:
        "linear-gradient(135deg, rgba(220,20,60,0.9) 0%, rgba(255,107,53,0.8) 100%)",
    },
    {
      id: 4,
      title: "Healthy Options Available!",
      subtitle: "Fresh salads, smoothies & nutritious meals",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Eat Healthy",
      gradient:
        "linear-gradient(135deg, rgba(34,193,195,0.9) 0%, rgba(253,187,45,0.8) 100%)",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide]);

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <>
      <style jsx>{`
        .hero-container {
          position: relative;
          width: 100%;
          height: 80vh;
          overflow: hidden;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c00 100%);
          perspective: 1000px;
        }

        .carousel-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-container {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 85%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .slide.active {
          transform: translateZ(0) scale(1);
          opacity: 1;
          z-index: 3;
        }

        .slide.prev {
          transform: translateX(-60%) translateZ(-200px) rotateY(25deg)
            scale(0.8);
          opacity: 0.7;
          z-index: 2;
        }

        .slide.next {
          transform: translateX(60%) translateZ(-200px) rotateY(-25deg)
            scale(0.8);
          opacity: 0.7;
          z-index: 2;
        }

        .slide.hidden {
          transform: translateZ(-400px) scale(0.6);
          opacity: 0;
          z-index: 1;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .slide:hover .slide-image {
          transform: scale(1.05);
        }

        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 2rem;
          z-index: 2;
        }

        .slide-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
          line-height: 1.1;
          animation: slideInUp 1s ease-out;
        }

        .slide-subtitle {
          font-size: 1.4rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
          opacity: 0.95;
          animation: slideInUp 1s ease-out 0.2s both;
        }

        .cta-button {
          background: linear-gradient(45deg, #ff6b35, #ff8c00);
          border: none;
          color: white;
          padding: 15px 40px;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
          animation: slideInUp 1s ease-out 0.4s both;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(255, 107, 53, 0.6);
          background: linear-gradient(45deg, #ff8c00, #ff6b35);
        }

        .nav-arrows {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 4;
        }

        .nav-arrows:hover {
          background: rgba(255, 107, 53, 0.8);
          border-color: rgba(255, 107, 53, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrows.left {
          left: 20px;
        }

        .nav-arrows.right {
          right: 20px;
        }

        .nav-arrows svg {
          width: 24px;
          height: 24px;
          fill: white;
        }

        .dots-container {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 4;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .dot.active {
          background: #ff6b35;
          transform: scale(1.3);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .dot:hover {
          background: rgba(255, 107, 53, 0.8);
          transform: scale(1.2);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            height: 70vh;
          }

          .slide-title {
            font-size: 2.5rem;
          }

          .slide-subtitle {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }

          .cta-button {
            padding: 12px 30px;
            font-size: 1rem;
          }

          .nav-arrows {
            width: 50px;
            height: 50px;
          }

          .nav-arrows.left {
            left: 10px;
          }

          .nav-arrows.right {
            right: 10px;
          }

          .slide.prev {
            transform: translateX(-80%) translateZ(-150px) rotateY(30deg)
              scale(0.7);
          }

          .slide.next {
            transform: translateX(80%) translateZ(-150px) rotateY(-30deg)
              scale(0.7);
          }
        }

        @media (max-width: 480px) {
          .slide-title {
            font-size: 2rem;
            padding: 0 1rem;
          }

          .slide-subtitle {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .slide-overlay {
            padding: 1rem;
          }

          .carousel-container {
            width: 95%;
            height: 80%;
          }
        }
      `}</style>

      <div className="hero-container">
        <div className="carousel-wrapper">
          <div
            className="carousel-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {slides.map((slide, index) => {
              let slideClass = "slide hidden";

              if (index === currentSlide) {
                slideClass = "slide active";
              } else if (
                index ===
                (currentSlide - 1 + slides.length) % slides.length
              ) {
                slideClass = "slide prev";
              } else if (index === (currentSlide + 1) % slides.length) {
                slideClass = "slide next";
              }

              return (
                <div key={slide.id} className={slideClass}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-image"
                  />
                  <div
                    className="slide-overlay"
                    style={{ background: slide.gradient }}
                  >
                    <h1 className="slide-title">{slide.title}</h1>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <button className="cta-button">{slide.cta}</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button className="nav-arrows left" onClick={prevSlide}>
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button className="nav-arrows right" onClick={nextSlide}>
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="dots-container">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampusEatsHero;
