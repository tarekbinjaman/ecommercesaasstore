'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { getShippingCost, type PaymentId } from '@/lib/Checkout/constants';
import QtyControl from '../Cart/QtyControl';
import PaymentMethods from './PaymentMethods';
import { cardCls } from './classes';
import { formatBDT } from '../../Data/Data';
import { removeFromCart, setCartQuantity, useCart } from '../../hooks/useCart';

interface OrderSummaryProps {
  district: number;
  payment: PaymentId;
  onPaymentChange: (value: PaymentId) => void;
}

export default function OrderSummary({ district, payment, onPaymentChange }: OrderSummaryProps) {
  const { items, subtotal, discount, promoCode } = useCart();
  const shipping = getShippingCost(district);
  const total = subtotal - discount + shipping;

  return (
    <section className={cardCls}>
      <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-900">Your order</h2>
        <Link
          href="/cart"
          className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-black hover:underline"
        >
          Edit cart
        </Link>
      </div>

      <ul className="space-y-4">
        {items.map(({ product, quantity, lineTotal }) => (
          <li key={product.slug} className="flex items-start gap-4">
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-gray-100">
              {product.images[0] && (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">{formatBDT(product.price)} each</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <QtyControl
                  size="sm"
                  value={quantity}
                  max={product.stockQuantity || 99}
                  onChange={(next) => setCartQuantity(product.slug, next)}
                />
                <span className="text-sm font-semibold text-gray-900">{formatBDT(lineTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(product.slug)}
              aria-label={`Remove ${product.name}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-sm">
        <div className="flex justify-between text-gray-600">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-gray-900">{formatBDT(subtotal)}</dd>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-red-600">
            <dt>Discount ({promoCode})</dt>
            <dd className="font-semibold">-{formatBDT(discount)}</dd>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <dt>Shipping</dt>
          <dd className="font-semibold text-gray-900">{formatBDT(shipping)}</dd>
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-gray-300 pt-4">
          <dt className="text-base font-semibold text-gray-900">Total</dt>
          <dd className="text-2xl font-bold text-black">{formatBDT(total)}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-gray-100 pt-6">
        <PaymentMethods value={payment} onChange={onPaymentChange} />
      </div>

      <p className="mt-5 text-center text-xs text-gray-500">
        By placing an order, you agree to our{' '}
        <a href="#" className="text-black underline">
          privacy policy
        </a>
        .
      </p>

      <button
        type="submit"
        className="mt-3 flex min-h-14 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800 active:scale-[0.99]"
      >
        PLACE ORDER · {formatBDT(total)}
      </button>
    </section>
  );
}
