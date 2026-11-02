"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { usePathname } from "next/navigation";
import OrderButton from "../components/Buttons/OrderButton/OrderButton";
import ViewAllButton from "../components/Buttons/ViewAllButton/ViewAllButton";
import {
  getProductsByCategory,
  formatBDT,
  type Product,
} from "@/lib/Products/json";
import ProductCard from "../components/ProductCard/ProductCard";

type AllProductsProps = {
  /** When provided, only products from this category are shown. */
  categoryId?: string;
  /** How many products to show before "load more". */
  initialCount?: number;
};

export default function AllProducts({
  categoryId,
  initialCount = 15,
}: AllProductsProps) {
  const [showAll, setShowAll] = useState(false);

  const pathname = usePathname();

  const isCategoryPage = pathname?.startsWith("/categories") ?? false;
  const isHomePage = pathname === "/";
  const isProductsPage = pathname === "/products";
  const isBestProductsPage = pathname === "/best-products";

  const filteredProducts: Product[] = getProductsByCategory(categoryId);

  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, initialCount);

  const hasMore = filteredProducts.length > initialCount;

  return (
    <section>
      <div className="mx-auto w-[95%] max-w-[1365px]">
        {/* ---------------- Header ---------------- */}
        {!isCategoryPage && (
          <div className="mb-5 flex items-center justify-between lg:mb-10">
            {(isHomePage || isProductsPage) && (
              <h2
                className={`text-3xl font-bold text-green-800 ${
                  isProductsPage ? "mt-14" : ""
                }`}
              >
                All Products
              </h2>
            )}

            {isBestProductsPage && (
              <h2 className="mt-14 text-3xl font-bold text-green-800">
                বেস্ট প্রোডাক্ট
              </h2>
            )}

            {isHomePage && <ViewAllButton href="/products" />}
          </div>
        )}

        {/* ---------------- Empty state ---------------- */}
        {visibleProducts.length === 0 && (
          <p className="py-16 text-center text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

        {/* ---------------- Product grid ---------------- */}
        {visibleProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* ---------------- Load more ---------------- */}
        {!showAll && hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#1A9D5B] transition hover:text-[#17834d]"
            >
              আরো পণ্য দেখুন
              <SlArrowDown />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
