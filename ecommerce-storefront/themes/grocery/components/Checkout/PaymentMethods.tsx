'use client';

import { PAYMENTS, PaymentId } from '@/lib/Checkout/constants';
import MobileBankingBox from './MobileBankingBox';

interface PaymentMethodsProps {
  value: PaymentId;
  onChange: (value: PaymentId) => void;
}

export default function PaymentMethods({
  value,
  onChange,
}: PaymentMethodsProps) {
  return (
    <div className="space-y-2.5">
      {PAYMENTS.map((p) => (
        <div key={p.id}>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-200 px-4 py-3 transition hover:border-gray-300 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
            <input
              type="radio"
              name="payment"
              value={p.id}
              checked={value === p.id}
              onChange={() => onChange(p.id)}
              className="h-4 w-4 accent-emerald-600"
            />
            <span className="flex flex-1 items-center gap-2 text-sm font-semibold text-gray-800">
              {p.label}
              {p.logo && (
                <img
                  src={p.logo}
                  alt={p.label}
                  className="ml-auto h-5 object-contain"
                />
              )}
            </span>
          </label>

          {p.id !== 'cod' && value === p.id && (
            <MobileBankingBox gateway={p.label} />
          )}
        </div>
      ))}
    </div>
  );
}