"use client";

import ProductListing from "./ProductListing";
import { getFlashSaleProducts } from "../Data/Data";

export default function FlashSalePageProduct() {
  return (
    <ProductListing
      products={getFlashSaleProducts()}
      emptyMessage="কোনো ফ্ল্যাশ সেল পণ্য পাওয়া যায়নি।"
    />
  );
}
