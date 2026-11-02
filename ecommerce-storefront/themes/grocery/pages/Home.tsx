import SplitHero from '../sections/SplitHero';
import CategoryCarousel from '../sections/CategoryCarousel';
import TopSelling from '../sections/TopSelling';
import FlashSaleTimer from '../sections/FlashSaleTimer';
import FlashSaleProducts from '../sections/FlashSaleProducts';
import BestProducts from '../sections/BestProducts';
import AllProducts from '../sections/AllProducts';
import BestSelling from '../sections/BestSelling';
import Layout from '../src/Layout';
import '../src/styles.css';

export default function Home() {
  return (
      <>
        <SplitHero />
        <CategoryCarousel />
        <FlashSaleTimer />
        <FlashSaleProducts />
        <div className='bg-white'>
        <BestProducts />
        <AllProducts />
        </div>
        <BestSelling />
      </>

  );
}