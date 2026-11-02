import { inputCls, MOBILE_BANK_NUMBER } from '@/lib/Checkout/constants';

interface MobileBankingBoxProps {
  gateway: string;
}

export default function MobileBankingBox({ gateway }: MobileBankingBoxProps) {
  return (
    <div className="mt-2.5 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 p-4">
      <p className="mb-1 text-sm font-bold text-emerald-700">
        {gateway} Payment
      </p>
      <p className="mb-4 text-xs text-gray-600">
        Number : <strong>{MOBILE_BANK_NUMBER}</strong> (Personal) — Send Money করে
        নিচের তথ্য দিন।
      </p>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Sender Number
          </label>
          <input type="tel" placeholder="017XXXXXXXX" className={inputCls} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Transaction ID
          </label>
          <input type="text" placeholder="8N7A6D5EE7M" className={inputCls} />
        </div>
      </div>
    </div>
  );
}