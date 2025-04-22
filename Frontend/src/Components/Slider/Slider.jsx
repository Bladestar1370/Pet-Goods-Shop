import React, { useState, useEffect } from 'react';
import './Slider.css';

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // For pause-on-hover
  const slides = ['/img1.webp', '/img2.webp', '/img3.webp'];
  const slideInterval = 3000; // Time in milliseconds (5 seconds)

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return; // Skip if paused
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(timer); // Cleanup on unmount or when dependencies change
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="moving-images"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on hover out
    >
      <div className="slider">
        <div
          className="slider-images"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide} alt={`Slide ${index + 1}`} />
          ))}
        </div>
        <button className="arrow left-arrow" onClick={prevSlide} aria-label="Previous slide">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="arrow right-arrow" onClick={nextSlide} aria-label="Next slide">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};