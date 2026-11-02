"use client";

import Link from "next/link";
import { headerNav, socials } from "@/themes/grocery/components/data/data";
import { FaBolt } from "react-icons/fa6";


export default function TopNav() {
  return (
    <div className="hidden bg-green-900 text-white lg:block">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-5 px-4 py-2">
        {/* Left: nav links */}
        <nav className="flex items-center gap-5 text-sm font-bold tracking-widest">
          {headerNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.href === "/"
                  ? " text-amber-400"
                  : "text-white/80 transition hover:text-amber-400"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: socials + delivery badge */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 text-xs">
            {socials.map((s) => {
              const Iconfa = s.icon;
              return (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="text-white/70 transition hover:text-amber-400"
              >
                <Iconfa className="h-4 w-4" />
              </a>
            )})}
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
            <FaBolt className="fas fa-bolt text-amber-400" />
            Get The Fastest Delivery
          </span>
        </div>
      </div>
    </div>
  );
}