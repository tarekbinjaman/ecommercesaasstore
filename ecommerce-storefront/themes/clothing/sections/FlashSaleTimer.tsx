// themes/clothing/sections/FlashSaleTimer.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBolt } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export default function FlashSaleTimer() {
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
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
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

  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <section>
      <div className="mx-auto w-[95%] lg:max-w-[1400px]">
        <div
          className={`relative overflow-hidden rounded-2xl bg-stone-900 ${
            isHome ? "px-4 py-6 lg:px-8" : "px-4 py-5 lg:px-8"
          }`}
        >
          {/* Decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-600/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-rose-500/15 blur-3xl"
          />

          {/* Layout */}
          <div className="relative flex flex-col items-center justify-between gap-5 md:flex-row md:gap-6">
            {/* ---------- Left: Title ---------- */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-600/20 text-xl text-rose-400 ring-1 ring-rose-500/40 lg:h-12 lg:w-12 lg:text-2xl"
                style={{ animation: "scale 2s ease-in-out infinite" }}
              >
                <FaBolt />
              </div>

              <div className="leading-tight">
                <h2 className="text-lg font-extrabold tracking-wide text-white sm:text-xl lg:text-2xl">
                  ফ্ল্যাশ সেল
                </h2>
                <p className="text-[11px] font-medium uppercase tracking-widest text-rose-300 sm:text-xs">
                  সীমিত সময়ের অফার
                </p>
              </div>
            </div>

            {/* ---------- Center: Countdown ---------- */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Days */}
              <TimeBox value={timeLeft.days} label="দিন" />
              <Colon />
              <TimeBox value={timeLeft.hours} label="ঘন্টা" />
              <Colon />
              <TimeBox value={timeLeft.minutes} label="মিনিট" />
              <Colon />
              <TimeBox value={timeLeft.seconds} label="সেকেন্ড" accent />
            </div>

            {/* ---------- Right: View All ---------- */}
            {pathname !== "/flash-sale" && (
              <Link
                href="/flash-sale"
                className="group inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-700"
              >
                সব দেখুন
                <FaArrowRight className="text-xs transition group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Time box                                                         */
/* ---------------------------------------------------------------- */
function TimeBox({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex min-w-[52px] flex-col items-center justify-center rounded-xl px-2 py-1.5 sm:min-w-[62px] sm:py-2 ${
        accent
          ? "bg-rose-600 ring-1 ring-rose-500"
          : "bg-stone-800 ring-1 ring-stone-700"
      }`}
    >
      <span className="text-lg font-bold tabular-nums text-white sm:text-xl lg:text-2xl">
        {value}
      </span>
      <span
        className={`text-[10px] font-medium uppercase tracking-wide sm:text-[11px] ${
          accent ? "text-rose-100" : "text-stone-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Colon separator                                                  */
/* ---------------------------------------------------------------- */
function Colon() {
  return (
    <span className="text-lg font-bold text-rose-400/70 sm:text-xl">:</span>
  );
}