"use client";

import { useState } from "react";
import Link from "next/link";
import { FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import {
  type Product,
  getProductBySlug,
  getCategoryById,
  getProductsByCategory,
  formatBDT,
  toBnDigits,
  FLAG_META,
} from "@/lib/Products/json";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductInfoTabs from "../sections/ProductInfoTabs";
import Image from "next/image";

type Props = {
  slug: string;
};

function resolveProduct(param: string): Product | undefined {
  return getProductBySlug(param);
}

export default function ProductDetail({ slug }: Props) {
  const product = resolveProduct(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center mt-26">
        <h1 className="text-2xl font-bold text-gray-800">
          পণ্যটি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-gray-500">
          আমরা এই পণ্যটি খুঁজে পাইনি। অন্য কিছু দেখতে চান?
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#1A9D5B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#158a4e]"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const flagMeta = product.flag ? FLAG_META[product.flag] : null;

  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const inStock = product.inStock && product.stockQuantity > 0;
  const lowStock = inStock && product.stockQuantity <= 10;
  const hasDiscount = !!product.oldPrice && product.oldPrice > product.price;
  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-10 2xl:mt-14 lg:mt-10 md:mt-6 mt-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
      >
        <Link href="/" className="hover:text-[#1A9D5B]">
          হোম
        </Link>
        <FiChevronRight className="text-gray-400" />
        {category && (
          <>
            <Link
              href={`/categories/${category.id}`}
              className="hover:text-[#1A9D5B]"
            >
              {category.nameBn}
            </Link>
            <FiChevronRight className="text-gray-400" />
          </>
        )}
        <span className="truncate text-gray-700">{product.nameBn}</span>
      </nav>

      {/* ============================================================ */}
      {/*  Two-column layout: md and up                                */}
      {/*  md:grid-cols-2  →  left = gallery, right = info             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:gap-12 bg-white p-8 rounded-lg shadow-lg">
        {/* ------------------ LEFT: Gallery (sticky on desktop) ------------------ */}
        <div className="md:sticky md:top-24 md:self-start">
          {/* Desktop: vertical thumb rail + main image side by side */}
          <div className="flex flex-col gap-3 lg:flex-row-reverse md:gap-4">
            {/* Main image */}
            <div className="relative flex-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                <Image
                  src={product.images[activeImage]?.url}
                  alt={product.images[activeImage]?.alt ?? product.name}
                  fill
                  className="h-full w-full object-cover"
                />

                {flagMeta && (
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
                    style={{ backgroundColor: flagMeta.color }}
                  >
                    {flagMeta.labelBn}
                  </span>
                )}

                {hasDiscount && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow">
                    -{toBnDigits(product.discount ?? 0)}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div
                className="
                  flex gap-3 overflow-x-auto pb-1
                  lg:flex-col md:overflow-x-visible md:overflow-y-auto md:pb-0
                "
              >
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`ছবি ${i + 1}`}
                    className={`
                      h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition
                      md:h-16 md:w-16
                      ${
                        activeImage === i
                          ? "border-[#1A9D5B]"
                          : "border-transparent hover:border-gray-300"
                      }
                    `}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ------------------ RIGHT: Info ------------------ */}
        <div className="flex flex-col">
          {/* Name */}
          <h1 className="text-2xl font-bold leading-tight text-gray-900 lg:text-3xl">
            {product.nameBn}
          </h1>

          {/* Price */}
          <div className="mt-5 flex gap-3 border-b border-gray-100 pb-5">
            <span className="md:text-5xl text-4xl font-open-sans md:font-semibold font-bold text-amber-500 flex">
              {formatBDT(product.price)}
            </span>

            <span className="md:text-5xl text-4xl font-normal text-gray-400 line-through flex">
              {product.oldPrice!}
            </span>
            <div hidden={!product.discount}>
              <span className="rounded-md bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                Save {product?.discount}%
              </span>
            </div>
          </div>

          {/* Stock */}
          <div className="mt-4">
            {inStock ? (
              lowStock ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Limited stock — only {toBnDigits(product.stockQuantity)} left
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f6ee] px-3 py-1 text-xs font-semibold text-[#1A9D5B]">
                  <span className="h-2 w-2 rounded-full bg-[#1A9D5B]" />
                  Available
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Out of stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="mt-2 text-gray-600 font-open-sans text-justify">
              {product?.description?.slice(0, 200)}...
            </p>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 grid grid-cols-1 gap-y-4">
            {/* quantity */}
            <div className="flex items-center gap-4">
              <span className="text-md text-black">Quantitiy:</span>
              <div className="flex h-12 items-center rounded-md border border-gray-200">
                <button
                  type="button"
                  aria-label="কমান"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={!inStock || quantity <= 1}
                  className="flex h-12 w-12 items-center justify-center text-gray-600 transition hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
                >
                  <FaMinus className="h-3 w-3" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-black font-serif">
                  {toBnDigits(quantity)}
                </span>
                <button
                  type="button"
                  aria-label="বাড়ান"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(product.stockQuantity || 99, q + 1),
                    )
                  }
                  disabled={!inStock}
                  className="flex h-12 w-12 items-center justify-center text-gray-600 transition hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!inStock}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#1A9D5B] px-6 text-sm font-semibold text-white transition hover:bg-[#158a4e] disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
            >
              <FaShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              type="button"
              disabled={!inStock}
              className=" flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400/80 px-6 text-md text-black transition hover:bg-amber-400/100 disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {/* -------------------------Product Info------------------ */}

      <ProductInfoTabs product={product} />

      {/* ------------------ Related products ------------------ */}
      {related.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-xl font-bold text-gray-900 lg:text-2xl">
              সম্পর্কিত পণ্য
            </h2>
            {category && (
              <Link
                href={`/categories/${category.id}`}
                className="text-sm font-semibold text-[#1A9D5B] hover:underline"
              >
                সব দেখুন
              </Link>
            )}
          </div>

          {/* Related Products */}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
