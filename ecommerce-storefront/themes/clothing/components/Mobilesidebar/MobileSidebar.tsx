"use client";

import { useEffect, useState } from "react";
import { FaPhoneAlt, FaRegHeart, FaUserCircle } from "react-icons/fa";
import {
  FaArrowRight,
  FaBaby,
  FaBagShopping,
  FaChild,
  FaCircle,
  FaCircleInfo,
  FaCrown,
  FaGem,
  FaGift,
  FaGlasses,
  FaHatCowboy,
  FaPercent,
  FaPerson,
  FaPersonDress,
  FaRing,
  FaShoePrints,
  FaShirt,
  FaSocks,
  FaStore,
  FaTableCellsLarge,
  FaTags,
  FaTruckFast,
  FaVest,
} from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { SlArrowDown } from "react-icons/sl";
import { MdHome } from "react-icons/md";
import { IconType } from "react-icons";

type Category = {
  id: string;
  name: string;
  icon: IconType;
  badge?: string;
  children?: Category[];
};

const categories: Category[] = [
  {
    id: "men",
    name: "পুরুষ",
    icon: FaPerson,
    children: [
      {
        id: "men-shirts",
        name: "শার্ট",
        icon: FaShirt,
        children: [
          { id: "casual-shirt", name: "ক্যাজুয়াল শার্ট", icon: FaShirt },
          { id: "formal-shirt", name: "ফর্মাল শার্ট", icon: FaShirt },
          { id: "check-shirt", name: "চেক শার্ট", icon: FaShirt },
        ],
      },
      {
        id: "men-tshirt",
        name: "টি-শার্ট",
        icon: FaShirt,
        children: [
          { id: "half-sleeve", name: "হাফ স্লিভ", icon: FaShirt },
          { id: "full-sleeve", name: "ফুল স্লিভ", icon: FaShirt },
          { id: "polo", name: "পোলো টি-শার্ট", icon: FaShirt },
        ],
      },
      {
        id: "men-pants",
        name: "প্যান্ট",
        icon: FaPerson,
        children: [
          { id: "jeans", name: "জিন্স", icon: FaPerson },
          { id: "chino", name: "চিনো প্যান্ট", icon: FaPerson },
          { id: "formal-pant", name: "ফর্মাল প্যান্ট", icon: FaPerson },
        ],
      },
      {
        id: "panjabi",
        name: "পাঞ্জাবি ও কুর্তা",
        icon: FaVest,
        children: [
          { id: "cotton-panjabi", name: "কটন পাঞ্জাবি", icon: FaVest },
          { id: "embroidery-panjabi", name: "এমব্রয়ডারি পাঞ্জাবি", icon: FaVest },
          { id: "kurta", name: "কুর্তা", icon: FaVest },
        ],
      },
    ],
  },

  {
    id: "women",
    name: "মহিলা",
    icon: FaPersonDress,
    children: [
      {
        id: "saree",
        name: "শাড়ি",
        icon: FaPersonDress,
        children: [
          { id: "cotton-saree", name: "সুতি শাড়ি", icon: FaPersonDress },
          { id: "silk-saree", name: "সিল্ক শাড়ি", icon: FaPersonDress },
          { id: "jamdani", name: "জামদানি শাড়ি", icon: FaPersonDress },
        ],
      },
      {
        id: "three-piece",
        name: "থ্রি-পিস",
        icon: FaPersonDress,
        children: [
          { id: "unstitched", name: "আনস্টিচড", icon: FaPersonDress },
          { id: "ready-three-piece", name: "রেডি থ্রি-পিস", icon: FaPersonDress },
        ],
      },
      {
        id: "kurti-tops",
        name: "কুর্তি ও টপস",
        icon: FaPersonDress,
        children: [
          { id: "kurti", name: "কুর্তি", icon: FaPersonDress },
          { id: "tops", name: "টপস", icon: FaPersonDress },
          { id: "tunic", name: "টিউনিক", icon: FaPersonDress },
        ],
      },
      {
        id: "western",
        name: "ওয়েস্টার্ন",
        icon: FaPersonDress,
        children: [
          { id: "western-tops", name: "টপস", icon: FaPersonDress },
          { id: "western-jeans", name: "জিন্স", icon: FaPersonDress },
          { id: "skirt", name: "স্কার্ট", icon: FaPersonDress },
        ],
      },
    ],
  },

  {
    id: "kids",
    name: "শিশু",
    icon: FaChild,
    children: [
      { id: "boys", name: "ছেলেদের পোশাক", icon: FaChild },
      { id: "girls", name: "মেয়েদের পোশাক", icon: FaChild },
      { id: "baby", name: "বেবি পোশাক", icon: FaBaby },
      { id: "school-dress", name: "স্কুল ড্রেস", icon: FaChild },
    ],
  },

  {
    id: "footwear",
    name: "ফুটওয়্যার",
    icon: FaShoePrints,
    children: [
      { id: "sneakers", name: "স্নিকার্স", icon: FaShoePrints },
      { id: "sandals", name: "স্যান্ডেল ও স্লিপার", icon: FaShoePrints },
      { id: "formal-shoes", name: "ফর্মাল শু", icon: FaShoePrints },
      { id: "heels", name: "হিলস ও পাম্পস", icon: FaShoePrints },
      { id: "socks", name: "মোজা", icon: FaSocks },
    ],
  },

  {
    id: "accessories",
    name: "ব্যাগ ও এক্সেসরিজ",
    icon: FaBagShopping,
    children: [
      {
        id: "bags",
        name: "ব্যাগ",
        icon: FaBagShopping,
        children: [
          { id: "handbag", name: "হ্যান্ডব্যাগ", icon: FaBagShopping },
          { id: "backpack", name: "ব্যাকপ্যাক", icon: FaBagShopping },
          { id: "laptop-bag", name: "ল্যাপটপ ব্যাগ", icon: FaBagShopping },
        ],
      },
      {
        id: "jewellery",
        name: "জুয়েলারি",
        icon: FaGem,
        children: [
          { id: "necklace", name: "নেকলেস", icon: FaGem },
          { id: "ring", name: "রিং", icon: FaRing },
          { id: "earring", name: "ইয়াররিং", icon: FaGem },
        ],
      },
    ],
  },

  {
    id: "sports",
    name: "স্পোর্টস",
    icon: FaShirt,
    children: [
      { id: "sports-tshirt", name: "স্পোর্টস টি-শার্ট", icon: FaShirt },
      { id: "track-pant", name: "ট্র্যাক প্যান্ট", icon: FaPerson },
      { id: "gym-shoes", name: "জিম শু", icon: FaShoePrints },
    ],
  },

  {
    id: "offers",
    name: "অফার ও সেল",
    icon: FaPercent,
    badge: "HOT",
    children: [
      { id: "new-arrivals", name: "নতুন কালেকশন", icon: FaGift },
      { id: "discount", name: "ছাড়ের পোশাক", icon: FaTags },
      { id: "combo", name: "কম্বো অফার", icon: FaTags },
      { id: "eid-collection", name: "ঈদ কালেকশন", icon: FaCrown },
    ],
  },
];

type CategoryItemProps = {
  category: Category;
  level?: number;
  openCategories: string[];
  toggleCategory: (id: string) => void;
};

function CategoryItem({
  category,
  level = 0,
  openCategories,
  toggleCategory,
}: CategoryItemProps) {
  const hasChildren = category.children && category.children.length > 0;
  const isOpen = openCategories.includes(category.id);

  /* ---------------- Leaf item ---------------- */
  if (!hasChildren) {
    return (
      <a
        href="#"
        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 transition
                   hover:bg-stone-50 hover:text-rose-600"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
        <span>{category.name}</span>
      </a>
    );
  }

  const CategoryIcon = category.icon;

  return (
    <div className="w-11/12 mx-auto">
      <button
        type="button"
        onClick={() => toggleCategory(category.id)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left transition-all duration-300
          ${
            level === 0
              ? "mb-0.5 border-l-4 border-stone-900 bg-stone-50 font-bold text-stone-900 hover:bg-stone-100 active:bg-stone-200"
              : level === 1
                ? "pl-7 text-sm text-stone-700 hover:bg-stone-50"
                : "pl-10 text-sm text-stone-600 hover:bg-stone-50"
          }`}
      >
        <div className={`flex items-center gap-3 ${level === 0 ? "text-lg" : ""}`}>
          <span className={level === 0 ? "text-rose-600" : "text-stone-500"}>
            <CategoryIcon />
          </span>

          <span>{category.name}</span>

          {category.badge && (
            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
              {category.badge}
            </span>
          )}
        </div>

        <span
          className={`text-xs text-stone-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <SlArrowDown className="text-lg font-bold" />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {category.children?.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id],
    );
  };

  /* Escape to close + lock body scroll */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[320px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-stone-900 px-4 py-4 text-white">
          <div className="flex items-center gap-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl">
              <FaUserCircle className="h-full w-full" />
            </div>

            <div>
              <p className="text-base text-stone-300">স্বাগতম!</p>
              <a href="#" className="text-sm font-semibold underline">
                লগইন / রেজিস্টার
              </a>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition hover:bg-white/20"
          >
            <ImCross className="font-bold" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories */}
          <section>
            <div className="mb-3 border-b-2 border-stone-200 px-4 py-4">
              <div className="flex items-center gap-2">
                <FaTableCellsLarge className="font-bold text-rose-600" />
                <h3 className="text-lg font-semibold text-stone-900">
                  পোশাকের ক্যাটাগরি
                </h3>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  openCategories={openCategories}
                  toggleCategory={toggleCategory}
                />
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section className="mt-4 border-t border-stone-200">
            <div className="px-4 py-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
                <span className="text-rose-600">🔗</span>
                কুইক লিংক
              </h3>
            </div>

            <nav className="divide-y divide-stone-200 pb-6">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <MdHome className="h-5 w-5 text-stone-800" />
                <span className="text-base">হোম</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <FaStore className="h-5 w-5 text-stone-800" />
                <span className="text-base">শপ</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <FaTags className="h-5 w-5 text-stone-800" />
                <span className="text-base">নতুন কালেকশন</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <FaRegHeart className="h-5 w-5 text-stone-800" />
                <span className="text-base">উইশলিস্ট</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <FaTruckFast className="h-5 w-5 text-stone-800" />
                <span className="text-base">অর্ডার ট্র্যাক</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <FaCircleInfo className="h-5 w-5 text-stone-800" />
                <span className="text-base">আমাদের সম্পর্কে</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-stone-600 transition hover:bg-stone-50 hover:text-rose-600"
              >
                <FaPhoneAlt className="h-5 w-5 text-stone-800" />
                <span className="text-base">কন্টাক্ট আস</span>
              </a>
            </nav>
          </section>

          {/* Promo card */}
          <div className="mx-4 mb-6 rounded-xl bg-stone-900 p-4 text-white">
            <p className="text-sm font-semibold">ঈদ কালেকশন ২০২৫</p>
            <p className="mt-1 text-xs text-stone-300">
              নতুন ডিজাইনে সর্বোচ্চ ৪০% ছাড়
            </p>
            <a
              href="#"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300"
            >
              এখনই দেখুন <FaArrowRight className="text-[10px]" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}