import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaPinterest, FaShare } from "react-icons/fa";

const products = [
  {
    name: "Gopalbhog Mango",
    image: "https://picsum.photos/seed/gopalbhog-mango/100/100",
    oldPrice: "২০০৳",
    price: "১৫০৳",
  },
  {
    name: "Bombay Lychee 100 Pieces",
    image: "https://picsum.photos/seed/bombay-lychee/100/100",
    oldPrice: "৪২০৳",
    price: "৩৯৯৳",
  },
  {
    name: "Black Cardamom 100gm",
    image: "https://picsum.photos/seed/black-cardamom/100/100",
    oldPrice: "৫০০৳",
    price: "৪৬০৳",
  },
];

export default function BestSelling() {
  return (
    <section className="pt-4 bg-[#F7F7F7]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 xl:grid-cols-2 my-7">
        
        {/* Best Selling */}
        <div className="rounded-lg p-6">
          <h2 className="mb-5 text-2xl font-bold text-green-800">
            বেস্ট সেলিং প্রোডাক্ট
          </h2>

          <ul className="flex flex-col">
            {products.map((product) => (
              <li
                key={product.name}
                className="flex items-center gap-4 border-b border-gray-200 py-4 last:border-b-0"
              >
                <Link
                  href="/product"
                  className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-md bg-gray-50"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                <div className="min-w-0">
                  <Link
                    href="/product"
                    className="line-clamp-2 text-sm font-semibold text-gray-700 transition hover:text-[#1A9D5B]"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-2 text-sm font-semibold text-[#1A9D5B]">
                    <span className="mr-2 text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                    {product.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Share Box */}
        <div className="rounded-lg bg-[#F6F9F7] p-3 sm:p-8 border border-gray-200 flex flex-col items-center justify-center pt-10">
          <h3 className="text-lg font-semibold text-[#1A9D5B]">
            সহজ ও নিরাপদ অনলাইন শপিং
          </h3>

          <h2 className="mt-3 text-2xl font-bold leading-snug text-green-800 text-center">
            দ্রুত ডেলিভারি, নির্ভরযোগ্য পণ্য ও সহজ কেনাকাটা
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 text-center">
            বিশুদ্ধ সেবা, উজ্জ্বলতার পণ্য, দ্রুত ডেলিভারি, সহজ এবং নিরাপদ
            পেমেন্ট — আমাদের প্রতিটি অনলাইন শপিং অভিজ্ঞতা নিশ্চিত করতে আমরা
            প্রতিশ্রুতিবদ্ধ।
          </p>

          <p className="mt-6 text-md font-bold tracking-wider text-gray-700">
            SHARE US
          </p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 transition hover:bg-[#1A9D5B] hover:text-white"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              aria-label="Pinterest"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 transition hover:bg-[#1A9D5B] hover:text-white"
            >
              <FaPinterest />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 transition hover:bg-[#1A9D5B] hover:text-white"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              aria-label="Share"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 transition hover:bg-[#1A9D5B] hover:text-white"
            >
              <FaShare />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}