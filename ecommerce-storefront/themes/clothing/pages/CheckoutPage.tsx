'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import '../src/styles.css';
import {
  DISTRICTS,
  getShippingCost,
  PAYMENTS,
  type PaymentId,
} from '@/lib/Checkout/constants';
import CheckoutSteps from '../components/Cart/CheckoutSteps';
import BillingForm from '../components/Checkout/BillingForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import { formatBDT } from '../Data/Data';
import { clearCart, useCart } from '../hooks/useCart';

/** Shape sent to the backend once orders are wired up. */
export interface OrderPayload {
  customer: {
    name: string;
    phone: string;
    address: string;
    district: number;
    note: string;
  };
  items: {
    product_id: string;
    product: string;
    unit_price: number;
    qty: number;
    line_total: number;
  }[];
  subtotal: number;
  discount: number;
  promo_code: string | null;
  shipping_cost: number;
  total: number;
  payment_method: PaymentId;
  payment_details: { sender_number: string; transaction_id: string } | null;
}

const DEFAULT_DISTRICT_ID = DISTRICTS[0].id;

export default function CheckoutPage() {
  const { items, subtotal, discount, promoCode } = useCart();
  const [district, setDistrict] = useState<number>(DEFAULT_DISTRICT_ID);
  const [payment, setPayment] = useState<PaymentId>('cod');
  const [placedOrder, setPlacedOrder] = useState<OrderPayload | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;

    const fd = new FormData(e.currentTarget);
    const field = (key: string) => String(fd.get(key) ?? '').trim();
    const shipping = getShippingCost(district);

    const payload: OrderPayload = {
      customer: {
        name: field('name'),
        phone: field('phone'),
        address: field('address'),
        district,
        note: field('note'),
      },
      items: items.map(({ product, quantity, lineTotal }) => ({
        product_id: product.id,
        product: product.name,
        unit_price: product.price,
        qty: quantity,
        line_total: lineTotal,
      })),
      subtotal,
      discount,
      promo_code: promoCode,
      shipping_cost: shipping,
      total: subtotal - discount + shipping,
      payment_method: payment,
      payment_details:
        payment === 'cod'
          ? null
          : {
              sender_number: field('sender_number'),
              transaction_id: field('transaction_id'),
            },
    };

    // later: await fetch('/api/orders', { method: 'POST', body: JSON.stringify(payload) })
    console.log('🛒 Order submitted:', payload);

    setPlacedOrder(payload);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-10 min-h-screen pb-24 font-sans text-gray-800 antialiased">
      <div className="mx-auto w-[95%] max-w-[1365px]">
        <div className="mb-8">
          <CheckoutSteps
            title={placedOrder ? 'Thank you!' : 'Checkout'}
            current={placedOrder ? 2 : 1}
          />
        </div>

        {placedOrder ? (
          <OrderPlaced order={placedOrder} />
        ) : items.length === 0 ? (
          <EmptyCheckout />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8"
          >
            <BillingForm district={district} onDistrictChange={setDistrict} />
            <div className="lg:sticky lg:top-32">
              <OrderSummary
                district={district}
                payment={payment}
                onPaymentChange={setPayment}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------- Empty cart ---------- */
function EmptyCheckout() {
  return (
    <div className="rounded-2xl bg-white px-5 py-20 text-center shadow-sm">
      <ShoppingBag className="mx-auto mb-4 h-14 w-14 text-gray-300" />
      <h2 className="text-lg font-semibold text-gray-900">Your cart is empty</h2>
      <p className="mt-1 text-sm text-gray-500">Add a few products before checking out.</p>
      <Link
        href="/products"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-7 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
      >
        START SHOPPING
      </Link>
    </div>
  );
}

/* ---------- Confirmation ---------- */
function OrderPlaced({ order }: { order: OrderPayload }) {
  const districtName = DISTRICTS.find((d) => d.id === order.customer.district)?.name;
  const paymentLabel = PAYMENTS.find((p) => p.id === order.payment_method)?.label;
  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm sm:p-10">
      <CheckCircle2 className="mx-auto h-14 w-14 text-black" />
      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        Your order has been placed
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        ধন্যবাদ, {order.customer.name}! আমরা শীঘ্রই {order.customer.phone} নম্বরে
        যোগাযোগ করে অর্ডারটি নিশ্চিত করব।
      </p>

      <dl className="mx-auto mt-8 max-w-sm space-y-3 rounded-xl bg-[#faf9f7] p-5 text-left text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Items</dt>
          <dd className="font-semibold text-gray-900">{itemCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Deliver to</dt>
          <dd className="font-semibold text-gray-900">{districtName}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Payment</dt>
          <dd className="font-semibold text-gray-900">{paymentLabel}</dd>
        </div>
        <div className="flex justify-between border-t border-dashed border-gray-300 pt-3">
          <dt className="font-semibold text-gray-900">Total</dt>
          <dd className="text-lg font-bold text-black">{formatBDT(order.total)}</dd>
        </div>
      </dl>

      <Link
        href="/products"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-7 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}
