import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}

export default function CarouselButton({
  direction,
  onClick,
  ariaLabel,
  size = "sm",
  className = "",
}: CarouselButtonProps) {
  const isLeft = direction === "left";

  const sizeClasses = {
    sm: {
      button: "h-11 w-11",
      icon: "h-5 w-5",
    },
    md: {
      button: "h-14 w-14",
      icon: "h-6 w-6",
    },
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={twMerge(
        `absolute top-1/2 z-10 cursor-pointer flex ${sizeClasses[size].button} ${
          isLeft ? "left-2" : "right-2"
        } -translate-y-1/2 items-center justify-center rounded-full bg-[#e8f0ec]/80 text-[#09643c] hover:text-white shadow-md transition hover:bg-[#1A9D5B] ${className} active:bg-green-600 active:text-white`,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size].icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}
