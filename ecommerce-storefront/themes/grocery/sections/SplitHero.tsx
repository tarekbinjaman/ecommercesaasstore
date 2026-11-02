"use client";

import { useEffect, useState } from "react";
import CarouselButton from "../components/Buttons/CarouselButton/CarouselButton";
const slides = [
  {
    image: "https://picsum.photos/seed/organic-fruits-hero/1200/500",
    alt: "Fresh Fruits",
  },
  {
    image: "https://picsum.photos/seed/organic-hero-bag/1200/500",
    alt: "Organic Healthy Food",
  },
  {
    image: "https://picsum.photos/seed/organic-honey-hero/1200/500",
    alt: "Honey & Ghee",
  },
];
export default function SplitHero() {
    const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

    // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full">
      <div className="relative mx-auto w-[95%] max-w-[1365px]">
<CarouselButton
  direction="left"
  onClick={prevSlide}
  ariaLabel="Previous categories"
  size="md"
  className="lg:left-1 md:-left-0 lg:h-11 lg:w-11 md:h-10 md:w-10 xl:h-15 xl:w-15 h-8 w-8"
/>
        {/* Slider */}
        <div className="relative h-[180px] overflow-hidden rounded-[18px] lg:h-[445px] xl:h-[495px]">
          
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="h-full min-w-full shrink-0"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Previous Button */}


          {/* Next Button */}

        </div>
<CarouselButton
  direction="right"
  onClick={nextSlide}
  ariaLabel="Next slide"
  size="md"
  className="lg:right-1 md:-right-0 -right:4 lg:h-11 lg:w-11 md:h-10 md:w-10 xl:h-15 xl:w-15 h-8 w-8"
/>
        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-7 bg-[#149b5f]"
                  : "w-3 bg-[#d5ddd9]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
