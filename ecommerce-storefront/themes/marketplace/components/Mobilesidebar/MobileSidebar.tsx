"use client";

import { useState } from "react";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import {
  FaBagShopping,
  FaCircle,
  FaCircleInfo,
  FaDrumstickBite,
  FaOilCan,
  FaPepperHot,
  FaStore,
  FaTableCellsLarge,
  FaWheatAwn,
} from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { SlArrowDown } from "react-icons/sl";
import {
  FaShoppingBasket,
  FaMugHot,
  FaCookie,
  FaCheese,
  FaSeedling,
  FaCarrot,
  FaFish,
  FaCookieBite,
  FaShoppingBag,
  FaIceCream,
} from "react-icons/fa";
import {
  FaAppleWhole,
  FaBottleDroplet,
  FaBottleWater,
  FaCow,
  FaGlassWater,
  FaJar,
} from "react-icons/fa6";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LuMilk } from "react-icons/lu";
import { MdHome } from "react-icons/md";
import { IconType } from "react-icons";
type Category = {
  id: string;
  name: string;
  icon: IconType;
  children?: Category[];
};
const categories = [
  {
    id: "food",
    name: "খাদ্য ও মুদি",
    icon: FaShoppingBasket,
    children: [
      {
        id: "honey-nuts",
        name: "মধু ও বাদাম",
        icon: FaJar,
        children: [
          { id: "pure-honey", name: "খাঁটি মধু", icon: FaJar },
          { id: "almond", name: "কাঠ বাদাম", icon: FaJar },
          { id: "pistachio", name: "পেস্তা বাদাম", icon: FaJar },
          { id: "cashew", name: "কাজু বাদাম", icon: FaJar },
        ],
      },
      {
        id: "ghee-yogurt",
        name: "ঘী ও দই",
        icon: FaCheese,
        children: [
          { id: "pure-ghee", name: "খাঁটি ঘী", icon: FaCheese },
          { id: "sour-yogurt", name: "টক দই", icon: FaCheese },
          { id: "sweet-yogurt", name: "মিষ্টি দই", icon: FaCheese },
        ],
      },
      {
        id: "dates",
        name: "খেজুর",
        icon: FaSeedling,
        children: [
          { id: "medjool", name: "মেডজুল খেজুর", icon: FaSeedling },
          { id: "ajwa", name: "আজওয়া খেজুর", icon: FaSeedling },
          { id: "dabbas", name: "দাব্বাস খেজুর", icon: FaSeedling },
        ],
      },
      {
        id: "mustard-oil",
        name: "সরিষার তেল",
        icon: FaBottleDroplet,
        children: [
          {
            id: "pure-mustard-oil",
            name: "খাঁটি সরিষার তেল",
            icon: FaBottleDroplet,
          },
          { id: "ghani-oil", name: "ঘানি ভাঙা তেল", icon: FaBottleDroplet },
        ],
      },
      {
        id: "grocery",
        name: "গ্রোসারি",
        icon: FaShoppingBasket,
        children: [
          {
            id: "rice-lentils",
            name: "চাল-ডাল",
            icon: FaWheatAwn,
            children: [
              {
                id: "chinigura-rice",
                name: "চিনিগুঁড়া চাল",
                icon: FaWheatAwn,
              },
              { id: "masoor-dal", name: "মসুর ডাল", icon: FaWheatAwn },
              { id: "chola-dal", name: "ছোলার ডাল", icon: FaWheatAwn },
            ],
          },
          {
            id: "spices",
            name: "মসলা",
            icon: FaPepperHot,
            children: [
              { id: "turmeric", name: "হলুদ গুঁড়া", icon: FaPepperHot },
              { id: "chili", name: "মরিচ গুঁড়া", icon: FaPepperHot },
              { id: "cumin", name: "জিরা গুঁড়া", icon: FaPepperHot },
            ],
          },
          {
            id: "oil-sugar",
            name: "তেল-চিনি",
            icon: FaOilCan,
            children: [
              { id: "soybean-oil", name: "সয়াবিন তেল", icon: FaOilCan },
              { id: "sugar", name: "চিনি", icon: FaOilCan },
              { id: "salt", name: "লবণ", icon: FaOilCan },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "fresh",
    name: "তাজা পণ্য",
    icon: FaAppleWhole,
    children: [
      {
        id: "fruits",
        name: "ফল",
        icon: FaAppleWhole,
        children: [
          { id: "mango", name: "আম", icon: FaAppleWhole },
          { id: "banana", name: "কলা", icon: FaAppleWhole },
          { id: "apple", name: "আপেল", icon: FaAppleWhole },
          { id: "orange", name: "কমলা", icon: FaAppleWhole },
          { id: "guava", name: "পেয়ারা", icon: FaAppleWhole },
        ],
      },
      {
        id: "vegetables",
        name: "সবজি",
        icon: FaCarrot,
        children: [
          { id: "tomato", name: "টমেটো", icon: FaCarrot },
          { id: "potato", name: "আলু", icon: FaCarrot },
          { id: "onion", name: "পেঁয়াজ", icon: FaCarrot },
          { id: "eggplant", name: "বেগুন", icon: FaCarrot },
          { id: "cucumber", name: "শসা", icon: FaCarrot },
        ],
      },
      {
        id: "fish-meat",
        name: "মাছ ও মাংস",
        icon: FaFish,
        children: [
          {
            id: "country-chicken",
            name: "দেশি মুরগি",
            icon: FaDrumstickBite,
            children: [
              {
                id: "whole-chicken",
                name: "পূর্ণ মুরগি",
                icon: FaDrumstickBite,
              },
              {
                id: "chicken-breast",
                name: "মুরগির বুক",
                icon: FaDrumstickBite,
              },
              { id: "chicken-leg", name: "মুরগির রান", icon: FaDrumstickBite },
            ],
          },
          {
            id: "beef",
            name: "গরুর মাংস",
            icon: FaCow,
            children: [
              { id: "beef-meat", name: "গরুর গোশত", icon: FaCow },
              { id: "beef-liver", name: "গরুর কলিজা", icon: FaCow },
            ],
          },
          {
            id: "fish",
            name: "মাছ",
            icon: FaFish,
            children: [
              { id: "rui", name: "রুই মাছ", icon: FaFish },
              { id: "katla", name: "কাতল মাছ", icon: FaFish },
              { id: "hilsha", name: "ইলিশ মাছ", icon: FaFish },
              { id: "shrimp", name: "চিংড়ি", icon: FaFish },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "drinks",
    name: "পানীয়",
    icon: FaMugHot,
    children: [
      {
        id: "juice",
        name: "জুস",
        icon: FaGlassWater,
        children: [
          {
            id: "fruit-juice",
            name: "ফলের জুস",
            icon: FaAppleWhole,
            children: [
              { id: "mango-juice", name: "আম জুস", icon: FaAppleWhole },
              { id: "orange-juice", name: "কমলা জুস", icon: FaAppleWhole },
              { id: "pineapple-juice", name: "আনারস জুস", icon: FaAppleWhole },
              {
                id: "mixed-juice",
                name: "মিক্সড ফ্রুট জুস",
                icon: FaAppleWhole,
              },
            ],
          },
          {
            id: "veg-juice",
            name: "সবজির জুস",
            icon: FaCarrot,
            children: [
              { id: "carrot-juice", name: "গাজরের জুস", icon: FaCarrot },
              { id: "tomato-juice", name: "টমেটোর জুস", icon: FaCarrot },
            ],
          },
        ],
      },
      {
        id: "tea-coffee",
        name: "চা ও কফি",
        icon: FaMugHot,
        children: [
          { id: "green-tea", name: "গ্রিন টি", icon: FaMugHot },
          { id: "black-tea", name: "ব্ল্যাক টি", icon: FaMugHot },
          { id: "masala-tea", name: "মসলা চা", icon: FaMugHot },
          { id: "coffee-bean", name: "কফি বিন", icon: FaMugHot },
          { id: "instant-coffee", name: "ইনস্ট্যান্ট কফি", icon: FaMugHot },
        ],
      },
      {
        id: "soft-drinks",
        name: "কোমল পানীয়",
        icon: FaBottleWater,
        children: [
          { id: "mineral-water", name: "মিনারেল ওয়াটার", icon: FaBottleWater },
          {
            id: "sparkling-water",
            name: "স্পার্কলিং ওয়াটার",
            icon: FaBottleWater,
          },
          { id: "cold-drinks", name: "কোল্ড ড্রিংকস", icon: FaBottleWater },
          { id: "energy-drink", name: "এনার্জি ড্রিংক", icon: FaBottleWater },
        ],
      },
    ],
  },

  {
    id: "snacks",
    name: "স্ন্যাকস",
    icon: FaCookie,
    children: [
      {
        id: "biscuits",
        name: "বিস্কুট",
        icon: FaCookieBite,
        children: [
          { id: "sweet-biscuit", name: "মিষ্টি বিস্কুট", icon: FaCookieBite },
          { id: "salty-biscuit", name: "নোনতা বিস্কুট", icon: FaCookieBite },
          { id: "digestive", name: "ডাইজেস্টিভ বিস্কুট", icon: FaCookieBite },
          { id: "cream-biscuit", name: "ক্রিম বিস্কুট", icon: FaCookieBite },
        ],
      },
      {
        id: "chips",
        name: "চিপস",
        icon: FaShoppingBag,
        children: [
          { id: "potato-chips", name: "আলুর চিপস", icon: FaShoppingBag },
          { id: "banana-chips", name: "কলার চিপস", icon: FaShoppingBag },
          { id: "corn-chips", name: "কর্ন চিপস", icon: FaShoppingBag },
        ],
      },
      {
        id: "nuts",
        name: "বাদাম",
        icon: FaJar,
        children: [
          { id: "snack-almond", name: "কাঠ বাদাম", icon: FaJar },
          { id: "snack-cashew", name: "কাজু বাদাম", icon: FaJar },
          { id: "snack-pistachio", name: "পেস্তা বাদাম", icon: FaJar },
          { id: "mixed-nuts", name: "মিক্সড বাদাম", icon: FaJar },
        ],
      },
    ],
  },

  {
    id: "dairy",
    name: "দুগ্ধজাত",
    icon: FaCow,
    children: [
      {
        id: "milk",
        name: "দুধ",
        icon: LuMilk,
        children: [
          { id: "liquid-milk", name: "তরল দুধ", icon: LuMilk },
          { id: "milk-powder", name: "গুঁড়া দুধ", icon: LuMilk },
          { id: "condensed-milk", name: "কনডেন্সড মিল্ক", icon: LuMilk },
        ],
      },
      {
        id: "cheese",
        name: "পনির",
        icon: FaCheese,
        children: [
          { id: "cheddar", name: "চেডার পনির", icon: FaCheese },
          { id: "mozzarella", name: "মোজারেলা পনির", icon: FaCheese },
          { id: "cream-cheese", name: "ক্রিম পনির", icon: FaCheese },
        ],
      },
      {
        id: "desserts",
        name: "মিষ্টান্ন",
        icon: FaIceCream,
        children: [
          { id: "ice-cream", name: "আইসক্রিম", icon: FaIceCream },
          { id: "yogurt", name: "দই", icon: FaIceCream },
          { id: "pudding", name: "পুডিং", icon: FaIceCream },
        ],
      },
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

  if (!hasChildren) {
    return (
      <a
        href="#"
        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-700"
      >
        <span className="text-xs text-gray-400">{category.icon}</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 text-green-400">
            <FaCircle className="h-full w-full" />
          </div>
          <span>{category.name}</span>
        </div>
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
              ? "font-bold text-gray-800 hover:bg-green-50 bg-[#F9FBE7] border-l-green-500 border-l-4 mb-0.5 active:bg-[#eff1dc]"
              : level === 1
                ? "pl-7 text-sm text-gray-700 hover:bg-gray-50"
                : "pl-10 text-sm text-gray-600 hover:bg-gray-50"
          }`}
      >
        <div className="flex items-center gap-3 text-lg">
          <div className="text-green-600">
            <CategoryIcon />
          </div>
          <span className="text-green-900">{category.name}</span>
        </div>

        <span
          className={`text-xs text-gray-500 transition-transform duration-200 ${
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
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#1A9D5B] px-4 py-4 text-white">
          <div className="flex items-center gap-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl">
              <FaUserCircle className="h-full w-full" />
            </div>

            <div>
              <p className="text-lg">স্বাগতম!</p>

              <a href="#" className="text-md font-medium underline">
                লগইন / রেজিস্টার
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition hover:bg-white/20"
          >
            <ImCross className="font-bold" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories */}
          <section>
            <div className="border-b-3 border-gray-200 px-4 py-4 mb-3">
              <div className="flex items-center gap-2">
                <FaTableCellsLarge className="text-green-700 font-bold" />
                <h3 className="text-lg font-semibold text-green-800">
                  প্রোডাক্ট ক্যাটাগরি
                </h3>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
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
          <section className="mt-4 border-t border-gray-200">
            <div className="px-4 py-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-xl">
                <span className="text-green-600">🔗</span>
                কুইক লিংক
              </h3>
            </div>

            <nav className="divide-y divide-gray-200 pb-6">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
              >
                <div className="h-8 w-8">
                  <MdHome className="text-green-600 h-full w-full" />
                </div>
                <span className="text-xl">হোম</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
              >
                <div className="h-6 w-6 mr-2">
                  <FaStore className="text-green-600 h-full w-full" />
                </div>
                <span className="text-xl">শপ</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
              >
                <div className="h-6 w-6 mr-2">
                  <FaCircleInfo className="text-green-600 h-full w-full" />
                </div>
                <span className="text-xl">আমাদের সম্পর্কে</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
              >
                <div className="h-6 w-6 mr-2">
                  <FaPhoneAlt className="text-green-600 h-full w-full" />
                </div>
                <span className="text-xl">কন্টাক্ট আস</span>
              </a>
            </nav>
          </section>
        </div>
      </aside>
    </>
  );
}
