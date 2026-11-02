
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative mx-auto w-full px-4 py-3 sm:w-11/12 sm:px-0 lg:w-10/12">
      <div
        className="relative flex min-h-[320px] items-center overflow-hidden
          rounded-2xl border border-blue-100 bg-[#f4f7ff]
          bg-cover bg-center bg-no-repeat
          sm:min-h-[350px]
          md:min-h-[380px]
          lg:h-[400px] lg:min-h-0
          bg-[url('https://res.cloudinary.com/drvwvre57/image/upload/v1793180266/9033faf7-baf5-4df9-b657-56a027eeb85c_bfgyw8.png')]"
      >
        {/* Text content */}
        {/* <div className="relative z-10 w-full px-5 py-8 sm:px-8 md:w-[58%] md:px-10 lg:w-[52%] lg:px-12">
          <h2 className="max-w-[530px] 2xl:text-5xl xl:text-2xl font-bold leading-tight tracking-tight text-[#10264d] text-3xl lg:text-[30px]">
            Discover Products
            <br />
            From <span className="text-yellow-500 md:text-[#2167cb]">Around the World.</span>
          </h2>

          <p className="mt-3 2xl:max-w-[400px] xl:max-w-[350px] text-sm leading-[1.8] text-slate-600">
            Explore a curated marketplace featuring technology, fashion,
            beauty and lifestyle products from international brands.
          </p>

          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-2 rounded-full
              bg-[#2167cb] px-5 py-2.5 text-sm font-semibold text-white
              shadow-md transition hover:bg-[#1755b0]
              sm:px-6"
          >
            Explore Marketplace
            <span aria-hidden="true">→</span>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
