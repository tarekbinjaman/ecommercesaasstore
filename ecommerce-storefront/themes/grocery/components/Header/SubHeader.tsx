"use client";

import { useState } from "react";
import { FaShoppingBasket, FaMugHot, FaCookie, FaCheese, FaSeedling, FaCarrot, FaFish, FaCookieBite, FaShoppingBag, FaIceCream  } from "react-icons/fa";
import { FaAppleWhole, FaBottleDroplet, FaBottleWater, FaCow, FaGlassWater, FaJar  } from "react-icons/fa6";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LuMilk } from "react-icons/lu";

const categories = [
  // ============================================
  // 1. খাদ্য ও মুদি
  // ============================================
  {
    name: "খাদ্য ও মুদি",
    icon: FaShoppingBasket,
    columns: [
      {
        title: "মধু ও বাদাম",
        icon: FaJar,
        items: ["খাঁটি মধু", "কাঠ বাদাম", "পেস্তা বাদাম", "কাজু বাদাম"],
      },
      {
        title: "ঘী ও দই",
        icon: FaCheese,
        items: ["খাঁটি ঘী", "টক দই", "মিষ্টি দই"],
      },
      {
        title: "খেজুর",
        icon: FaSeedling,
        items: ["মেডজুল খেজুর", "আজওয়া খেজুর", "দাব্বাস খেজুর"],
      },
      {
        title: "সরিষার তেল",
        icon: FaBottleDroplet,
        items: ["খাঁটি সরিষার তেল", "ঘানি ভাঙা তেল"],
      },
      {
        title: "গ্রোসারি",
        icon: FaShoppingBasket,
        subCategories: [
          {
            title: "চাল-ডাল",
            icon: FaShoppingBasket,
            items: ["চিনিগুঁড়া চাল", "মসুর ডাল", "ছোলার ডাল"],
          },
          {
            title: "মসলা",
            icon: FaShoppingBasket,
            items: ["হলুদ গুঁড়া", "মরিচ গুঁড়া", "জিরা গুঁড়া"],
          },
          {
            title: "তেল-চিনি",
            icon: FaShoppingBasket,
            items: ["সয়াবিন তেল", "চিনি", "লবণ"],
          },
        ],
      },
    ],
  },

  // ============================================
  // 2. তাজা পণ্য
  // ============================================
  {
    name: "তাজা পণ্য",
    icon: FaAppleWhole,
    columns: [
      {
        title: "ফল",
        icon: FaAppleWhole,
        items: ["আম", "কলা", "আপেল", "কমলা", "পেয়ারা"],
      },
      {
        title: "সবজি",
        icon: FaCarrot,
        items: ["টমেটো", "আলু", "পেঁয়াজ", "বেগুন", "শসা"],
      },
      {
        title: "মাছ ও মাংস",
        icon: FaFish,
        subCategories: [
          {
            title: "দেশি মুরগি",
            icon: FaShoppingBasket,
            items: ["পূর্ণ মুরগি", "মুরগির বুক", "মুরগির রান"],
          },
          {
            title: "গরুর মাংস",
            icon: FaShoppingBasket,
            items: ["গরুর গোশত", "গরুর কলিজা"],
          },
          {
            title: "মাছ",
            icon: FaShoppingBasket,
            items: ["রুই মাছ", "কাতল মাছ", "ইলিশ মাছ", "চিংড়ি"],
          },
        ],
      },
    ],
  },

  // ============================================
  // 3. পানীয়
  // ============================================
  {
    name: "পানীয়",
    icon: FaMugHot,
    columns: [
      {
        title: "জুস",
        icon: FaGlassWater,
        subCategories: [
          {
            title: "ফলের জুস",
            icon: FaShoppingBasket,
            items: ["আম জুস", "কমলা জুস", "আনারস জুস", "মিক্সড ফ্রুট জুস"],
          },
          {
            title: "সবজির জুস",
            icon: FaShoppingBasket,
            items: ["গাজরের জুস", "টমেটোর জুস"],
          },
        ],
      },
      {
        title: "চা ও কফি",
        icon: FaMugHot,
        items: [
          "গ্রিন টি",
          "ব্ল্যাক টি",
          "মসলা চা",
          "কফি বিন",
          "ইনস্ট্যান্ট কফি",
        ],
      },
      {
        title: "কোমল পানীয়",
        icon: FaBottleWater,
        items: [
          "মিনারেল ওয়াটার",
          "স্পার্কলিং ওয়াটার",
          "কোল্ড ড্রিংকস",
          "এনার্জি ড্রিংক",
        ],
      },
    ],
  },

  // ============================================
  // 4. স্ন্যাকস
  // ============================================
  {
    name: "স্ন্যাকস",
    icon: FaCookie ,
    columns: [
      {
        title: "বিস্কুট",
        icon: FaCookieBite,
        items: [
          "মিষ্টি বিস্কুট",
          "নোনতা বিস্কুট",
          "ডাইজেস্টিভ বিস্কুট",
          "ক্রিম বিস্কুট",
        ],
      },
      {
        title: "চিপস",
        icon: FaShoppingBag,
        items: ["আলুর চিপস", "কলার চিপস", "কর্ন চিপস"],
      },
      {
        title: "বাদাম",
        icon: FaJar,
        items: ["কাঠ বাদাম", "কাজু বাদাম", "পেস্তা বাদাম", "মিক্সড বাদাম"],
      },
    ],
  },

  // ============================================
  // 5. দুগ্ধজাত
  // ============================================
  {
    name: "দুগ্ধজাত",
    icon: FaCow,
    columns: [
      {
        title: "দুধ",
        icon: LuMilk,
        items: ["তরল দুধ", "গুঁড়া দুধ", "কনডেন্সড মিল্ক"],
      },
      {
        title: "পনির",
        icon: FaCheese,
        items: ["চেডার পনির", "মোজারেলা পনির", "ক্রিম পনির"],
      },
      {
        title: "মিষ্টান্ন",
        icon: FaIceCream,
        items: ["আইসক্রিম", "দই", "পুডিং"],
      },
    ],
  },
];

export default function SubHeader() {
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);

  return (
    <div className="hidden border-t border-gray-100 bg-[#145C38] lg:block">
      <div className="mx-auto max-w-[1200px] px-5">
        <ul className="flex h-[58px] items-center justify-center gap-2">
          {categories.map((category) => {
            const CategoryIcon = category.icon;

            return (
              <li key={category.name} className="group relative">
                {/* Main Category */}
                <button
                  type="button"
                  className="
                    flex items-center gap-2
                    rounded-md px-4 py-4
                    text-sm font-semibold text-white/90
                    transition-colors duration-200
                    hover:bg-[#f4f8f6]
                    hover:text-[#16a34a]
                  "
                >
                  <CategoryIcon className="text-base" />

                  <span>{category.name}</span>

                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className="
                      transition-transform duration-200
                      group-hover:rotate-180
                    "
                  />
                </button>

                {/* Main Dropdown */}
                <div
                  className="
                    invisible absolute left-1/2 top-full z-50
                    w-[850px] -translate-x-1/2 translate-y-2
                    rounded-xl border border-gray-100
                    bg-white p-6
                    opacity-0 shadow-xl
                    transition-all duration-200
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <div className="grid grid-cols-3 gap-8">
                    {category.columns.map((column) => {
                      const ColumnIcon = column.icon;

                      return (
                        <div key={column.title}>
                          {/* Column Title */}
                          <h4
                            className="
                              mb-3 flex items-center gap-2
                              border-b border-gray-100
                              pb-3
                              text-sm font-semibold
                              text-gray-800
                            "
                          >
                            <ColumnIcon className="text-sm text-green-600" />

                            <span>{column.title}</span>
                          </h4>

                          {/* Direct Products */}
                          {column.items && (
                            <div className="flex flex-col gap-1">
                              {column.items.map((item) => (
                                <a
                                  key={item}
                                  href="#"
                                  className="
                                    rounded-md px-2 py-1.5
                                    text-sm text-gray-500
                                    transition-colors
                                    duration-200
                                    hover:bg-[#f4f8f6]
                                    hover:text-green-600
                                  "
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          )}

                          {/* Sub Categories */}
                          {column.subCategories && (
                            <div className="flex flex-col gap-2">
                              {column.subCategories.map((subCategory) => {
                                const SubCategoryIcon = subCategory.icon;

                                const isOpen =
                                  openSubCategory === subCategory.title;

                                return (
                                  <div key={subCategory.title}>
                                    {/* Sub Category Button */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenSubCategory(
                                          isOpen ? null : subCategory.title,
                                        )
                                      }
                                      className="
                                          flex w-full
                                          items-center gap-1.5
                                          rounded-md px-2 py-2
                                          text-left text-xs
                                          font-semibold
                                          text-gray-700
                                          transition-colors
                                          duration-200
                                          hover:bg-[#f4f8f6]
                                          hover:text-green-600
                                        "
                                    >
                                      <ChevronRight
                                        size={13}
                                        strokeWidth={2}
                                        className={`
                                            text-green-600
                                            transition-transform
                                            duration-200
                                            ${isOpen ? "rotate-90" : ""}
                                          `}
                                      />


                                      <span>{subCategory.title}</span>
                                    </button>

                                    {/* Sub Category Products */}
                                    <div
                                      className={`
    ml-8 flex flex-col overflow-hidden
    transition-all duration-200 ease-out
    ${
      isOpen
        ? "max-h-40 opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-1"
    }
  `}
                                    >
                                      {subCategory.items.map((item) => (
                                        <a
                                          key={item}
                                          href="#"
                                          className="
        rounded-md
        px-2 py-1.5
        text-sm text-gray-500
        transition-colors duration-200
        hover:bg-[#f4f8f6]
        hover:text-green-600
      "
                                        >
                                          {item}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
