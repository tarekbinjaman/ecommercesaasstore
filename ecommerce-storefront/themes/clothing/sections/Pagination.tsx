"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toBnDigits } from "../Data/Data";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

function buildPages(
  current: number,
  total: number,
  sibling: number,
): (number | "…")[] {
  const totalSlots = sibling * 2 + 5;
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(current - sibling, 2);
  const right = Math.min(current + sibling, total - 1);

  const items: (number | "…")[] = [1];

  if (left > 2) items.push("…");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("…");

  items.push(total);
  return items;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages, siblingCount);

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  const baseBtn =
    "flex h-9 min-w-9 items-center justify-center rounded-md border text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
    >
      {/* Prev */}
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="আগের পৃষ্ঠা"
        className={`${baseBtn} border-gray-200 text-gray-600 hover:border-[#111111] hover:text-[#111111]`}
      >
        <FaChevronLeft className="h-3 w-3" />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`gap-${i}`}
            className="flex h-9 min-w-9 items-center justify-center text-sm text-gray-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${baseBtn} ${
              p === page
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-gray-200 text-gray-700 hover:border-[#111111] hover:text-[#111111]"
            }`}
          >
            {toBnDigits(p)}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="পরের পৃষ্ঠা"
        className={`${baseBtn} border-gray-200 text-gray-600 hover:border-[#111111] hover:text-[#111111]`}
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </nav>
  );
}