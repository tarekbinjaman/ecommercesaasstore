"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { useMobileNav } from "@/lib/context/MobileNavContext";
import {
  products,
  formatBDT,
  getCategoryById,
  FLAG_META,
} from "@/lib/Products/json";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MobileSearchBar() {
  const { searchOpen, closeSearch } = useMobileNav();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");

const handleClose = () => {
  setQuery("");
  closeSearch();
};
  
  // Autofocus after the slide-in finishes
  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [searchOpen]);
  
  // Close on Escape
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, closeSearch]);
  
  /* --------------------------- search results --------------------------- */
  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (trimmed.length < 1) return [];
    return products
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.nameBn.includes(query.trim()) ||
          p.categoryId.toLowerCase().includes(trimmed) ||
          (p.brandId ?? "").toLowerCase().includes(trimmed)
        );
      })
      .slice(0, 8);
  }, [trimmed, query]);

  const hasQuery = trimmed.length > 0;

  const router = useRouter();

const handleSearch = () => {
  const searchQuery = query.trim();

  if (!searchQuery) return;

  closeSearch();
  router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
};

  return (
    <div
      aria-hidden={!searchOpen}
      className={`fixed left-0 right-0 top-0 z-[55] lg:hidden transition-transform duration-300 ease-out ${
        searchOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <div className="flex flex-col border-b border-gray-200 bg-white px-4 py-3 shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-black">Search product</p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 rounded-full bg-yellow-100 mb-1"
          >
            <RxCross2 className="h-5 w-5 " />
          </button>
        </div>
        <div className="h-[1px] w-full bg-gray-300 mb-4" />
        <div className="relative flex h-11 flex-1 items-center rounded-full border-2 border-green-600 bg-[#f4f8f6] pl-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
            placeholder="Search for products..."
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear"
              className="mr-1 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
            >
              <RxCross2 className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Search"
            onClick={handleSearch}
            className="flex h-9 w-9 items-center justify-center rounded-r-full border-2 border-green-600 bg-green-600 text-white transition hover:bg-green-700"
          >
            <IoSearchSharp className="h-4 w-4" />
          </button>
        </div>

        {/* ---------- Results (grows with content, caps at 60vh) ---------- */}
        {hasQuery && (
          <div
            className={`mt-3 overflow-y-auto overscroll-contain rounded-lg border border-gray-100 ${
              results.length === 0 ? "h-[280px]" : "max-h-[60vh]"
            }`}
          >
            {results.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                  <FiSearch className="h-6 w-6 text-gray-300" />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-700">
                  কিছু খুঁজে পাওয়া যায়নি
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  &ldquo;{query}&rdquo; এর জন্য কোনো পণ্য নেই। অন্য কিছু লিখে
                  দেখুন।
                </p>
              </div>
            ) : (
              <>
                <p className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-gray-400 backdrop-blur">
                  {results.length}টি ফলাফল
                </p>

                <ul className="divide-y divide-gray-100">
                  {results.map((p) => {
                    const category = getCategoryById(p.categoryId);
                    const flagMeta = p.flag ? FLAG_META[p.flag] : null;
                    const hasDiscount = !!p.oldPrice && p.oldPrice > p.price;

                    return (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 px-4 py-3 transition active:bg-gray-50"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                            <Image
                              src={p.images[0]?.url}
                              alt={p.images[0]?.alt ?? p.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-gray-800">
                              {p.nameBn}
                            </p>
                            <p className="truncate text-[11px] text-gray-500">
                              {p.name}
                              {category && ` · ${category.nameBn}`}
                            </p>
                            <div className="mt-0.5 flex items-baseline gap-2">
                              <span className="text-sm font-bold text-[#1A9D5B]">
                                {formatBDT(p.price)}
                              </span>
                              {hasDiscount && (
                                <span className="text-[11px] text-gray-400 line-through">
                                  {formatBDT(p.oldPrice!)}
                                </span>
                              )}
                            </div>
                          </div>

                          {flagMeta && (
                            <span
                              className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white"
                              style={{ backgroundColor: flagMeta.color }}
                            >
                              {flagMeta.labelBn}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}