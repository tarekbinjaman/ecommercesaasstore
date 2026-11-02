"use client";

import { useState } from "react";
import { FaTshirt, FaRegUser, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { ChevronDown } from "lucide-react";
import MobileSidebar from "../Mobilesidebar/MobileSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../../hooks/useCart";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "হোম", href: "/" },
  { label: "ফ্যাশন", href: "/categories/fashion" },
  { label: "অ্যাক্সেসরিজ", href: "/categories/accessories" },
  { label: "ইলেকট্রনিক্স", href: "/categories/electronics" },
  { label: "বিউটি", href: "/categories/beauty" },
  { label: "হোম ও লিভিং", href: "/categories/homes" },
  { label: "স্পোর্টস", href: "/categories/sports" },
];

export function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathName = usePathname();
  const isProductsPage = pathName.startsWith('/products')
  const { count } = useCart();
  const cartCount = count > 99 ? "99+" : count;
  const cartLabel = `Cart, ${count} ${count === 1 ? "item" : "items"}`;

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
        {/* ================= Mobile Top Bar ================= */}
        <div className="flex items-center justify-between bg-stone-900 px-4 py-3 text-white lg:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
          >
            <RxHamburgerMenu className="text-2xl font-bold" />
          </button>

          <a href="#" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600">
              <FaTshirt className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-wide">STYLEHUB</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-300">
                Fashion Store
              </p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="Wishlist" className="relative">
              <FaRegHeart className="h-5 w-5 transition hover:text-rose-400" />
            </a>
            <Link href="/cart" aria-label={cartLabel} className="relative">
              <FaShoppingBag className="h-5 w-5 transition hover:text-rose-400" />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-0.5 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="bg-stone-900 px-4 pb-4 lg:hidden">
          <div className="relative flex h-11 w-full items-center rounded-full border border-stone-700 bg-white px-4">
            <input
              type="text"
              placeholder="পোশাক খুঁজুন..."
              className="flex-1 bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
            />
            <button
              type="button"
              aria-label="Search"
              className="absolute right-0 flex h-11 w-12 items-center justify-center rounded-r-full bg-rose-600 text-white transition hover:bg-rose-700"
            >
              <IoSearchSharp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ================= Desktop Header ================= */}
        <div className="hidden lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600">
                <FaTshirt className="h-6 w-6 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-2xl font-bold tracking-wide text-stone-900">
                  STYLEHUB
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
                  Fashion Store
                </p>
              </div>
            </Link>

            {/* Search */}
            <div className="relative flex h-11 flex-1 items-center rounded-full border-2 border-stone-200 bg-stone-50 px-5 transition focus-within:border-rose-500">
              <input
                type="text"
                placeholder="পোশাক, ব্র্যান্ড বা ক্যাটাগরি খুঁজুন..."
                className="flex-1 bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute -right-0.5 flex h-11 w-14 items-center justify-center rounded-r-full bg-rose-600 text-white transition hover:bg-rose-700"
              >
                <IoSearchSharp className="h-5 w-5" />
              </button>
            </div>

            {/* Desktop Icons */}
            <div className="flex shrink-0 items-center gap-5">
              <a
                href="#"
                className="group flex items-center gap-2 text-stone-700 transition hover:text-rose-600"
              >
                <FaRegUser className="h-5 w-5" />
                <span className="text-sm font-semibold">লগইন / রেজিস্টার</span>
              </a>

              <a
                href="#"
                aria-label="Wishlist"
                className="relative text-stone-700 transition hover:text-rose-600"
              >
                <FaRegHeart className="h-6 w-6" />
              </a>

              <Link
                href="/cart"
                aria-label={cartLabel}
                className="relative text-stone-700 transition hover:text-rose-600"
              >
                <FaShoppingBag className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-600 px-0.5 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* ============ Desktop Navigation with Hover Dropdown ============ */}
          {
            !isProductsPage  &&
          <nav className="border-t border-stone-100 bg-white">
            <div className="mx-auto flex max-w-7xl justify-center items-center gap-8 px-6">
              {navLinks.map((link) => (
                <div key={link.label} className="group relative">
                  {/* Parent link */}
                  <a
                    href={link.href}
                    className="flex items-center gap-1 border-b-2 border-transparent py-3 text-sm font-semibold text-stone-700 transition group-hover:border-rose-600 group-hover:text-rose-600"
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>

                  {/* Dropdown */}
                  {link.children && (
                    <div
                      className="invisible absolute left-0 top-full z-40 opacity-0 transition-opacity duration-200 
                                 group-hover:visible group-hover:opacity-100 
                                 group-focus-within:visible group-focus-within:opacity-100"
                    >
                      {/* pt-1 keeps the hover area continuous (no flicker) */}
                      <div className="pt-1">
                        <div className="min-w-[210px] rounded-b-xl border border-t-0 border-stone-100 bg-white py-2 shadow-xl">
                          {link.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/products"
                className="rounded-full bg-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-rose-600"
              >
                Shop
              </Link>
            </div>
          </nav>
          }
        </div>
      </header>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
}