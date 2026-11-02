'use client';

import Image from 'next/image';
import Link from 'next/link';
import FlashSaleCountdown, {
  useFlashSaleCountdown,
} from '../components/FlashSaleCountdown/FlashSaleCountdown';

const products = [
  {
    id: 1,
    name: 'Foot Wears',
    price: 80,
    oldPrice: 60,
    rating: 5,
    reviews: 12,
    badge: 'G5A',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793095107/8ecdbc8a9a2d2d04c03ca25e456db787_ygr2g5.jpg',
    href: '/products/foot-wears',
  },
  {
    id: 2,
    name: 'High Heel Shoes',
    price: 80,
    oldPrice: 80,
    rating: 4,
    reviews: 252,
    badge: 'G5A',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793095231/207f48bb5ffa4958662f8d4c42f9b211_rxysjl.jpg',
    href: '/products/high-heel-shoes',
  },
  {
    id: 4,
    name: 'Fashion bag',
    price: 80,
    oldPrice: 80,
    rating: 4,
    reviews: 164,
    badge: 'GSA',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793095334/0f0546418ca46ddb16bac5c5e1a1b03e_ppdo2o.jpg',
    href: '/products/fashion-bag',
  },
  {
    id: 3,
    name: 'Smart Wristwatch',
    price: 80,
    oldPrice: 80,
    rating: 4,
    reviews: 26,
    badge: 'QFA',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793095282/e11a6ef5822666598de0994f9ed3bc8e_rjtaou.jpg',
    href: '/products/smart-wristwatch',
  },
];

function Countdown() {
  const timeLeft = useFlashSaleCountdown();
  return <FlashSaleCountdown timeLeft={timeLeft} />;
}

function FlashProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <article className="min-w-0 rounded-2xl bg-white p-2.5 shadow-[0_6px_22px_rgba(0,0,0,0.07)] sm:p-3">
      <Link
        href={product.href}
        className="relative block aspect-[1.45/1] overflow-hidden rounded-xl bg-gray-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 23vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-rose-400 px-2 py-1 text-[10px] font-semibold text-white sm:text-xs">
          {product.badge}
        </span>
      </Link>

      <Link href={product.href}>
        <h3 className="mt-2.5 truncate text-sm font-medium text-gray-900 sm:text-base">
          {product.name}
        </h3>
      </Link>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
        <span className="text-gray-400 line-through">
          ৳{product.oldPrice}
        </span>
        <span className="font-semibold text-gray-900">
          ৳{product.price}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1">
        <span className="tracking-tight text-green-600">
          {'★'.repeat(product.rating)}
        </span>
        {product.rating < 5 && (
          <span className="text-gray-300">
            {'★'.repeat(5 - product.rating)}
          </span>
        )}
        <span className="ml-1 text-[10px] text-gray-400 sm:text-xs">
          ({product.reviews})
        </span>
      </div>
    </article>
  );
}

export default function FlashSale() {
  return (
    <section className="bg-[#faf9f7] px-4 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Sale introduction */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-white shadow-lg sm:px-7">
            <span className="text-xs tracking-wide sm:text-sm">
              LIMITED TIME
            </span>
            <span className="text-lg font-bold sm:text-xl">
              50% OFF
            </span>
          </div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            Exclusive Flash Sale
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-700 sm:text-base">
            Don&apos;t miss out on our biggest sale of the year.
            Premium quality products at unbeatable prices for
            the next 48 hours only.
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-8 sm:mt-10">
          <Countdown />
        </div>

        {/* Action buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <Link
            href="/flash-sale"
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-black px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800 sm:px-9"
          >
            SHOP NOW
          </Link>

          <Link
            href="/deals"
            className="inline-flex min-h-14 items-center justify-center rounded-xl border border-gray-300 bg-transparent px-6 py-4 text-sm font-medium text-gray-900 transition hover:bg-white sm:px-8"
          >
            View All Deals
          </Link>
        </div>

        {/* Flash sale products */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <FlashProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
