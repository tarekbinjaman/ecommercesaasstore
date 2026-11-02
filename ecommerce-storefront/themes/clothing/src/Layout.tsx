'use client'
import React from 'react';
import { Header } from '../components/Header/Header';
import SubHeader from '../components/Header/SubHeader';
import Footer from '../components/Footer/Footer';
import MobileBottomNav from '../components/MobileBotoom/MobileBottomNav';
import { usePathname } from 'next/navigation';
import { shouldHideSubHeader } from '@/lib/shouldHideSubHeader';
import { useHideOnScroll } from '@/lib/hooks/useScrollDirection';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
    const hide = shouldHideSubHeader(pathname);
    const hideHeader = useHideOnScroll();
  return (
    <>
          <header
        className={[
          "fixed z-40 top-0 left-0 right-0 bg-white shadow-md",
          "transition-transform duration-300 ease-out will-change-transform",
          hideHeader ? "-translate-y-full" : "translate-y-0",
          "lg:translate-y-0",
        ].join(" ")}
      >
       
       
       <Header />
    {/*  <SubHeader /> */}
      {/* <h1 className='text-black'>Clothing header</h1> */}
    </header>

      <main className={` ${pathname === '/' && 'mt-42'} ${pathname.startsWith('/products') && 'lg:mt-20 mt-30'}
      ${pathname.startsWith('/categories') && 'lg:mt-40 mt-40'}
      ${pathname.startsWith('/productDetail') && 'lg:mt-30 mt-30'} `}>{children}

                {/* <MobileBottomNav /> */}
      </main>

      <footer className='mt-auto'>
        <Footer />
      </footer>
    </>
  );
}