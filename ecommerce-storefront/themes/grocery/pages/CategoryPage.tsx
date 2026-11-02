"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SlArrowDown } from "react-icons/sl";
import FilterSidebar, {
  defaultFilters,
  type FilterState,
} from "../sections/FilterSidebar";
import ProductToolbar, {
  type SortOption,
  type PerPage,
} from "../sections/ProductToolbar";
import {

  getCategoryBySlug,
  getProductsByCategory,

} from "@/lib/Products/json";
import ProductCard from "../components/ProductCard/ProductCard";

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug)
    ? params.slug[params.slug.length - 1]
    : params?.slug;

  const category = getCategoryBySlug(slug);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("default");
  const [perPage, setPerPage] = useState<PerPage>(20);
  const [visibleCount, setVisibleCount] = useState<number>(20);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* --- Base products scoped to the URL category --- */
  const baseProducts = useMemo(
    () => getProductsByCategory(category?.id),
    [category?.id]
  );

  /* --- Apply sidebar filters --- */
  const filteredProducts = useMemo(() => {
    const min =
      filters.minPrice === "" ? -Infinity : Number(filters.minPrice);
    const max =
      filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);

    return baseProducts.filter((p) => {
      if (filters.inStockOnly && !p.inStock) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });
  }, [baseProducts, filters]);

  /* --- Sort --- */
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return arr;
  }, [filteredProducts, sort]);

  const visible = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  /* --- Resets visibleCount whenever the result set changes --- */
  const handleSortChange = (s: SortOption) => {
    setSort(s);
    setVisibleCount(perPage);
  };
  const handlePerPageChange = (n: PerPage) => {
    setPerPage(n);
    setVisibleCount(n);
  };
  const handleFiltersChange = (next: FilterState) => {
    setFilters(next);
    setVisibleCount(perPage);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 antialiased mt-16 md:mt-24 lg:mt-10 xl:mt-12 2xl:mt-14">
      <main className="pb-24 md:mt-26">
        <div className="mx-auto w-[95%] max-w-[1365px]">

          {/* ---------- Layout: sidebar + content ---------- */}
          <div className="flex gap-6">
            <FilterSidebar
              activeCategoryId={category?.id}
              filters={filters}
              onChange={handleFiltersChange}
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            />

            <div className="min-w-0 flex-1">
              <ProductToolbar
                showing={visible.length}
                total={sortedProducts.length}
                sort={sort}
                onSortChange={handleSortChange}
                perPage={perPage}
                onPerPageChange={handlePerPageChange}
                onOpenFilters={() => setDrawerOpen(true)}
              />

              {/* Empty state */}
              {visible.length === 0 && (
                <div className="rounded-lg bg-white py-16 text-center text-gray-500 shadow-sm">
                  কোনো পণ্য পাওয়া যায়নি।
                </div>
              )}

              {/* Grid */}
              {visible.length > 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {visible.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Load more */}
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + perPage)}
                    className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#1A9D5B] transition hover:text-[#17834d]"
                  >
                    আরো পণ্য দেখুন
                    <SlArrowDown />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}