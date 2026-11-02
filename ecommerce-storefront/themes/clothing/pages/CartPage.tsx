'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Tag, Ticket, Trash2, X } from 'lucide-react';
import '../src/styles.css';
import CheckoutSteps from '../components/Cart/CheckoutSteps';
import QtyControl from '../components/Cart/QtyControl';
import {
  applyPromoCode,
  removeFromCart,
  removePromoCode,
  setCartQuantity,
  useCart,
  type CartItem,
} from '../hooks/useCart';
import { formatBDT, getCategoryById, PROMO_CODES } from '../Data/Data';

const FEATURED_CODE = 'STYLE100';

/* ---------- One cart row (desktop + mobile) ---------- */
function CartRow({ item }: { item: CartItem }) {
  const { product, quantity, lineTotal } = item;
  const href = `/productDetail/${product.slug}`;
  const image = product.images[0];
  const category = getCategoryById(product.categoryId);

  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <Link
        href={href}
        className="relative aspect-[3/4] w-[88px] shrink-0 overflow-hidden bg-gray-100 sm:w-[104px]"
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            sizes="104px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="relative flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="min-w-0 pr-8 md:pr-0">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
            {category?.name ?? ''}
          </p>
          <Link href={href}>
            <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-500 sm:text-base">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm">
            <span className="text-gray-700">{formatBDT(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatBDT(product.oldPrice)}
              </span>
            )}
            <span className="text-xs text-gray-400">· {product.unit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 md:justify-end md:gap-8">
          <QtyControl
            value={quantity}
            max={product.stockQuantity || 99}
            onChange={(next) => setCartQuantity(product.slug, next)}
          />
          <span className="min-w-[90px] text-right text-base font-semibold text-gray-900">
            {formatBDT(lineTotal)}
          </span>
          <button
            type="button"
            onClick={() => removeFromCart(product.slug)}
            aria-label={`Remove ${product.name} from cart`}
            className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 md:relative"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

/* ---------- Empty state ---------- */
function EmptyCart() {
  return (
    <div className="rounded-2xl bg-white px-5 py-20 text-center shadow-sm">
      <ShoppingBag className="mx-auto mb-4 h-14 w-14 text-gray-300" />
      <h2 className="text-lg font-semibold text-gray-900">Your cart is empty</h2>
      <p className="mt-1 text-sm text-gray-500">
        Looks like you haven&apos;t added anything yet.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-7 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
      >
        START SHOPPING
      </Link>
    </div>
  );
}

/* ---------- Promo box ---------- */
function PromoBox({ promoCode }: { promoCode: string | null }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const apply = (code: string) => {
    if (applyPromoCode(code)) {
      setInput('');
      setError('');
    } else {
      setError('This promo code is not valid.');
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
        <Tag className="h-4 w-4" /> Promo code
      </h2>

      {promoCode ? (
        <div className="flex items-center justify-between rounded-lg border border-black bg-[#faf9f7] px-4 py-3 text-sm">
          <span>
            <strong>{promoCode}</strong> applied — {formatBDT(PROMO_CODES[promoCode])} off
          </span>
          <button
            type="button"
            onClick={removePromoCode}
            aria-label="Remove promo code"
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-black"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              apply(input);
            }}
            className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-black"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Enter promo code"
              aria-label="Promo code"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Apply
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-2 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={() => apply(FEATURED_CODE)}
            className="group mt-3 flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-3 text-left text-sm text-gray-900 transition hover:border-black hover:bg-black hover:text-white"
          >
            <Ticket className="h-5 w-5 shrink-0" />
            <span>
              <strong>Special offer!</strong> Tap to use {FEATURED_CODE} and get{' '}
              {formatBDT(PROMO_CODES[FEATURED_CODE])} off
            </span>
          </button>
        </>
      )}
    </div>
  );
}

/* ---------- Page ---------- */
export default function CartPage() {
  const { items, count, subtotal, discount, promoCode } = useCart();
  const total = subtotal - discount;

  return (
    <div className="mt-10 min-h-screen pb-24 font-sans text-gray-800 antialiased">
      <div className="mx-auto w-[95%] max-w-[1365px]">
        <div className="mb-8">
          <CheckoutSteps title="Your Cart" current={0} />
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
            {/* LEFT: items */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="font-semibold text-gray-900">
                  {count} {count === 1 ? 'item' : 'items'}
                </h2>
                <Link
                  href="/products"
                  className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-black hover:underline"
                >
                  Continue shopping
                </Link>
              </div>

              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartRow key={item.product.slug} item={item} />
                ))}
              </ul>
            </div>

            {/* RIGHT: promo + summary */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              <PromoBox promoCode={promoCode} />

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 border-b border-gray-100 pb-4 text-lg font-bold text-gray-900">
                  Order summary
                </h2>

                <div className="mb-3 flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatBDT(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="mb-3 flex justify-between text-sm text-red-600">
                    <span>Discount ({promoCode})</span>
                    <span className="font-semibold">-{formatBDT(discount)}</span>
                  </div>
                )}

                <div className="mb-3 flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <hr className="my-4 border-dashed border-gray-300" />

                <div className="mb-6 flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-black">{formatBDT(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-black text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
                >
                  PROCEED TO CHECKOUT <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
