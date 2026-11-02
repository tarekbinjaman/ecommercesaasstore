"use client";

import { useEffect, useRef, useState } from "react";
import ViewAllButton from "../components/Buttons/ViewAllButton/ViewAllButton";
import { FaBolt } from "react-icons/fa6";
import "../src/styles.css";
import { useParams, usePathname } from "next/navigation";
export default function FlashSaleTimer() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Countdown
  useEffect(() => {
    const endDate = new Date("2026-12-31T23:59:59").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);


  const styleForthisSection = 'bg-green-800 lg:rounded-2xl rounded-lg xl:py-0 py-4';
  const pathname = usePathname();

  return (
    <section>
      <div className="mx-auto lg:max-w-[1400px] w-[95%]">
        <div className={pathname === "/" ? `grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3   items-center ${styleForthisSection}` : `flex md:flex-row flex-col items-center justify-between ${styleForthisSection} lg:pr-10 md:pr-4`}>
        {/* Header */}
        <div className="lg:mt-4 col-span-2 md:col-span-1">
        <div className="lg:mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between xl:h-[70px] h-90px  lg:px-8 md:pl-2 pl-2 md:mb-0 mb-5">
          <div className="flex lg:justify-center justify-start items-center lg:gap-4 gap-2">
            <div
              className="lg:text-4xl text-lg text-yellow-300"
              style={{
                animation: "scale 2s ease-in-out infinite",
              }}
            >
              <FaBolt />
            </div>
            {/* Title */}
            <h2 className="flex items-baseline gap-2 lg:text-2xl md:text-lg text-lg font-bold text-white lg:text-white whitespace-nowrap">
              Flash Sale
              <span className="lg:text-sm text-xs font-normal text-white/80">
                Limited Time Offer
              </span>
            </h2>
          </div>
        </div>
        </div>

          {/* Countdown */}
          <div className="md:place-self-center col-span-1 pl-2">
          <div className="flex items-center gap-2">
            {/* Days */}
            <div className="flex min-w-[60px] flex-col space-y-2 items-center rounded-lg bg-[#317050] px-2 py-2 text-white">
              <span className="text-xl font-bold">{timeLeft.days}</span>
              <small className="text-[12px] text-gray-300">দিন</small>
            </div>


            {/* Hours */}
            <div className="flex min-w-[60px] flex-col space-y-2 items-center rounded-lg bg-[#317050] px-2 py-2 text-white">
              <span className="text-xl font-bold">{timeLeft.hours}</span>
              <small className="text-[12px] text-gray-300">ঘন্টা</small>
            </div>


            {/* Minutes */}
            <div className="flex min-w-[60px] flex-col space-y-2 items-center rounded-lg bg-[#317050] px-2 py-2 text-white">
              <span className="text-xl font-bold">{timeLeft.minutes}</span>
              <small className="text-[12px] text-gray-300">মিনিট</small>
            </div>


            {/* Seconds */}
            <div className="flex min-w-[60px] flex-col space-y-2 items-center rounded-lg bg-[#317050] px-2 py-2 text-white">
              <span className="text-xl font-bold">{timeLeft.seconds}</span>
              <small className="text-[12px] text-gray-300">সেকেন্ড</small>
            </div>
          </div>
          </div>

             {/* View All */}
             <div hidden={pathname === "/flash-sale"} className="md:place-self-center md:justify-self-end mr-4 col-span-1 justify-self-end">
          <ViewAllButton href="/flash-sale" />          
             </div>
        </div>


      </div>
    </section>
  );
}
