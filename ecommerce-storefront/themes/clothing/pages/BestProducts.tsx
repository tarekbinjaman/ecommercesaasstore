import '../src/styles.css';
import BestProductsBanner from '../sections/BestProductsBanner';
import BestProductsPageProduct from '../sections/BestProductsPageProduct';

export default function BestProducts() {
  return (
    <div className="mt-10 min-h-screen pb-24 font-sans text-gray-800 antialiased">
      <div className="mx-auto w-[95%] max-w-[1365px]">
        {/* Best products banner at the top */}
        <div className="mb-8">
          <BestProductsBanner />
        </div>

        {/* Best seller products with sorting + pagination */}
        <BestProductsPageProduct />
      </div>
    </div>
  );
}
