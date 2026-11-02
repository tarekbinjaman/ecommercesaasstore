import { toBn } from '@/lib/Checkout/utils';

interface ShippingOptionsProps {
  cost: number;
}

export default function ShippingOptions({ cost }: ShippingOptionsProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">Shipment</span>
      <span className="font-bold text-emerald-600">{toBn(cost)}৳</span>
    </div>
  );
}