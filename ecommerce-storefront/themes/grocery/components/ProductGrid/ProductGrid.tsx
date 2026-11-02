"use client";

import { useMemo, useState } from "react";
import ProductToolbar, { type SortOption, type PerPage } from "../../sections/ProductToolbar";
import Pagination from "../../sections/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getBrandById, getCategoryById, type Product } from "@/lib/Products/json";

type Props = {
  products: Product[];
  onOpenFilters?: () => void;
  emptyMessage?: string;
  columns?: "4" | "5"; // 👈 Add this so we can switch grid sizes
};

export default function ProductGrid({ 
  products, 
  onOpenFilters,
  emptyMessage = "কোনো পণ্য পাওয়া যায়নি।",
  columns = "4", // default to 4 columns
}: Props) {
  const [sort, setSort] = useState<SortOption>("default");
  const [perPage, setPerPage] = useState<PerPage>(20);
  const [page, setPage] = useState<number>(1);

  // ... (Keep the sorting logic exactly the same) ...
  const sortedProducts = useMemo(() => {
    const arr = [...products];
    switch (sort) {
      case "price-asc": arr.sort((a, b) => a.price - b.price); break;
      case "price-desc": arr.sort((a, b) => b.price - a.price); break;
      case "name-asc": arr.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": arr.sort((a, b) => b.name.localeCompare(a.name)); break;
      case "category-asc":
        arr.sort((a, b) => (getCategoryById(a.categoryId)?.nameBn ?? "").localeCompare(getCategoryById(b.categoryId)?.nameBn ?? "", "bn"));
        break;
      case "brand-asc":
        arr.sort((a, b) => (getBrandById(a.brandId)?.nameBn ?? "zzz").localeCompare(getBrandById(b.brandId)?.nameBn ?? "zzz", "bn"));
        break;
      default: break;
    }
    return arr;
  }, [products, sort]);

  // ... (Keep pagination logic exactly the same) ...
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / perPage));
  const safePage = Math.min(page, totalPages);
  const visible = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, safePage, perPage]);

  const handleSortChange = (value: SortOption) => { setSort(value); setPage(1); };
  const handlePerPageChange = (value: PerPage) => { setPerPage(value); setPage(1); };
  const handlePageChange = (next: number) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // 👇 Dynamically pick grid columns
  const gridClass = columns === "5" 
    ? "grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5" 
    : "grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="w-full">
      <ProductToolbar
        showing={visible.length}
        total={sortedProducts.length}
        sort={sort}
        onSortChange={handleSortChange}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        onOpenFilters={onOpenFilters}
      />

      {visible.length === 0 ? (
        <div className="rounded-lg bg-white py-16 text-center text-gray-500 shadow-sm">
          {emptyMessage}
        </div>
      ) : (
        <div className={`grid ${gridClass}`}>
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
  );
}