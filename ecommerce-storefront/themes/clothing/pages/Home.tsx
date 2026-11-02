import '../src/styles.css';
import Hero from '../sections/Hero';
import BrowseBy from '../sections/Browseby';
import ProductSections from '../sections/ProductSections';
import FlashSale from '../sections/FlashSale';
import TrustSection from '../sections/TrustSection ';

export default function Home() {
  return (
    <div>
      {/* <SplitHero />
      <CategoryCarousel />
      <FlashSale />
      <FlashSaleProducts />
      <BestProducts />
      <AllProducts />
      <BestSelling /> */}
      <Hero/>
      <BrowseBy />
      <ProductSections />
      <FlashSale />
      <TrustSection />
    </div>
  );
}