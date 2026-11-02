"use client";

import { useMemo, useState } from "react";
import ProductToolbar, {
  type SortOption,
  type PerPage,
} from "./ProductToolbar";
import Pagination from "./Pagination";
import ProductCard from "../components/ProductCard/ProductCard";
import {
  getBrandById,
  getCategoryById,
  type Product,
} from "../Data/Data";

type Props = {
  products: Product[];
  emptyMessage: string;
};

/** Product grid with sorting + pagination (no filters). Used by flash sale and best products pages. */
export default function ProductListing({ products, emptyMessage }: Props) {
  const [sort, setSort] = useState<SortOption>("default");
  const [perPage, setPerPage] = useState<PerPage>(20);
  const [page, setPage] = useState<number>(1);

  /* ------------------------------ sort ------------------------------ */
  const sortedProducts = useMemo(() => {
    const arr = [...products];

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
  }, [products, sort]);

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

  const handlePageChange = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <ProductToolbar
        showing={visible.length}
        total={sortedProducts.length}
        sort={sort}
        onSortChange={handleSortChange}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        showFilters={false}
      />

      {visible.length === 0 && (
        <div className="rounded-lg bg-white py-16 text-center text-gray-500 shadow-sm">
          {emptyMessage}
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
  );
}
