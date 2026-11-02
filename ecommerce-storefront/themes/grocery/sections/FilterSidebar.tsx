"use client";

import { SlClose } from "react-icons/sl";
import "./../src/styles.css";
import {
  getBrandsInCategory,
  getCategoryById,
  getFlagsInCategory,
  getBrandById,
  FLAG_META,
  type ProductFlag,
  type Brand, // Import Brand type
} from "@/lib/Products/json";

export type FilterState = {
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  brandIds: string[];
  flags: ProductFlag[];
};

export const defaultFilters: FilterState = {
  minPrice: "",
  maxPrice: "",
  inStockOnly: false,
  brandIds: [],
  flags: [],
};

type Props = {
  activeCategoryId?: string;
  totalCount?: number;
  filters: FilterState;
  onChange: (next: FilterState) => void;
  open?: boolean;
  onClose?: () => void;
  priceMin?: number;
  priceMax?: number;
  priceStep?: number;
  /** Optional custom lists to override the global category lists */
  availableBrands?: Brand[];
  availableFlags?: ProductFlag[];
};

export default function FilterSidebar({
  activeCategoryId,
  totalCount,
  filters,
  onChange,
  open = false,
  onClose,
  priceMin = 0,
  priceMax = 2500,
  priceStep = 100,
  availableBrands,
  availableFlags,
}: Props) {
  const category = getCategoryById(activeCategoryId);
  const reset = () => onChange(defaultFilters);
  
  // Use custom props if provided, otherwise fallback to global lists
  const categoryBrands = availableBrands ?? getBrandsInCategory(activeCategoryId);
  const categoryFlags = availableFlags ?? getFlagsInCategory(activeCategoryId);

  // ======================== Price slider state ========================
  const GAP = priceStep;

  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(Math.max(v, lo), hi);

  const toNum = (v: string, fallback: number) => {
    if (v === "" || v == null) return fallback;
    const n = Number(v);
    return Number.isNaN(n) ? fallback : n;
  };

  const rawMin = clamp(toNum(filters.minPrice, priceMin), priceMin, priceMax);
  const rawMax = clamp(toNum(filters.maxPrice, priceMax), priceMin, priceMax);
  const minVal = Math.min(rawMin, rawMax - GAP);
  const maxVal = Math.max(rawMax, minVal + GAP);

  const span = priceMax - priceMin || 1;
  const leftPct = ((minVal - priceMin) / span) * 100;
  const rightPct = ((maxVal - priceMin) / span) * 100;
  const fillPct = Math.max(0, rightPct - leftPct);
  const minOnTop = minVal > (priceMin + priceMax) / 2;

  const setMinPrice = (v: number) =>
    onChange({ ...filters, minPrice: String(v) });
  const setMaxPrice = (v: number) =>
    onChange({ ...filters, maxPrice: String(v) });

  const onSlideMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Math.min(Number(e.target.value), maxVal - GAP));
  };
  const onSlideMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Math.max(Number(e.target.value), minVal + GAP));
  };

  const commitMinPrice = () => {
    if (filters.minPrice === "") return;
    const n = toNum(filters.minPrice, priceMin);
    setMinPrice(clamp(Math.min(n, maxVal - GAP), priceMin, priceMax));
  };
  const commitMaxPrice = () => {
    if (filters.maxPrice === "") return;
    const n = toNum(filters.maxPrice, priceMax);
    setMaxPrice(clamp(Math.max(n, minVal + GAP), priceMin, priceMax));
  };

  const body = (
    <div className="space-y-7">
      {/* ---------------- Header ---------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-green-800">ফিল্টার</h2>
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer text-xs font-semibold text-[#1A9D5B] hover:underline"
        >
          রিসেট
        </button>
      </div>

      {/* ---------------- Current category ---------------- */}
      {category && (
        <div className="rounded-lg border border-[#d7efe1] bg-gradient-to-br from-[#e7f6ee] to-[#f4faf6] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1A9D5B]">
            বর্তমান ক্যাটাগরি
          </p>
          <h3 className="mt-1 text-base font-bold leading-tight text-green-900">
            {category.nameBn}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-gray-600">{category.name}</p>
            {typeof totalCount === "number" && (
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#1A9D5B] shadow-sm">
                {totalCount} পণ্য
              </span>
            )}
          </div>
        </div>
      )}

      {/* ---------------- Price range ---------------- */}
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            দাম (৳)
          </h3>
          <span className="text-xs font-medium font-serif text-[#1A9D5B]">
            ৳{minVal.toLocaleString("bn-BD")} — ৳
            {maxVal.toLocaleString("bn-BD")}
          </span>
        </div>

        {/* Dual-thumb slider */}
        <div className="relative mb-4 h-5 select-none">
          <div className="pointer-events-none absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />
          <div
            className="pointer-events-none absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#1A9D5B]"
            style={{ left: `${leftPct}%`, width: `${fillPct}%` }}
          />
          <input
            type="range"
            className="price-range"
            min={priceMin}
            max={priceMax}
            step={priceStep}
            value={minVal}
            onChange={onSlideMin}
            onBlur={commitMinPrice}
            aria-label="সর্বনিম্ন দাম"
            style={{ zIndex: minOnTop ? 4 : 3 }}
          />
          <input
            type="range"
            className="price-range"
            min={priceMin}
            max={priceMax}
            step={priceStep}
            value={maxVal}
            onChange={onSlideMax}
            onBlur={commitMaxPrice}
            aria-label="সর্বোচ্চ দাম"
            style={{ zIndex: minOnTop ? 3 : 4 }}
          />
        </div>

        {/* Number inputs */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="সর্বনিম্ন"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            onBlur={commitMinPrice}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#1A9D5B] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="সর্বোচ্চ"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            onBlur={commitMaxPrice}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#1A9D5B] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* ---------------- Availability ---------------- */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          স্টক
        </h3>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 accent-[#1A9D5B]"
          />
          শুধু স্টকে আছে
        </label>
      </div>

      {/* ---------------- Brands ---------------- */}
      {categoryBrands.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            ব্র্যান্ড
          </h3>
          <ul className="space-y-2">
            {categoryBrands.map((brand) => {
              const checked = filters.brandIds.includes(brand.id);
              return (
                <li key={brand.id}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...filters.brandIds, brand.id]
                          : filters.brandIds.filter((id) => id !== brand.id);
                        onChange({ ...filters, brandIds: next });
                      }}
                      className="h-4 w-4 rounded border-gray-300 accent-[#1A9D5B]"
                    />
                    <span
                      className={checked ? "font-semibold text-green-800" : ""}
                    >
                      {brand.nameBn}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ---------------- Flags ---------------- */}
      {categoryFlags.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            ট্যাগ
          </h3>
          <ul className="space-y-2">
            {categoryFlags.map((flag) => {
              const meta = FLAG_META[flag];
              const checked = filters.flags.includes(flag);
              return (
                <li key={flag}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...filters.flags, flag]
                          : filters.flags.filter((f) => f !== flag);
                        onChange({ ...filters, flags: next });
                      }}
                      className="h-4 w-4 rounded border-gray-300 accent-[#1A9D5B]"
                    />
                    <span
                      className={checked ? "font-semibold text-green-800" : ""}
                    >
                      {meta.labelBn}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside className="sticky top-24 hidden h-fit w-64 shrink-0 rounded-lg bg-white p-5 shadow-sm lg:block">
        {body}
      </aside>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute z-50 left-0 top-0 h-full w-[280px] max-w-[85%] overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="absolute right-3 top-3 rounded-full p-1 text-gray-500 transition hover:bg-gray-100"
          >
            <SlClose />
          </button>
          <div className="mt-8">{body}</div>
        </aside>
      </div>
    </>
  );
}