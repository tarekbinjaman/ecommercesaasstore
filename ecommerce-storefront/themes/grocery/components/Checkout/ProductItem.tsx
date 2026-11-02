'use client';

import { PRODUCT } from '@/lib/Checkout/constants';
import { toBn } from '@/lib/Checkout/utils';
import { HiMiniMinus } from 'react-icons/hi2';

interface ProductItemProps {
  qty: number;
  setQty: (q: number) => void;
  onRemove: () => void;
}

export default function ProductItem({
  qty,
  setQty,
  onRemove,
}: ProductItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={onRemove}
          aria-label="রিমুভ"
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] text-white shadow transition hover:bg-red-600"
        >
          <HiMiniMinus className='text-xl' />
        </button>
        <img
          src={PRODUCT.image}
          alt={PRODUCT.name}
          className="h-20 w-20 rounded-md object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800">{PRODUCT.name}</p>

        <QtyBox qty={qty} setQty={setQty} />

        <p className="mt-2 text-sm font-bold text-emerald-600">
          {toBn(PRODUCT.price * qty)}৳
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   SUB-COMPONENT
============================================================ */
function QtyBox({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (q: number) => void;
}) {
  return (
    <div className="mt-2 inline-flex items-center overflow-hidden rounded-md border border-gray-200">
      <button
        type="button"
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="h-8 w-8 text-gray-600 transition hover:bg-gray-50"
      >
        -
      </button>
      <input
        type="text"
        readOnly
        value={toBn(qty)}
        className="h-8 w-10 border-x border-gray-200 text-center text-md text-gray-600 outline-none font-serif"
      />
      <button
        type="button"
        onClick={() => setQty(qty + 1)}
        className="h-8 w-8 text-gray-600 transition hover:bg-gray-50"
      >
        +
      </button>
    </div>
  );
}