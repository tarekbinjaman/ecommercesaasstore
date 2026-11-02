"use client";

import Link from "next/link";
import { FaTruckFast, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

const topNavLinks = [
  { label: "নতুন কালেকশন", href: "/offers/new" },
  { label: "অফার", href: "/offers" },
  { label: "ট্র্যাক অর্ডার", href: "/track" },
  { label: "যোগাযোগ", href: "/contact" },
];

const socials = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
];

export default function TopNav() {
  return (
    <div className="hidden bg-stone-900 text-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-2">
        <nav className="flex items-center gap-5 text-xs font-semibold tracking-wider">
          {topNavLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white/80 transition hover:text-rose-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-white/70 transition hover:text-rose-400"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <FaTruckFast className="text-rose-400" />
            সারা দেশে ফ্রি ডেলিভারি
          </span>
        </div>
      </div>
    </div>
  );
}