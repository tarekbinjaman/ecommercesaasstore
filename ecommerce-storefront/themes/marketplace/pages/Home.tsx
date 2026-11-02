import SplitHero from '../sections/SplitHero';
import CategoryCarousel from '../sections/CategoryCarousel';
import TopSelling from '../sections/TopSelling';
import FlashSale from '../sections/FlashSaleTimer';
import FlashSaleProducts from '../sections/FlashSaleProducts';
import BestProducts from '../sections/BestProducts';
import AllProducts from '../sections/AllProducts';
import BestSelling from '../sections/BestSelling';
import Layout from '../src/Layout';
import '../src/styles.css';

export default function Home() {
    console.log('🟦 Home rendered');

  return (
    <div>
      {/* <SplitHero />
      <CategoryCarousel />
      <FlashSale />
      <FlashSaleProducts />
      <BestProducts />
      <AllProducts />
      <BestSelling /> */}
      <h1 className='text-black'>THis is marketplace</h1>
    </div>
  );
}