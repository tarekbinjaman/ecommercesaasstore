
import React from 'react';
import {
  Truck,
  ShieldCheck,
  Headset,
  BadgeCheck,
  ArrowUpRight,
} from 'lucide-react';

const trustFeatures = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Your essentials, delivered to your doorstep.',
    detail: 'DELIVERY',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Shopping',
    description: 'Shop with confidence and peace of mind.',
    detail: 'SECURITY',
  },
  {
    icon: Headset,
    title: 'Here to Help',
    description: 'Friendly support whenever you need us.',
    detail: 'SUPPORT',
  },
  {
    icon: BadgeCheck,
    title: 'Quality You Trust',
    description: 'Carefully selected products for your home.',
    detail: 'QUALITY',
  },
];

const TrustSection = () => {
  return (
    <section className="mx-auto w-10/12 px-4 py-10 sm:px-6 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-white p-6 sm:p-10 lg:p-12">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-green-100/50 blur-3xl" />

        <div className="relative">
          <div className="mb-8 text-center sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
              <ShieldCheck size={14} />
              Shopping with confidence
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Your Trust, Our Priority
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
              From placing your order to receiving it at home,
              we want every step to feel simple and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    <span className="text-[10px] font-semibold tracking-[0.15em] text-gray-400">
                      {feature.detail}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex items-center text-green-700">
                    <span className="h-px w-8 bg-green-200 transition-all duration-300 group-hover:w-12 group-hover:bg-green-600" />
                    <ArrowUpRight
                      size={16}
                      className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
