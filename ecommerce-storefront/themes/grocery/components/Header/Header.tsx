"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLeaf, FaRegUser, FaShoppingBag } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import MobileSidebar from "../Mobilesidebar/MobileSidebar";
import { useMobileNav } from "@/lib/context/MobileNavContext";
import {
  products,
  formatBDT,
  getCategoryById,
  FLAG_META,
} from "@/lib/Products/json";
import { useRouter } from "next/navigation";

export function Header() {
  const { sidebarOpen, openSidebar, closeSidebar } = useMobileNav();
  
  /* ---------------------------- search state ---------------------------- */
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (trimmed.length < 1) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.nameBn.includes(query.trim()) ||
          p.categoryId.toLowerCase().includes(trimmed) ||
          (p.brandId ?? "").toLowerCase().includes(trimmed),
      )
      .slice(0, 8);
  }, [trimmed, query]);

  const hasQuery = trimmed.length > 0;

  /** Single close path: reset query, close dropdown, blur input. */
  const handleClose = () => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) handleClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
    
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
   
  }, []);


const handleSearch = () => {
  const searchQuery = query.trim();

  if (!searchQuery) return;

  handleClose();
  router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
};

  return (
    <>
      <div className="lg:py-6 pt-4 flex flex-col lg:flex-row justify-center items-center lg:gap-10 gap-0 lg:bg-white bg-[#145C38]">
        <div className="w-full lg:w-auto flex justify-between items-center px-8 lg:px-0 mb-6 lg:mb-0">
          {/* hamburger — opens the sidebar */}
          <div className="lg:hidden">
            <button onClick={openSidebar} aria-label="Open menu">
              <RxHamburgerMenu className="text-3xl font-bold" />
            </button>
          </div>

          {/* logo */}
          <Link href="/">
            <div className="flex gap-2 items-center">
              <div className="border-white xl:w-12 xl:h-12 w-10 h-10 rounded-full flex items-center justify-center bg-[#377456] lg:bg-green-600">
                <FaLeaf className="xl:w-7 xl:h-7 w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xl xl:text-3xl lg:text-2xl text-white lg:text-green-600 font-bold">
                  GOFRESH
                </p>
                <p className="text-xs xl:text-sm text-white lg:text-green-600">
                  BEST ORGANIC FOOD
                </p>
              </div>
            </div>
          </Link>

          {/* mobile user icon */}
          <div className="lg:hidden">
            <div className="group flex gap-2">
              <FaRegUser className="text-white group-hover:text-green-600 w-6 h-6 cursor-pointer transition duration-300" />
              <p className="text-green-900 group-hover:text-green-600 text-sm font-semibold cursor-pointer lg:pb-3 transition duration-200 hidden xl:block">
                LOGIN / REGISTER
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------- desktop search ---------------------- */}
        <div ref={wrapperRef} className="relative hidden lg:block">
          <div className="relative h-11 w-11/12 2xl:w-[935px] xl:w-[800px] lg:w-[600px] items-center rounded-full border-2 bg-[#f4f8f6] px-5 shadow-sm focus-within:border-green-600 transition duration-300 flex">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onKeyDown={(e) => {
  if (e.key === "Enter") handleSearch();
}}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
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
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200/60"
              >
                <RxCross2 className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={handleSearch}
            className="absolute -right-0.5 flex h-11 w-15 items-center justify-center rounded-r-full bg-green-600 text-white hover:bg-green-700 transition duration-300">
              <IoSearchSharp className="text-white h-5 w-5" />
            </button>
          </div>

          {/* ---------------------- dropdown results ---------------------- */}
          {open && hasQuery && (
            <div
              className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-y-auto overscroll-contain rounded-xl border border-gray-100 bg-white shadow-xl ${
                results.length === 0 ? "h-[280px]" : "max-h-[520px]"
              }`}
              style={{ width: "min(100%, 935px)" }}
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
                      const hasDiscount =
                        !!p.oldPrice && p.oldPrice > p.price;

                      return (
                        <li key={p.id}>
                          <Link
                            href={`/products/${p.slug}`}
                            onClick={handleClose}
                            className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50"
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

        {/* desktop user + cart */}
        <div className="flex gap-4">
          <div className="hidden lg:block">
            <div className="group flex gap-2">
              <FaRegUser className="text-green-900 group-hover:text-green-600 w-6 h-6 cursor-pointer transition duration-300" />
              <Link href="/login-reg">
                <p className="text-green-900 group-hover:text-green-600 text-sm font-semibold cursor-pointer lg:pb-3 transition duration-200 hidden xl:block">
                  LOGIN / REGISTER
                </p>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Link href="/cart">
              <FaShoppingBag className="text-green-900 hover:text-green-700 w-6 h-6 cursor-pointer transition duration-300" />
              <div className="absolute top-0 -right-2 h-4 w-4 bg-green-600 rounded-full flex items-center justify-center border-white border-2">
                <span className="text-xs">0</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* sidebar lives here — driven by the context */}
      <MobileSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}