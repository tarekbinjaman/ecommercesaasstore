'use client';

import { MOBILE_BANK_NUMBER, PAYMENTS, type PaymentId } from '@/lib/Checkout/constants';
import { inputCls } from './classes';

interface PaymentMethodsProps {
  value: PaymentId;
  onChange: (value: PaymentId) => void;
}

export default function PaymentMethods({ value, onChange }: PaymentMethodsProps) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-3 text-sm font-semibold text-gray-900">Payment method</legend>

      {PAYMENTS.map((p) => (
        <div key={p.id}>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-200 px-4 py-3 transition hover:border-gray-300 has-[:checked]:border-black has-[:checked]:bg-[#faf9f7]">
            <input
              type="radio"
              name="payment"
              value={p.id}
              checked={value === p.id}
              onChange={() => onChange(p.id)}
              className="h-4 w-4 accent-black"
            />
            <span className="flex flex-1 items-center gap-2 text-sm font-semibold text-gray-800">
              {p.label}
              {p.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt="" className="ml-auto h-5 object-contain" />
              )}
            </span>
          </label>

          {p.id !== 'cod' && value === p.id && <MobileBankingBox gateway={p.label} />}
        </div>
      ))}
    </fieldset>
  );
}

/* ---------- bKash / Rocket / Nagad details ---------- */
function MobileBankingBox({ gateway }: { gateway: string }) {
  return (
    <div className="mt-2.5 rounded-lg border border-dashed border-gray-300 bg-[#faf9f7] p-4">
      <p className="mb-1 text-sm font-bold text-gray-900">{gateway} Payment</p>
      <p className="mb-4 text-xs text-gray-600">
        Number : <strong>{MOBILE_BANK_NUMBER}</strong> (Personal) — Send Money করে নিচের তথ্য দিন।
      </p>

      <div className="space-y-3">
        <div>
          <label htmlFor="sender-number" className="mb-1.5 block text-xs font-semibold text-gray-700">
            Sender Number <span className="text-red-500">*</span>
          </label>
          <input
            id="sender-number"
            type="tel"
            name="sender_number"
            inputMode="numeric"
            pattern="01[3-9][0-9]{8}"
            placeholder="017XXXXXXXX"
            required
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="transaction-id" className="mb-1.5 block text-xs font-semibold text-gray-700">
            Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            id="transaction-id"
            type="text"
            name="transaction_id"
            placeholder="8N7A6D5EE7M"
            required
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}
