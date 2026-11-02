"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import CarouselButton from "../components/Buttons/CarouselButton/CarouselButton";
import OrderButton from "../components/Buttons/OrderButton/OrderButton";
import ViewAllButton from "../components/Buttons/ViewAllButton/ViewAllButton";
import ProductCard from "../components/ProductCard/ProductCard";

import { products } from "@/lib/Products/json";


const bestProductList = products.slice(0, 8);

const AUTOPLAY_MS = 3000;

export default function BestProducts() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);

  /* ---------- measure real geometry of one step ---------- */
  const getMetrics = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return null;

    const cards = slider.children as HTMLCollectionOf<HTMLElement>;
    if (cards.length < 2) return null;

    const cardWidth = cards[0].offsetWidth;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    if (step <= 0) return null;

    const gap = step - cardWidth;
    const visible = Math.max(1, Math.floor((slider.clientWidth + gap) / step));
    const lastIndex = Math.max(0, cards.length - visible);

    return { slider, step, lastIndex };
  }, []);

  /* ---------- navigation ---------- */
  const goTo = useCallback(
    (i: number) => {
      const m = getMetrics();
      if (!m) return;

      const target = Math.max(0, Math.min(i, m.lastIndex));
      indexRef.current = target;
      m.slider.scrollTo({ left: target * m.step, behavior: "smooth" });
    },
    [getMetrics],
  );

  const goNext = useCallback(() => {
    const m = getMetrics();
    if (!m) return;
    goTo(indexRef.current >= m.lastIndex ? 0 : indexRef.current + 1);
  }, [getMetrics, goTo]);

  const goPrev = useCallback(() => {
    const m = getMetrics();
    if (!m) return;
    goTo(indexRef.current <= 0 ? m.lastIndex : indexRef.current - 1);
  }, [getMetrics, goTo]);

  /* ---------- keep index in sync when the user swipes ---------- */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const m = getMetrics();
        if (!m) return;

        const nearest = Math.round(slider.scrollLeft / m.step);
        indexRef.current = Math.max(0, Math.min(nearest, m.lastIndex));
      });
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [getMetrics]);

  /* ---------- re-measure + realign on resize ---------- */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const ro = new ResizeObserver(() => {
      const m = getMetrics();
      if (!m) return;

      const target = Math.min(indexRef.current, m.lastIndex);
      indexRef.current = target;
      m.slider.scrollTo({ left: target * m.step, behavior: "auto" });
    });

    ro.observe(slider);
    return () => ro.disconnect();
  }, [getMetrics]);

  /* ---------- autoplay ---------- */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      goNext();
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [goNext]);

  return (
    <section className=" py-16">
      <div className="mx-auto w-[95%] max-w-[1365px]">
        {/* Header */}
        <div className="lg:mb-10 mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-green-800">বেস্ট প্রোডাক্ট</h2>

          <ViewAllButton href="/best-products" />
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={() => {
            pausedRef.current = false;
          }}
        >
          <CarouselButton
            direction="left"
            onClick={goPrev}
            ariaLabel="Previous best products"
            size="sm"
            className="md:-left-4 -left-2"
          />

          {/* GRID CAROUSEL — matches FlashSale breakpoints */}
          <div
            ref={sliderRef}
            className="
              grid grid-flow-col
              auto-cols-[calc((100%-1.25rem)/1)]
              md:auto-cols-[calc((100%-1.25rem)/2)]
              lg:auto-cols-[calc((100%-2.5rem)/3)]
              xl:auto-cols-[calc((100%-3.75rem)/5)]
              2xl:auto-cols-[calc((100%-3.75rem)/5)]
              gap-5 overflow-x-auto scroll-smooth
              snap-x snap-mandatory px-2 py-2
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
          >
            {bestProductList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <CarouselButton
            direction="right"
            onClick={goNext}
            ariaLabel="Next best products"
            size="sm"
            className="md:-right-4 -right-2"
          />
        </div>
      </div>
    </section>
  );
}
