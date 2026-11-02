"use client";

import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  value: number;
  max: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
};

export default function QtyControl({ value, max, onChange, size = "md" }: Props) {
  const box = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-200 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className={`${box} flex items-center justify-center text-gray-600 transition hover:bg-[#111111] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600`}
      >
        <FaMinus className="h-2.5 w-2.5" />
      </button>
      <span
        aria-live="polite"
        className="w-10 text-center text-sm font-semibold tabular-nums text-gray-900"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={`${box} flex items-center justify-center text-gray-600 transition hover:bg-[#111111] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600`}
      >
        <FaPlus className="h-2.5 w-2.5" />
      </button>
    </div>
  );
}
