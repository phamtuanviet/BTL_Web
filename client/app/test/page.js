"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { slides } from "@/data/hardData";

// Tạo component Slide tối ưu hóa render
const Slide = React.memo(({ content }) => (
  <div className="bg-gray-300 h-40 flex items-center justify-center rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
    {content}
  </div>
));

const Carousel = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const totalSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tính toán chiều rộng slide động
  const slideWidth = 100 / slidesPerView;

  // Xử lý responsive
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSlidesPerView(width < 768 ? 1 : width < 1024 ? 2 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev >= totalSlides - slidesPerView ? 0 : prev + 1
    );
  }, [totalSlides, slidesPerView]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - slidesPerView : prev - 1
    );
  }, [totalSlides, slidesPerView]);

  // Auto-play với cleanup
  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // Tính toán vị trí chính xác
  const xPosition = -(currentIndex * slideWidth);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: `${xPosition}%` }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.5,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`flex-none p-2`}
            style={{ width: `${slideWidth}%` }}
            role="listitem"
            aria-label={`Slide ${slide.id + 1}`}
          >
            <Slide content={slide.content} />
          </div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        ←
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleNext}
        aria-label="Next slide"
      >
        →
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalSlides - slidesPerView + 1 }).map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentIndex ? "bg-blue-600" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
