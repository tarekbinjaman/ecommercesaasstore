import React from 'react';
import { Header } from '../components/Header/Header';
import SubHeader from '../components/Header/SubHeader';
import Footer from '../components/Footer/Footer';
import MobileBottomNav from '../components/MobileBotoom/MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    console.log('🟥 Layout rendered');

  return (
    <>
    <header className='fixed z-100 top-0 left-0 right-0 bg-white shadow-md'>
      {/* <Header />
      <SubHeader /> */}
      <h1 className='text-black'>Marketplace header</h1>
    </header>

      <main className='lg:mt-50 mt-42'>{children}

                {/* <MobileBottomNav /> */}
      </main>

      <footer>
        {/* <Footer /> */}
        <h1 className='text-black'>THis is marketplace footer</h1>
      </footer>
    </>
  );
}