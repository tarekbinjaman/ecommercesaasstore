// themes/clothing/sections/BestProductsBanner.tsx
import Link from "next/link";
import { getBestSellerProducts } from "../Data/Data";

const bestSellerCount = getBestSellerProducts().length;

/** Banner at the top of the /best-products page. Same look as the flash sale banner. */
export default function BestProductsBanner() {
  return (
    <section className="rounded-2xl bg-[#faf9f7] px-3 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between lg:gap-10">
        {/* Intro */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-white shadow-lg sm:px-7">
            <span className="text-xs tracking-wide sm:text-sm">
              CUSTOMER FAVORITES
            </span>
            <span className="text-lg font-bold sm:text-xl">
              {bestSellerCount} PICKS
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            Best Selling Products
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-700 sm:text-base lg:mx-0">
            The pieces our customers choose again and again. Loved for their
            quality, comfort and everyday style.
          </p>
        </div>

        {/* Action */}
        <Link
          href="/products"
          className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-xl bg-black px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800 sm:px-9"
        >
          SHOP ALL PRODUCTS
        </Link>
      </div>
    </section>
  );
}
