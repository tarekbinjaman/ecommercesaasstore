"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProductBySlug, PROMO_CODES, type Product } from "../Data/Data";

/* ------------------------------------------------------------------ */
/*  Store — kept in localStorage so the cart survives a refresh and is */
/*  shared by the header badge, product detail, cart and checkout.     */
/* ------------------------------------------------------------------ */

type CartLine = { slug: string; quantity: number };
type StoredCart = { lines: CartLine[]; promoCode: string | null };

export type CartItem = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

const STORAGE_KEY = "stylehub-cart";
const EMPTY_CART: StoredCart = { lines: [], promoCode: null };

let cache: StoredCart | null = null;
const listeners = new Set<() => void>();

function parseCart(raw: string | null): StoredCart {
  if (!raw) return EMPTY_CART;
  try {
    const data = JSON.parse(raw);
    const lines: CartLine[] = Array.isArray(data?.lines)
      ? data.lines.filter(
          (l: unknown): l is CartLine =>
            typeof (l as CartLine)?.slug === "string" &&
            Number.isInteger((l as CartLine)?.quantity) &&
            (l as CartLine).quantity > 0,
        )
      : [];
    const promoCode =
      typeof data?.promoCode === "string" && data.promoCode in PROMO_CODES
        ? data.promoCode
        : null;
    return { lines, promoCode };
  } catch {
    return EMPTY_CART;
  }
}

function readCart(): StoredCart {
  if (cache === null) {
    try {
      cache = parseCart(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      cache = EMPTY_CART;
    }
  }
  return cache;
}

function writeCart(next: StoredCart) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked (private mode etc.) — cart still works for this visit
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // keep tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => EMPTY_CART;

/* ------------------------------------------------------------------ */
/*  Actions                                                            */
/* ------------------------------------------------------------------ */

function clampQuantity(product: Product, quantity: number) {
  return Math.max(1, Math.min(quantity, product.stockQuantity || 99));
}

export function addToCart(slug: string, quantity = 1) {
  const product = getProductBySlug(slug);
  if (!product || !product.inStock) return;

  const cart = readCart();
  const existing = cart.lines.find((l) => l.slug === slug);

  const lines = existing
    ? cart.lines.map((l) =>
        l.slug === slug
          ? { ...l, quantity: clampQuantity(product, l.quantity + quantity) }
          : l,
      )
    : [...cart.lines, { slug, quantity: clampQuantity(product, quantity) }];

  writeCart({ ...cart, lines });
}

export function setCartQuantity(slug: string, quantity: number) {
  const product = getProductBySlug(slug);
  if (!product) return;

  const cart = readCart();
  writeCart({
    ...cart,
    lines: cart.lines.map((l) =>
      l.slug === slug ? { ...l, quantity: clampQuantity(product, quantity) } : l,
    ),
  });
}

export function removeFromCart(slug: string) {
  const cart = readCart();
  writeCart({ ...cart, lines: cart.lines.filter((l) => l.slug !== slug) });
}

/** Returns false when the code is unknown. */
export function applyPromoCode(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  if (!(normalized in PROMO_CODES)) return false;
  writeCart({ ...readCart(), promoCode: normalized });
  return true;
}

export function removePromoCode() {
  writeCart({ ...readCart(), promoCode: null });
}

export function clearCart() {
  writeCart(EMPTY_CART);
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useCart() {
  const cart = useSyncExternalStore(subscribe, readCart, getServerSnapshot);

  const items = useMemo<CartItem[]>(
    () =>
      cart.lines.flatMap((line) => {
        const product = getProductBySlug(line.slug);
        return product
          ? [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }]
          : [];
      }),
    [cart.lines],
  );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const discount = cart.promoCode
    ? Math.min(PROMO_CODES[cart.promoCode] ?? 0, subtotal)
    : 0;

  return {
    items,
    count,
    subtotal,
    discount,
    promoCode: cart.promoCode,
  };
}
