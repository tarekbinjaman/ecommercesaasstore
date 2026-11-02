'use client';

import { useState } from 'react';
import {
  getShippingCost,
  PRODUCT,
  type PaymentId,
} from '@/lib/Checkout/constants';
import { toBn } from '@/lib/Checkout/utils';
import Divider from '@/themes/grocery/components/Checkout/Divider';
import ProductItem from './ProductItem';
import ShippingOptions from './ShippingOptions';
import PaymentMethods from './PaymentMethods';
import Link from 'next/link';

interface OrderSummaryProps {
  district: number;
  onPlaceOrder: (data: OrderPayload) => void;
}

export interface OrderPayload {
  customer: {
    name: string;
    phone: string;
    address: string;
    district: number; // number → backend
  };
  items: {
    product: string;
    unit_price: number;
    qty: number;
    line_total: number;
  }[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: PaymentId;
}

export default function OrderSummary({
  district,
  onPlaceOrder,
}: OrderSummaryProps) {
  const [hasItem, setHasItem] = useState(true);
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState<PaymentId>('cod');

  const subtotal = hasItem ? PRODUCT.price * qty : 0;
  const shipping = getShippingCost(district);
  const total = subtotal + (hasItem ? shipping : 0);

  /* ---------- Place Order ---------- */
  const handlePlaceOrder = () => {
    // 1. Read customer fields from the form (lives inside BillingForm)
    const formEl = document.getElementById('checkoutForm') as HTMLFormElement | null;
    const fd = formEl ? new FormData(formEl) : new FormData();

    // 2. Build the payload
    const payload: OrderPayload = {
      customer: {
        name: (fd.get('name') as string) ?? '',
        phone: (fd.get('phone') as string) ?? '',
        address: (fd.get('address') as string) ?? '',
        district: Number(fd.get('district')) || district,
      },
      items: hasItem
        ? [
            {
              product: PRODUCT.name,
              unit_price: PRODUCT.price,
              qty,
              line_total: subtotal,
            },
          ]
        : [],
      subtotal,
      shipping_cost: shipping,
      total,
      payment_method: payment,
    };

    // 3. Pass it up to the page
    onPlaceOrder(payload);
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] md:p-8">
      <h2 className="mb-5 border-b border-gray-100 pb-4 text-lg font-extrabold uppercase text-gray-900">
        Product
      </h2>

      {hasItem ? (
        <ProductItem
          qty={qty}
          setQty={setQty}
          onRemove={() => setHasItem(false)}
        />
      ) : (
        <EmptyCart />
      )}

      <Divider />

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-bold text-emerald-600">{toBn(subtotal)}৳</span>
      </div>

      <Divider />

      <ShippingOptions cost={shipping} />

      <Divider />

      <div className="flex items-center justify-between">
        <span className="text-base font-extrabold uppercase text-gray-900">
          Total
        </span>
        <span className="text-lg font-extrabold text-emerald-600">
          {toBn(total)}৳
        </span>
      </div>

      <Divider className="mb-6" />

      <PaymentMethods value={payment} onChange={setPayment} />

      <p className="mt-5 text-center text-xs text-gray-500">
        By placing an order, you agree to our{' '}
        <a href="#" className="text-emerald-600 underline">
          privacy policy
        </a>
        .
      </p>

      <button
        type="button"
        onClick={handlePlaceOrder}
        className="mt-3 w-full rounded-full bg-emerald-600 py-4 text-base font-bold text-white transition hover:bg-emerald-700 active:scale-[0.99]"
      >
        Place Order
      </button>
    </section>
  );
}

/* ============================================================
   SUB-COMPONENT
============================================================ */
function EmptyCart() {
  return (
    <p className="py-6 text-center text-sm text-gray-400">
      আপনার কার্ট খালি।{' '}
      <Link href="/products" className="text-emerald-600 underline">
        শপে ফিরে যান
      </Link>
    </p>
  );
}