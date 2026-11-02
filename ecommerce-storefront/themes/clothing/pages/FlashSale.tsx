import '../src/styles.css';
import FlashSaleTimer from '../sections/FlashSaleTimer';
import FlashSalePageProduct from '../sections/FlashSalePageProduct';

export default function FlashSale() {
  return (
    <div className="mt-10 min-h-screen pb-24 font-sans text-gray-800 antialiased">
      <div className="mx-auto w-[95%] max-w-[1365px]">
        {/* Flash Sale Timer at the top */}
        <div className="mb-8">
          <FlashSaleTimer />
        </div>

        {/* Flash sale products with sorting + pagination */}
        <FlashSalePageProduct />
      </div>
    </div>
  );
}
