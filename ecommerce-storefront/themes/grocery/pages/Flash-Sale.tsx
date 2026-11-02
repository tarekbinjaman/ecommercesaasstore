import FlashSaleTimer from "../sections/FlashSaleTimer";
import FlashSaleProducts from "../sections/FlashSalePageProduct";

export default function FlashSale() {
  return (
    <div className="mt-26 min-h-screen font-sans text-gray-800 antialiased">
      <main className="pb-24">
        <div className="mx-auto w-[95%] max-w-[1365px]">
          {/* Flash Sale Timer at the top */}
          <div className="mb-8">
            <FlashSaleTimer />
          </div>

          {/* Product List with Filters */}
          <FlashSaleProducts />
        </div>
      </main>
    </div>
  );
}