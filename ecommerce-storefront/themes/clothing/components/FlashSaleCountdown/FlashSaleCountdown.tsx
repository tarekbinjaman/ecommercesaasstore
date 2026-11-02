"use client";

import { useEffect, useState } from "react";
import { FLASH_SALE_ENDS_AT } from "../../Data/Data";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
};

function getTimeLeft(endTime: number): TimeLeft {
  const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    ended: remaining === 0,
  };
}

/**
 * Live countdown to FLASH_SALE_ENDS_AT.
 * Returns null until mounted so server and client render the same markup.
 */
export function useFlashSaleCountdown(): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const endTime = new Date(FLASH_SALE_ENDS_AT).getTime();
    const tick = () => setTimeLeft(getTimeLeft(endTime));

    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  return timeLeft;
}

/** Days / Hours / Minutes / Seconds boxes used by every flash sale section. */
export default function FlashSaleCountdown({
  timeLeft,
}: {
  timeLeft: TimeLeft | null;
}) {
  const items = [
    { value: timeLeft?.days ?? 0, label: "Days" },
    { value: timeLeft?.hours ?? 0, label: "Hours" },
    { value: timeLeft?.minutes ?? 0, label: "Minutes" },
    { value: timeLeft?.seconds ?? 0, label: "Seconds" },
  ];

  return (
    <div
      role="timer"
      aria-label="Time left in the flash sale"
      className="flex flex-wrap justify-center gap-2.5 sm:gap-4"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex h-[84px] w-[70px] flex-col items-center justify-center
            rounded-2xl border border-gray-200 bg-white/80
            shadow-sm sm:h-[100px] sm:w-[95px]"
        >
          <span className="text-2xl font-bold leading-tight tabular-nums text-black sm:text-4xl">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs text-gray-800 sm:text-base">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
