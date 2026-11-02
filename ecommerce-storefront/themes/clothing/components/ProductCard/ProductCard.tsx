"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FLAG_META,
  getCategoryById,
  type Product,
} from "../../Data/Data";

function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const category = getCategoryById(product.categoryId);
  const primaryImage = product.images[0];

  const discount =
    product.discount ??
    (product.oldPrice
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0);

  const badge = product.flag ? FLAG_META[product.flag].label : null;
  const href = `/productDetail/${product.slug}`;

  return (
    <article className="group min-w-0">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Link
          href={href}
          className="absolute inset-0"
          aria-label={`View ${product.name}`}
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>

        {badge && (
          <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-gray-900 sm:left-3 sm:top-3 sm:text-[10px]">
            {badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-2 left-2 bg-red-600 px-2 py-1 text-[10px] font-medium text-white sm:bottom-3 sm:left-3">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isFavorite}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 transition hover:bg-white sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.7"
            className={`h-[17px] w-[17px] ${
              isFavorite ? "text-red-500" : "text-gray-800"
            }`}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            />
          </svg>
        </button>

        {/* Hover action: desktop */}
        <Link
          href={href}
          className="absolute bottom-0 left-0 right-0 hidden translate-y-full bg-white/95 py-3 text-center text-xs font-semibold text-gray-900 transition-all duration-300 hover:bg-black hover:text-white group-hover:translate-y-0 md:block"
        >
          View Product
        </Link>
      </div>

      {/* Product Information */}
      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
          {category?.name ?? ""}
        </p>

        <Link href={href} className="mt-1 block">
          <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 transition-colors hover:text-gray-500 sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-gray-900 sm:text-base">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              ৳{product.oldPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {/* Rating — renders only when the product provides it */}
        {/* {typeof product.rating === "number" && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="text-amber-500">★</span>
            <span className="font-medium text-gray-700">{product.rating}</span>
            {typeof product.reviews === "number" && (
              <span className="text-gray-400">({product.reviews})</span>
            )}
          </div>
        )} */}
      </div>
    </article>
  );
}

export default ProductCard;