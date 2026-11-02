'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
};

const newArrivals: Product[] = [
  {
    id: 1,
    name: 'Classic Everyday Sneakers',
    category: 'Footwear',
    price: 2490,
    oldPrice: 2990,
    rating: 4.8,
    reviews: 24,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793093865/778821dc8676de592828ffded2ff95e5_ugcnlj.jpg',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    category: 'Fashion',
    price: 890,
    rating: 4.6,
    reviews: 18,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793093985/e1128cffa1f314759d3b16ebd57a66be_pvcf9w.jpg',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Minimalist Wrist Watch',
    category: 'Accessories',
    price: 1850,
    oldPrice: 2200,
    rating: 4.7,
    reviews: 31,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793094059/61b777a0df9764613dd7ed4afcbd2c2c_ewws5g.jpg',
    badge: '15% OFF',
  },
  {
    id: 4,
    name: 'Everyday Shoulder Bag',
    category: 'Bags',
    price: 1590,
    rating: 4.5,
    reviews: 12,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793094182/6675153f6ade8c83cbcceda5020fbb5b_yjqiz7.jpg',
    badge: 'New',
  },
];

const bestSellers: Product[] = [
  {
    id: 5,
    name: 'Premium Running Sneakers',
    category: 'Footwear',
    price: 2890,
    oldPrice: 3490,
    rating: 4.9,
    reviews: 126,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793094286/fc44a5fbba527eae04fd6cd16d4dc469_tqzjlg.jpg',
    badge: 'Bestseller',
  },
  {
    id: 6,
    name: 'Essential Casual T-Shirt',
    category: 'Fashion',
    price: 790,
    rating: 4.8,
    reviews: 98,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793094366/578c27b4ff2171e9c60dfafbe9a04616_wuucy4.jpg',
  },
  {
    id: 7,
    name: 'Classic Gold-Tone Watch',
    category: 'Accessories',
    price: 2190,
    oldPrice: 2590,
    rating: 4.7,
    reviews: 84,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793094430/e25d61ab390dbfe4fb5e8da9df8c552e_rqhsao.jpg',
    badge: 'Popular',
  },
  {
    id: 8,
    name: 'Modern Everyday Backpack',
    category: 'Bags',
    price: 1790,
    rating: 4.8,
    reviews: 76,
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793094522/5f06c020bace7ba72ce83ffd94b76c2b_hmxfxs.jpg',
  },
];


function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  return (
    <article className="group min-w-0">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-gray-900 sm:left-3 sm:top-3 sm:text-[10px]">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-2 left-2 bg-red-600 px-2 py-1 text-[10px] font-medium text-white sm:bottom-3 sm:left-3">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isFavorite}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 transition hover:bg-white sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.7"
            className={`h-[17px] w-[17px] ${
              isFavorite ? 'text-red-500' : 'text-gray-800'
            }`}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            />
          </svg>
        </button>

        {/* Hover action: desktop */}
        <Link
          href={`/products/${product.id}`}
          className="absolute bottom-0 left-0 right-0 hidden translate-y-full bg-white/95 py-3 text-center text-xs font-semibold text-gray-900 transition-all duration-300 hover:bg-black hover:text-white group-hover:translate-y-0 md:block"
        >
          View Product
        </Link>
      </div>

      {/* Product Information */}
      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
          {product.category}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="mt-1 block"
        >
          <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 transition-colors hover:text-gray-500 sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-gray-900 sm:text-base">
            ৳{product.price.toLocaleString('en-BD')}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              ৳{product.oldPrice.toLocaleString('en-BD')}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-gray-400">
            ({product.reviews})
          </span>
        </div>
      </div>
    </article>
  );
}


function ProductSection({
  title,
  subtitle,
  products,
  href,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  href: string;
}) {
  return (
    <section className="mx-auto w-full px-4 py-6 sm:w-11/12 sm:px-0 lg:w-10/12 lg:py-8">
      <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#10264d] sm:text-2xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            {subtitle}
          </p>
        </div>

        <Link
          href={href}
          className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-800 sm:text-sm"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function ProductSections() {
  return (
    <>
      <ProductSection
        title="New Arrivals"
        subtitle="Discover the latest additions to our collection."
        products={newArrivals}
        href="/new-arrivals"
      />

      <ProductSection
        title="Best Selling Products"
        subtitle="Customer favorites, chosen again and again."
        products={bestSellers}
        href="/best-sellers"
      />
    </>
  );
}
