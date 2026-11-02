'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart, Trash2, Tag, Ticket, ArrowRight, ShoppingBag,
} from 'lucide-react';
import { formatBDT } from '@/lib/Cart/bn';

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const initialItems: CartItem[] = [
  { id: 1, name: 'Black Seed Honey 500g', image: 'https://picsum.photos/seed/black-seed-honey/100/100', price: 900, quantity: 1 },
  { id: 2, name: 'Bangladeshi Sweet Yogu 1kg', image: 'https://picsum.photos/seed/sweet-yogu/100/100', price: 230, quantity: 2 },
];

/* ---------- Qty control ---------- */
function QtyControl({ value, onInc, onDec }: { value: number; onInc: () => void; onDec: () => void }) {
  return (
    <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
      <button
        onClick={onDec}
        aria-label="পরিমাণ কমান"
        className="w-8 h-8 bg-gray-50 hover:bg-green-600 text-gray-700 hover:text-white font-bold text-base transition-colors"
      >
        -
      </button>
      <input
        readOnly
        value={value}
        aria-label="পরিমাণ"
        className="w-10 h-8 text-center text-[15px] font-semibold text-gray-900 outline-none bg-transparent"
      />
      <button
        onClick={onInc}
        aria-label="পরিমাণ বাড়ান"
        className="w-8 h-8 bg-gray-50 hover:bg-green-600 text-gray-700 hover:text-white font-bold text-base transition-colors"
      >
        +
      </button>
    </div>
  );
}

/* ---------- Mobile card ---------- */
function MobileCartCard({
  item, onInc, onDec, onRemove,
}: { item: CartItem; onInc: () => void; onDec: () => void; onRemove: () => void }) {
  return (
    <div className="grid grid-cols-[80px_1fr_auto] grid-rows-[auto_auto_auto] gap-x-4 gap-y-2 p-4 bg-white border border-gray-200 rounded-xl relative shadow-sm">
      <div className="row-span-3 flex items-center">
        <img src={item.image} alt={item.name} className="w-full h-20 object-cover rounded-lg border border-gray-100" />
      </div>
      <div className="col-span-2 pr-9">
        <span className="font-semibold text-[15px] text-gray-900 leading-snug">{item.name}</span>
      </div>
      <div className="col-span-2">
        <span className="text-sm text-gray-500 font-medium">{formatBDT(item.price)}</span>
      </div>
      <div className="self-center">
        <QtyControl value={item.quantity} onInc={onInc} onDec={onDec} />
      </div>
      <div className="self-center text-right">
        <span className="font-bold text-base text-green-600">{formatBDT(item.price * item.quantity)}</span>
      </div>
      <button
        onClick={onRemove}
        aria-label="মুছে ফেলুন"
        className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ---------- Empty state ---------- */
function EmptyCart() {
  return (
    <div className="text-center py-20 px-5">
      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-600 mb-5">আপনার কার্ট সম্পূর্ণ খালি।</p>
      <Link
        href="/"
        className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
      >
        কেনাকাটা শুরু করুন
      </Link>
    </div>
  );
}

/* ---------- Page ---------- */
export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');
  const [promoError, setPromoError] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = promoApplied ? 50 : 0;
  const total = Math.max(0, subtotal - discount);
  const isEmpty = items.length === 0;

  const inc = (id: number) =>
    setItems((p) => p.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it)));
  const dec = (id: number) =>
    setItems((p) => p.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it)));
  const remove = (id: number) => setItems((p) => p.filter((it) => it.id !== id));

  const applyFixed = () => {
    setPromoApplied(true);
    setPromoError(false);
    setPromoMsg('৫০৳ ডিসকাউন্ট প্রয়োগ করা হয়েছে!');
  };

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'EID50') {
      setPromoApplied(true);
      setPromoError(false);
      setPromoMsg('প্রোমো কোড সফলভাবে প্রয়োগ হয়েছে!');
    } else {
      setPromoError(true);
      setPromoMsg('ভুল প্রোমো কোড।');
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen mt-26">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-8 md:py-14">
        <h2 className="flex items-center gap-3 text-2xl md:text-[28px] font-bold mb-6 md:mb-8 text-gray-900">
          <ShoppingCart className="w-7 h-7 text-green-600" />
          আপনার কার্ট
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-start">
          {/* LEFT: items */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
            {isEmpty ? (
              <EmptyCart />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-[15px] text-gray-600 border-b-2 border-gray-200">
                        <th className="p-4 font-semibold">পণ্য</th>
                        <th className="p-4 font-semibold">নাম</th>
                        <th className="p-4 font-semibold">দাম</th>
                        <th className="p-4 font-semibold">পরিমাণ</th>
                        <th className="p-4 font-semibold">মোট</th>
                        <th className="p-4" />
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                          <td className="p-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-[75px] h-[75px] object-cover rounded-lg border border-gray-100"
                            />
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-base text-gray-900 block leading-snug">{item.name}</span>
                          </td>
                          <td className="p-4 text-gray-600 font-medium">{formatBDT(item.price)}</td>
                          <td className="p-4">
                            <QtyControl value={item.quantity} onInc={() => inc(item.id)} onDec={() => dec(item.id)} />
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-[17px] text-green-600">{formatBDT(item.price * item.quantity)}</span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => remove(item.id)}
                              aria-label="মুছে ফেলুন"
                              className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden flex flex-col gap-4">
                  {items.map((item) => (
                    <MobileCartCard
                      key={item.id}
                      item={item}
                      onInc={() => inc(item.id)}
                      onDec={() => dec(item.id)}
                      onRemove={() => remove(item.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: summary */}
          {!isEmpty && (
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              {/* Promo box */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                  <Tag className="w-4 h-4 text-green-600" /> প্রোমো কোড ব্যবহার করুন
                </h4>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-3 bg-white">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="কুপন কোড লিখুন"
                    className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-5 bg-gray-900 text-white font-semibold hover:bg-green-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoMsg && (
                  <p className={`text-xs mb-3 font-medium ${promoError ? 'text-red-600' : 'text-green-600'}`}>
                    {promoMsg}
                  </p>
                )}

                <button
                  onClick={applyFixed}
                  disabled={promoApplied}
                  className={`group w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed text-left transition-colors
                    ${promoApplied
                      ? 'bg-green-50 border-green-500 text-green-700 cursor-default'
                      : 'bg-green-50 border-green-600 text-gray-900 hover:bg-green-600 hover:text-white'}`}
                >
                  <Ticket className={`w-5 h-5 ${promoApplied ? 'text-green-600' : 'text-green-600 group-hover:text-white'}`} />
                  <span className="text-sm">
                    <strong>ঈদ অফার!</strong> ক্লিক করে ৫০৳ ছাড় নিন
                  </span>
                </button>
              </div>

              {/* Summary box */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-4 border-b border-gray-200">অর্ডার সামারি</h3>

                <div className="flex justify-between text-[15px] text-gray-600 mb-4">
                  <span>সাবটোটাল</span>
                  <span className="font-semibold text-gray-900">{formatBDT(subtotal)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-[15px] mb-4 text-red-600">
                    <span>ডিসকাউন্ট</span>
                    <span className="font-semibold">-{formatBDT(discount)}</span>
                  </div>
                )}

                <hr className="border-dashed border-gray-300 my-4" />

                <div className="flex justify-between items-center mb-5">
                  <span className="text-lg font-semibold text-gray-900">সর্বমোট</span>
                  <span className="text-[22px] font-bold text-green-600">{formatBDT(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2.5 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-bold transition-colors"
                >
                  চেকআউট করুন <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}