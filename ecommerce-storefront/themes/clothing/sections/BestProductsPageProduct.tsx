"use client";

import ProductListing from "./ProductListing";
import { getBestSellerProducts } from "../Data/Data";

const bestSellers = getBestSellerProducts();

export default function BestProductsPageProduct() {
  return (
    <ProductListing
      products={bestSellers}
      emptyMessage="কোনো বেস্ট সেলার পণ্য পাওয়া যায়নি।"
    />
  );
}
