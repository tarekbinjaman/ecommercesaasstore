"use client";

import { useState } from "react";

const categories = ["T-Shirts", "Shirts", "Sneakers", "Watches", "Bags"];

const sizes = ["XS", "S", "M", "L", "XL"];

const colors = [
  { name: "Black", value: "#171717" },
  { name: "White", value: "#FFFFFF" },
  { name: "Beige", value: "#D6C2A5" },
  { name: "Olive", value: "#737A4B" },
  { name: "Navy", value: "#253858" },
];

export default function FilterSidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [inStock, setInStock] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (
    item: string,
    selected: string[],
    setSelected: (items: string[]) => void,
  ) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((value) => value !== item)
        : [...selected, item],
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(200);
    setInStock(false);
  };

  const activeFilters =
    selectedCategories.length +
    selectedSizes.length +
    (maxPrice < 200 ? 1 : 0) +
    (inStock ? 1 : 0);

  return (
    <aside
      className="
    absolute
    left-6
    top-40
    z-30
    hidden
    w-56
    max-h-[calc(100vh-8rem)]
    overflow-y-auto
    bg-white
    mt-6
    border
    p-6
    lg:block
  "
    >
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border border-neutral-200 px-4 py-3 text-sm font-medium lg:hidden"
      >
        <span className="flex items-center gap-2">
          Filters
          {activeFilters > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
              {activeFilters}
            </span>
          )}
        </span>

        <span className="text-lg">{isOpen ? "−" : "+"}</span>
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } border border-neutral-200 bg-white p-5 lg:block lg:border-0 lg:p-0`}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-900">
            Filters
          </h2>

          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-neutral-500 underline underline-offset-4 transition hover:text-black"
          >
            Clear all
          </button>
        </div>

        {/* Category */}
        <section className="border-t border-neutral-200 py-5">
          <h3 className="mb-4 text-sm font-medium text-neutral-900">
            Category
          </h3>

          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-3 text-sm text-neutral-600 hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    toggleItem(
                      category,
                      selectedCategories,
                      setSelectedCategories,
                    )
                  }
                  className="h-4 w-4 accent-black"
                />
                {category}
              </label>
            ))}
          </div>
        </section>

        {/* Price range */}
        <section className="border-t border-neutral-200 py-5">
          <h3 className="mb-4 text-sm font-medium text-neutral-900">
            Price Range
          </h3>

          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-neutral-500">$0</span>
            <span className="font-medium text-neutral-900">${maxPrice}</span>
          </div>

          <input
            type="range"
            min={0}
            max={200}
            step={5}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            aria-label="Maximum price"
            className="w-full cursor-pointer accent-black"
          />

          <div className="mt-2 flex justify-between text-xs text-neutral-400">
            <span>$0</span>
            <span>$200+</span>
          </div>
        </section>


        {/* Availability */}
        <section className="border-y border-neutral-200 py-5">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-600">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(event) => setInStock(event.target.checked)}
              className="h-4 w-4 accent-black"
            />
            In stock only
          </label>
        </section>

        {/* Mobile apply button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-5 w-full bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 lg:hidden"
        >
          Show Products
        </button>
      </div>
    </aside>
  );
}
