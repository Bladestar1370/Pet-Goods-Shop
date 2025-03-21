import React, { useState } from 'react';
import './Slider.css'; // We’ll add CSS next

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/img1.webp',
    '/img2.webp',
    '/img3.webp'
  ]; // Match your static site’s images

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="moving-images">
      <div className="slider">
        <div
          className="slider-images"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide} alt={`Slide ${index + 1}`} />
          ))}
        </div>
        <button className="arrow left-arrow" onClick={prevSlide}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="arrow right-arrow" onClick={nextSlide}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};