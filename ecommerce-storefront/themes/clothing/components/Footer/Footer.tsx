"use client";

import { useState } from "react";
import { FaTshirt } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa6";

/* ------------------------------ Link data ------------------------------ */

const shopLinks = [
  { label: "পুরুষ", href: "#" },
  { label: "মহিলা", href: "#" },
  { label: "শিশু", href: "#" },
  { label: "ফুটওয়্যার", href: "#" },
  { label: "ব্যাগ ও এক্সেসরিজ", href: "#" },
  { label: "অফার ও সেল", href: "#" },
];

const serviceLinks = [
  { label: "অর্ডার ট্র্যাক", href: "#" },
  { label: "ডেলিভারি তথ্য", href: "#" },
  { label: "রিটার্ন ও এক্সচেঞ্জ", href: "#" },
  { label: "সাইজ গাইড", href: "#" },
  { label: "প্রাইভেসি পলিসি", href: "#" },
  { label: "শর্তাবলী", href: "#" },
];

const companyLinks = [
  { label: "আমাদের সম্পর্কে", href: "#" },
  { label: "যোগাযোগ", href: "#" },
  { label: "ক্যারিয়ার", href: "#" },
  { label: "ব্লগ", href: "#" },
  { label: "স্টোর লোকেশন", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "TikTok", href: "#", icon: FaTiktok },
];

const paymentMethods = ["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "COD"];

/* ------------------------------ Component ------------------------------ */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 bg-stone-900 text-stone-300">
      {/* ================= Newsletter Strip ================= */}
      <div className="border-b border-stone-800 bg-stone-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-white md:text-xl">
              নতুন কালেকশনের খবর সবার আগে পান
            </h3>
            <p className="mt-1 text-sm text-stone-400">
              সাবস্ক্রাইব করুন এবং প্রথম অর্ডারে পান ১০% ছাড়।
            </p>
          </div>

          {subscribed ? (
            <p className="flex items-center gap-2 rounded-full bg-rose-600/15 px-5 py-3 text-sm font-semibold text-rose-400">
              ✓ ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="relative flex h-12 w-full items-center rounded-full border border-stone-700 bg-stone-900 px-5 md:w-[420px]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল দিন..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-stone-500"
              />
              <button
                type="submit"
                className="absolute -right-0.5 flex h-12 items-center gap-2 rounded-r-full bg-rose-600 px-5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                সাবস্ক্রাইব
                <FaArrowRight className="text-xs" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ================= Main Footer ================= */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600">
                <FaTshirt className="h-6 w-6 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-2xl font-bold tracking-wide text-white">
                  STYLEHUB
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
                  Fashion Store
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              বাংলাদেশের বিশ্বস্ত ফ্যাশন স্টোর। পুরুষ, মহিলা ও শিশুদের জন্য
              মানসম্মত পোশাক, জুতা ও এক্সেসরিজ — সব এক জায়গায়।
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:border-rose-600 hover:bg-rose-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              শপ
            </h4>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 transition hover:text-rose-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              কাস্টমার সার্ভিস
            </h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 transition hover:text-rose-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              কোম্পানি
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 transition hover:text-rose-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              যোগাযোগ
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-400">
              <li className="flex gap-2.5">
                <FaLocationDot className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <span>১২৩ ফ্যাশন এভিনিউ, ধানমন্ডি, ঢাকা ১২০৯</span>
              </li>
              <li className="flex gap-2.5">
                <FaPhone className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <a href="tel:+8801700000000" className="hover:text-rose-400">
                  +৮৮০ ১৭০০-০০০০০০
                </a>
              </li>
              <li className="flex gap-2.5">
                <FaEnvelope className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <a
                  href="mailto:support@stylehub.com"
                  className="hover:text-rose-400"
                >
                  support@stylehub.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <FaClock className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <span>শনি – বৃহস্পতি, সকাল ১০টা – রাত ৯টা</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= Bottom Bar ================= */}
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 md:flex-row md:justify-between">
          <p className="text-center text-xs text-stone-500 md:text-left">
            © {new Date().getFullYear()} STYLEHUB. সর্বস্বত্ব সংরক্ষিত।
          </p>

          {/* Payment badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-stone-700 bg-stone-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-300"
              >
                {method}
              </span>
            ))}
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 rounded-full border border-stone-700 px-3 py-1.5 text-xs font-semibold text-stone-300 transition hover:border-rose-600 hover:bg-rose-600 hover:text-white"
          >
            উপরে যান
            <FaArrowUp className="text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  );
}