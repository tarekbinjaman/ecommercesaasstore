"use client";

import Image from "next/image";
import Link from "next/link";
import { SlEye } from "react-icons/sl";
import {
  FLAG_META,
  formatBDT,
  getBrandById,
  type Product,
} from "@/lib/Products/json";
import { FaCartShopping } from "react-icons/fa6";

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const cover = product.images[0];
  const brand = getBrandById(product.brandId);

  const outOfStock = !product.inStock;
  const hasDiscount =
    typeof product.oldPrice === "number" &&
    product.oldPrice > product.price;
  const flag = product.flag; // cap at 2 to avoid clutter

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ---------------- Image ---------------- */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-gray-50"
      >
        <Image
          src={cover.url}
          alt={cover.alt || product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-green-600 px-2 py-0.5 text-[14px] font-bold text-white shadow-sm">
            -{product.discount ?? Math.round(
              ((product.oldPrice! - product.price) / product.oldPrice!) * 100
            )}
            %
          </span>
        )}

        {/* Out-of-stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-md bg-white/95 px-3 py-1 text-xs font-bold text-gray-800">
              স্টক নেই
            </span>
          </div>
        )}

        {/* Flag badges (top-right stack) */}
 {flag && !outOfStock && (
   <span
     className="absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm"
     style={{ backgroundColor: FLAG_META[flag].color }}
   >
     {FLAG_META[flag].labelBn}
   </span>
 )}
      </Link>

      {/* ---------------- Body ---------------- */}
      <div className="flex flex-1 flex-col p-3.5">

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 min-h-[36px] text-sm font-semibold leading-snug text-gray-800 transition group-hover:text-[#1A9D5B]">
            {product.nameBn}
          </h3>
        </Link>

        {/* Price row */}
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#1A9D5B]">
            {formatBDT(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatBDT(product.oldPrice!)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => onAddToCart?.(product)}
            aria-label="কার্টে যোগ করুন"
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#1A9D5B] px-2 py-2 text-xs font-semibold text-white transition hover:bg-[#17834d] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FaCartShopping className="hidden md:block" />
            <span className="md">Add to Cart</span>
          </button>

          <Link
            href={`/products/${product.slug}`}
            aria-label="বিস্তারিত দেখুন"
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[#1A9D5B] px-3 py-2 text-xs font-semibold text-[#1A9D5B] transition hover:bg-[#e7f6ee] active:scale-[0.98]"
          >
            <SlEye className="text-sm" />
            View
          </Link>
        </div>
      </div>
    </article>
  );
}