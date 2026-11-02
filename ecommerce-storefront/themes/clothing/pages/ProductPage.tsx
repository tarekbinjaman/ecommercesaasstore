"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar, {
  defaultFilters,
  type FilterState,
} from "../sections/FilterSidebar";
import ProductToolbar, {
  type SortOption,
  type PerPage,
} from "../sections/ProductToolbar";
import Pagination from "../sections/Pagination";
import {
  getProductsByCategory,
  getBrandById,
  getCategoryById,
} from "../Data/Data";
import ProductCard from "../components/ProductCard/ProductCard";

export function ProductPage() {
  const searchParams = useSearchParams();
  const searchQuery = (searchParams.get("search") ?? "")
    .trim()
    .toLowerCase();

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("default");
  const [perPage, setPerPage] = useState<PerPage>(20);
  const [page, setPage] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* reset page to 1 when the URL search changes */
  const [prevSearch, setPrevSearch] = useState(searchQuery);
  if (prevSearch !== searchQuery) {
    setPrevSearch(searchQuery);
    setPage(1);
  }

  /* -------------------------- base products -------------------------- */
  const baseProducts = useMemo(() => getProductsByCategory(), []);

  /* ----------------------------- search ----------------------------- */
  const searchProducts = useMemo(() => {
    if (!searchQuery) return baseProducts;

    return baseProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery) ||
        product.nameBn.includes(searchQuery) ||
        product.categoryId.toLowerCase().includes(searchQuery) ||
        (product.brandId ?? "").toLowerCase().includes(searchQuery)
      );
    });
  }, [baseProducts, searchQuery]);

  /* ----------------------------- filters ----------------------------- */
  const filteredProducts = useMemo(() => {
    const min =
      filters.minPrice === "" ? -Infinity : Number(filters.minPrice);
    const max =
      filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);

    return searchProducts.filter((product) => {
      if (filters.inStockOnly && !product.inStock) return false;
      if (product.price < min || product.price > max) return false;

      if (
        filters.brandIds.length > 0 &&
        !filters.brandIds.includes(product.brandId ?? "")
      ) {
        return false;
      }

      if (filters.flags.length > 0) {
        if (!product.flag || !filters.flags.includes(product.flag)) {
          return false;
        }
      }

      return true;
    });
  }, [searchProducts, filters]);

  /* ------------------------------ sort ------------------------------ */
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
      case "category-asc":
        arr.sort((a, b) => {
          const an = getCategoryById(a.categoryId)?.nameBn ?? "";
          const bn = getCategoryById(b.categoryId)?.nameBn ?? "";
          return an.localeCompare(bn, "bn");
        });
        break;
      case "brand-asc":
        arr.sort((a, b) => {
          const an = getBrandById(a.brandId)?.nameBn ?? "zzz";
          const bn = getBrandById(b.brandId)?.nameBn ?? "zzz";
          return an.localeCompare(bn, "bn");
        });
        break;
      default:
        break;
    }

    return arr;
  }, [filteredProducts, sort]);

  /* ---------------------------- pagination ---------------------------- */
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / perPage));
  const safePage = Math.min(page, totalPages);

  const visible = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, safePage, perPage]);

  /* ------------------------------ handlers ------------------------------ */
  const handleSortChange = (value: SortOption) => {
    setSort(value);
    setPage(1);
  };

  const handlePerPageChange = (value: PerPage) => {
    setPerPage(value);
    setPage(1);
  };

  const handleFiltersChange = (next: FilterState) => {
    setFilters(next);
    setPage(1);
  };

  const handlePageChange = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 antialiased mt-10">
      <main className="pb-24">
        <div className="mx-auto w-[95%] max-w-[1365px]">
          {searchQuery && (
            <h1 className="mb-5 text-xl font-semibold">
              Search results for: {searchParams.get("search")}
            </h1>
          )}

          <div className="flex gap-6">
            <FilterSidebar
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

              {visible.length === 0 && (
                <div className="rounded-lg bg-white py-16 text-center text-gray-500 shadow-sm">
                  কোনো পণ্য পাওয়া যায়নি।
                </div>
              )}

              {visible.length > 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {visible.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              <Pagination
                page={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}