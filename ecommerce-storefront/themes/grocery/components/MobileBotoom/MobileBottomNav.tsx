"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsMenuButtonWide } from "react-icons/bs";
import { FaBasketShopping, FaRegUser } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { useMobileNav } from "@/lib/context/MobileNavContext";

interface MobileBottomNavProps {
  cartCount?: number;
}

const ITEM_BASE =
  "relative flex h-full flex-1 flex-col items-center justify-center gap-1 py-2 " +
  "text-[11px] text-nav-muted transition-all duration-300 hover:text-primary";
const ITEM_ACTIVE = "text-green-600";

export default function MobileBottomNav({ cartCount = 0 }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { openSidebar, openSearch } = useMobileNav();
  const isActive = (href: string) => pathname === href;

  return (
    <nav
      id="mobileBottomNav"
      className="fixed bottom-0 left-0 z-10 hidden h-bottom-nav w-full items-center border-t border-gray-border bg-white shadow-bottom-nav max-[768px]:flex md:flex lg:hidden"
    >
      <Link
        href="/"
        className={`${ITEM_BASE} ${isActive("/") ? ITEM_ACTIVE : "text-gray-400"}`}
      >
        <IoMdHome className="text-[22px]" />
        <span>Home</span>
      </Link>

      {/* Menu — opens the sidebar */}
      <button
        type="button"
        onClick={openSidebar}
        aria-label="Open menu"
        className={`${ITEM_BASE} text-gray-400`}
      >
        <BsMenuButtonWide className="text-[19px]" />
        <span>Menu</span>
      </button>

      {/* Center cart button */}
      <Link
        href="/cart"
        aria-label="কার্ট"
        className={`${ITEM_BASE} -translate-y-8`}
      >
        <span className="absolute left-1/2 top-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-green-600 text-[22px] text-white shadow-lg shadow-center-btn">
          <FaBasketShopping className="text-xl text-white" />
        </span>
        <span className="absolute left-1/2 top-1/2 flex h-4 w-4 -translate-y-[28px] translate-x-[12px] items-center justify-center rounded-full border-2 border-white bg-red-500 text-[9px] leading-none text-white">
          {cartCount}
        </span>
      </Link>

      {/* Search — opens the mobile search bar */}
      <button
        type="button"
        onClick={openSearch}
        aria-label="Open search"
        className={`${ITEM_BASE} text-gray-400`}
      >
        <RiSearchLine className="text-[19px]" />
        <span>Search</span>
      </button>

      <Link
        href="/login-reg"
        className={`${ITEM_BASE} ${isActive("/login-reg") ? ITEM_ACTIVE : "text-gray-400"}`}
      >
        <FaRegUser className="text-[19px]" />
        <span>Login</span>
      </Link>
    </nav>
  );
}