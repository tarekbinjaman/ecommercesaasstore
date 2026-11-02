"use client";

import { useRef, useState, type FormEvent, type DragEvent } from "react";
import {
  FaStar,
  FaRegStar,
  FaRegThumbsUp,
  FaUserCircle,
  FaCloudUploadAlt,
  FaTimes,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { type Product, toBnDigits } from "@/lib/Products/json";
import Image from "next/image";

type Props = {
  product: Product;
};

const TABS = [
  { id: "description", label: "Description" },
  { id: "reviews", label: "Review" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ------------------------------ review type ------------------------------ */

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  images?: string[];
};

function formatDateBn(iso: string): string {
  const d = new Date(iso);
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${months[d.getMonth()]} ${toBnDigits(
    d.getDate().toString().padStart(2, "0"),
  )}, ${toBnDigits(d.getFullYear())} ${toBnDigits(h)}:${toBnDigits(m)} ${ampm}`;
}

/* ------------------------------ helpers -------------------------------- */

function StarRow({
  rating,
  size = "h-4 w-4",
}: {
  rating: number;
  size?: string;
}) {
  return (
    <span className="flex gap-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <FaStar key={i} className={size} />
        ) : (
          <FaRegStar key={i} className={size} />
        ),
      )}
    </span>
  );
}

/* ------------------------------ component ------------------------------ */

export default function ProductInfoTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [sortOpen, setSortOpen] = useState(false);

  /* ---------------------------- reviews state ---------------------------- */
  const [reviews, setReviews] = useState<Review[]>([]);

  /* ---------------------------- form state ------------------------------- */
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState("");
  const [formImages, setFormImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const descriptionRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);

  const sectionRefs: Record<TabId, React.RefObject<HTMLElement | null>> = {
    description: descriptionRef,
    reviews: reviewsRef,
  };

  const scrollTo = (id: TabId) => {
    setActiveTab(id);
    const el = sectionRefs[id].current;
    if (!el) return;
    const OFFSET = 140;
    const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* ----------------------------- review math ----------------------------- */
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / totalReviews
      : 0;

  const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
  const recommendedPct =
    totalReviews > 0 ? (recommendedCount / totalReviews) * 100 : 0;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count,
      pct: totalReviews ? (count / totalReviews) * 100 : 0,
    };
  });

  /* ---------------------------- image handling --------------------------- */
  const handleFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const room = 3 - formImages.length;
    const next = arr.slice(0, Math.max(0, room));

    setFormImages((prev) => [...prev, ...next]);
    Promise.all(
      next.map(
        (f) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(f);
          }),
      ),
    ).then((urls) => setImagePreviews((prev) => [...prev, ...urls]));
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  const removeImage = (idx: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  /* ---------------------------- submit handler --------------------------- */
  const canSubmit =
    formName.trim().length > 1 &&
    formRating > 0 &&
    formText.trim().length > 3;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newReview: Review = {
      id: `local-${Date.now()}`,
      name: formName.trim(),
      rating: formRating,
      date: new Date().toISOString(),
      text: formText.trim(),
      helpful: 0,
      images: imagePreviews,
    };

    console.log("Review data", newReview);

    setReviews((prev) => [newReview, ...prev]);
    setFormName("");
    setFormRating(0);
    setFormText("");
    setFormImages([]);
    setImagePreviews([]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* ==================== Tab bar ==================== */}
      <div className="mt-12 rounded-lg border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 px-4 lg:px-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollTo(tab.id)}
                className={`relative cursor-pointer px-4 py-3 text-md font-semibold transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
                {tab.id === "reviews" && totalReviews > 0 && (
                  <span className="ml-1.5 text-[11px] font-normal opacity-80">
                    ({toBnDigits(totalReviews)})
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#1A9D5B]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================ Description ============================ */}
      <section
        id="description"
        ref={descriptionRef}
        className="scroll-mt-40 py-10"
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-7">
          <h2 className="text-lg font-bold text-gray-900 lg:text-xl">
            Description
          </h2>

          <p className="mt-4 text-justify font-open-sans text-[16px] leading-relaxed text-gray-600 lg:text-[20px] lg:text-base">
            {product.description}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-gray-100 pt-6 sm:grid-cols-2">
            <div className="flex justify-between gap-4 text-md">
              <dt className="text-gray-500">Brand</dt>
              <dd className="font-medium text-gray-800">
                {product.brandId ?? "স্থানীয়"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-md">
              <dt className="text-gray-500">Quantity</dt>
              <dd className="font-medium text-gray-800">{product.unit}</dd>
            </div>
            <div className="flex justify-between gap-4 text-md">
              <dt className="text-gray-500">Stock</dt>
              <dd className="font-medium text-gray-800">
                {product.inStock
                  ? `${product.stockQuantity} Left`
                  : "Out of stock"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-md">
              <dt className="text-gray-500">Category</dt>
              <dd className="font-medium text-gray-800">
                {product.categoryId}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============================== Reviews ============================== */}
      <section id="reviews" ref={reviewsRef} className="scroll-mt-40 py-10 ">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-7">
          {/* ---------- Top: Summary (left) + Form (right) ---------- */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
            {/* ---------- Left: Summary ---------- */}
            <div>
              <div className="flex items-center gap-3">
                <p className="text-5xl font-bold leading-none text-gray-900">
                  {(avgRating.toFixed(1))}
                </p>
                <div>
                  <p className="text-xs text-gray-500">Average Rating</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <StarRow rating={Math.round(avgRating)} size="h-3.5 w-3.5" />
                    <span className="text-[11px] text-gray-400">
                      ({(totalReviews)} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">
                  {(recommendedPct.toFixed(2))}%
                </p>
                <p className="text-xs text-gray-500">
                  Recommended{" "}
                  <span className="text-gray-400">
                    ({(recommendedCount)} of{" "}
                    {(totalReviews)})
                  </span>
                </p>
              </div>

              {/* Rating breakdown bars */}
              <div className="mt-5 flex flex-col gap-1.5">
                {breakdown.map(({ star, pct }) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="flex w-[70px] shrink-0 items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((i) =>
                        i <= star ? (
                          <FaStar key={i} className="h-3 w-3" />
                        ) : (
                          <FaRegStar key={i} className="h-3 w-3 text-gray-300" />
                        ),
                      )}
                    </span>
                    <div className="h-3 flex-1 overflow-hidden rounded-sm bg-gray-100">
                      <div
                        className="h-full rounded-sm bg-gray-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-[11px] text-gray-500">
                      {(Math.round(pct))}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Right: Submit form ---------- */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h3 className="inline-block border-b-2 border-amber-400 pb-1 text-xl font-bold text-gray-900">
                  Submit Your Review
                </h3>
              </div>

              <p className="mb-5 text-md text-gray-500">
                Your email address will not be published. Required fields are
                marked <span className="text-red-500">*</span>
              </p>

              {/* Name */}
              <div className="mb-4">
                <label className="mb-1.5 block text-md font-medium text-gray-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Write your name here..."
                  maxLength={40}
                  className="w-full rounded-md border border-gray-200 placeholder:text-gray-500 text-gray-700 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1A9D5B]"
                />
              </div>

              {/* Review text */}
              <div className="mb-4">
                <label className="mb-1.5 block text-md font-medium text-gray-700">
                  Write your opinion about the product{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Write Your Review Here..."
                  rows={5}
                  maxLength={1000}
                  className="w-full resize-none rounded-md border placeholder:text-gray-500 text-gray-700 border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1A9D5B]"
                />
              </div>

              {/* Image upload */}
              <div className="mb-4">
                <label className="mb-1.5 block text-md font-medium text-gray-700">
                  Upload Images (Optional)
                </label>

                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 hover:bg-blue-100/20 border-dashed hover:border-blue-600 px-4 py-8 text-center transition ${
                    dragOver
                      ? "border-[#1A9D5B] bg-green-50/50"
                      : "border-gray-200 bg-gray-50 "
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => {
                      if (e.target.files) handleFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <FaCloudUploadAlt className="h-8 w-8 text-blue-500" />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Drag & Drop Images Here
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    or click to browse files ( {toBnDigits(3)} max )
                  </p>
                </label>

                {/* Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {imagePreviews.map((src, i) => (
                      <div
                        key={i}
                        className="group relative h-16 w-16 overflow-hidden rounded-md border border-gray-200"
                      >
                        <Image
                          src={src}
                          alt={`preview ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          aria-label="Remove image"
                          className="absolute right-0.5 top-0.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <FaTimes className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating + Submit */}
              <div className="flex flex-wrap items-end gap-4">
                <div className="min-w-[200px] flex-1">
                  <label className="mb-1.5 block text-md font-medium text-gray-700">
                    Your Rating: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formRating}
                      onChange={(e) => setFormRating(Number(e.target.value))}
                      className="w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#1A9D5B]"
                    >
                      <option value={0}>Select One</option>
                      <option value={5}>★★★★★ — Excellent</option>
                      <option value={4}>★★★★ — Good</option>
                      <option value={3}>★★★ — Average</option>
                      <option value={2}>★★ — Poor</option>
                      <option value={1}>★ — Terrible</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="cursor-pointer rounded-sm bg-gray-800 px-8 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {submitted ? "Submitted ✓" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>

          {/* ---------- Bottom: Reviews list ---------- */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            {totalReviews === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                  <FaRegThumbsUp className="h-6 w-6 text-gray-300" />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-700">
                  No reviews yet
                </p>
                <p className="mt-1 max-w-xs text-xs text-gray-500">
                  Be the first to review this product — your feedback helps
                  other shoppers.
                </p>
              </div>
            ) : (
              <>
                {/* Sort */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Total {toBnDigits(totalReviews)} reviews
                  </p>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortOpen((s) => !s)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      Most Helpful
                      <FiChevronDown
                        className={`transition ${sortOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                        {[
                          "Most Helpful",
                          "Highest Rating",
                          "Lowest Rating",
                          "Newest",
                        ].map((opt, i) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSortOpen(false)}
                            className={`block w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${
                              i === 0 ? "text-[#1A9D5B]" : "text-gray-600"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* List */}
                <ul className="divide-y divide-gray-100">
                  {reviews.map((review) => (
                    <li key={review.id} className="py-5">
                      <div className="flex items-start gap-4">
                        <FaUserCircle className="mt-0.5 h-10 w-10 shrink-0 text-gray-300" />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <p className="text-sm font-semibold text-amber-600">
                              {review.name}
                            </p>
                            <span className="text-[11px] text-gray-400">
                              {formatDateBn(review.date)}
                            </span>
                          </div>
                          <div className="mt-1">
                            <StarRow
                              rating={review.rating}
                              size="h-3.5 w-3.5"
                            />
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            {review.text}
                          </p>

                          {review.images && review.images.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {review.images.map((src, i) => (
                                <div
                                  key={i}
                                  className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-200"
                                >
                                  <Image
                                    src={src}
                                    fill
                                    alt={`review ${i + 1}`}
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}