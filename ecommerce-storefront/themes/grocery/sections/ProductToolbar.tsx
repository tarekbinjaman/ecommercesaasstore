"use client";

import { SlEqualizer } from "react-icons/sl";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "category-asc"   
  | "brand-asc";     

const SORT_LABELS: Record<SortOption, string> = {
  default: "ডিফল্ট",
  "price-asc": "দাম: কম থেকে বেশি",
  "price-desc": "দাম: বেশি থেকে কম",
  "name-asc": "নাম: A → Z",
  "name-desc": "নাম: Z → A",
  "category-asc": "ক্যাটাগরি: A → Z",
  "brand-asc": "ব্র্যান্ড: A → Z",
};

export const PER_PAGE_OPTIONS = [10, 20, 40, 100] as const;
export type PerPage = (typeof PER_PAGE_OPTIONS)[number];

type Props = {
  showing: number;
  total: number;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  perPage: PerPage;
  onPerPageChange: (n: PerPage) => void;
  onOpenFilters?: () => void; // 👈 Made optional
  showFilters?: boolean;      // 👈 Added this
};

export default function ProductToolbar({
  showing,
  total,
  sort,
  onSortChange,
  perPage,
  onPerPageChange,
  onOpenFilters,
  showFilters = true, // 👈 Default to true
}: Props) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* 👇 Conditionally render the filter button */}
        {showFilters && onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-[#1A9D5B] hover:text-[#1A9D5B] lg:hidden"
          >
            <SlEqualizer className="text-base" />
            ফিল্টার
          </button>
        )}

        <p className="flex text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{showing}</span>
          <span className="mx-1">/</span>
          <span className="flex gap-2">
          <span>{total}</span> <span className="hidden md:block">পণ্য</span>
          </span>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">দেখাও</span>
          <select
            value={perPage}
            onChange={(e) =>
              onPerPageChange(Number(e.target.value) as PerPage)
            }
            className="rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-[#1A9D5B]"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">সাজান</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-[#1A9D5B]"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}