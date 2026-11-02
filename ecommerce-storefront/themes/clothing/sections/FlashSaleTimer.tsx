// themes/clothing/sections/FlashSaleTimer.tsx
"use client";

import FlashSaleCountdown, {
  useFlashSaleCountdown,
} from "../components/FlashSaleCountdown/FlashSaleCountdown";
import { flashSale } from "../Data/Data";

const maxDiscount = Math.max(0, ...flashSale.map((p) => p.discount ?? 0));

/** Banner at the top of the /flash-sale page. Same look as the homepage flash sale section. */
export default function FlashSaleTimer() {
  const timeLeft = useFlashSaleCountdown();
  const ended = timeLeft?.ended ?? false;

  return (
    <section className="rounded-2xl bg-[#faf9f7] px-3 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between lg:gap-10">
        {/* Sale introduction */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-white shadow-lg sm:px-7">
            <span className="text-xs tracking-wide sm:text-sm">
              LIMITED TIME
            </span>
            <span className="text-lg font-bold sm:text-xl">
              UP TO {maxDiscount}% OFF
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            Exclusive Flash Sale
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-700 sm:text-base lg:mx-0">
            {ended
              ? "This flash sale has ended. Stay tuned for the next one."
              : "Premium quality products at unbeatable prices. Grab them before the timer runs out."}
          </p>
        </div>

        {/* Countdown */}
        <div className="shrink-0">
          <FlashSaleCountdown timeLeft={timeLeft} />
        </div>
      </div>
    </section>
  );
}
