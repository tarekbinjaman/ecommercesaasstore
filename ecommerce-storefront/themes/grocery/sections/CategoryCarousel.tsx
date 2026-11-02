"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CarouselButton from "../components/Buttons/CarouselButton/CarouselButton";
import { categories } from "@/lib/Products/json";

export default function CategoryCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (slider.scrollLeft <= 0) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const isAtEnd =
      slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5;

    if (isAtEnd) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(scrollRight, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-18">
      <div className="mx-auto w-[95%] max-w-[1365px]">
        {/* Title */}
        <h2 className="mb-8 text-center text-3xl font-bold text-green-800">
          প্রোডাক্ট ক্যাটাগরি
        </h2>

        {/* Slider wrapper */}
        <div className="relative">
          {/* Left button */}
          <CarouselButton
            direction="left"
            onClick={scrollLeft}
            ariaLabel="Previous categories"
            className="-left-2 sm:-left-4"
          />

          {/* Categories */}
          <div
            ref={sliderRef}
            className="flex gap-0 overflow-x-auto scroll-smooth px-2 py-2 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group flex min-w-[90px] shrink-0 flex-col items-center md:min-w-[100px] lg:min-w-[120px]"
              >
                {/* Image */}
                <div className="relative inline-block h-[75px] w-[75px] overflow-hidden rounded-full border-3 border-[#ffe9e9] bg-[#f4f8f6] transition duration-200 ease-in-out hover:-translate-y-2 hover:border-green-700 md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px] xl:h-[100px] xl:w-[100px]">
                  <Image
                    src={category.image}
                    alt={category.nameBn}
                    fill
                    sizes="(max-width: 768px) 75px, (max-width: 1024px) 80px, 100px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <span className="mt-3 text-center text-xs font-bold text-gray-700 transition group-hover:text-[#149b5f] md:text-sm">
                  {category.nameBn}
                </span>
              </Link>
            ))}
          </div>

          {/* Right button */}
          <CarouselButton
            direction="right"
            onClick={scrollRight}
            ariaLabel="Next categories"
            className="-right-2 md:-right-4"
          />
        </div>
      </div>
    </section>
  );
}