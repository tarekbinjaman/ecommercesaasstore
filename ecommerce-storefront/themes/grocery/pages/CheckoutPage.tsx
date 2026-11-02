'use client';

import { useState } from 'react';
import BillingForm from '@/themes/grocery/components/Checkout/BillingForm';
import OrderSummary, {
  type OrderPayload,
} from '@/themes/grocery/components/Checkout/OrderSummary';
import { CONTAINER, DISTRICTS } from '@/lib/Checkout/constants';

const DEFAULT_DISTRICT_ID = DISTRICTS[0].id;

export default function CheckoutPage() {
  const [district, setDistrict] = useState<number>(DEFAULT_DISTRICT_ID);

const handlePlaceOrder = (data: OrderPayload) => {
  console.log('🛒 Order submitted:', data);
  console.table(data);

  // later:
  // await fetch('/api/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
};

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-8 lg:py-10 mt-26">
      <div className={CONTAINER}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            // we need summary — but the submit came from inside OrderSummary.
            // So let OrderSummary call its own onPlaceOrder instead.
          }}
        >
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
            <BillingForm
              district={district}
              onDistrictChange={setDistrict}
            />
            <OrderSummary
district={district} onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </form>
      </div>
    </main>
  );
}