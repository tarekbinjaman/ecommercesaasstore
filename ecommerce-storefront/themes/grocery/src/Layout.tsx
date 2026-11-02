"use client";
import React from "react";
import { Header } from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBotoom/MobileBottomNav";
import { usePathname } from "next/navigation";
import { shouldHideSubHeader } from "@/lib/shouldHideSubHeader";
import ConditionalSubHeader from "../components/Header/ConditionalSubHeader";
import ConditionalNavbar from "../components/Header/ConditionalNavbar";
import { useHideOnScroll } from "@/lib/hooks/useScrollDirection";
import { MobileNavProvider } from "@/lib/context/MobileNavContext";
import MobileSearchBar from "../components/Header/MobileSearchBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const hide = shouldHideSubHeader(pathname);
  const hideHeader = useHideOnScroll();

  return (
    <MobileNavProvider>
      <MobileSearchBar />

      <header
        className={[
          "fixed z-40 top-0 left-0 right-0 bg-white shadow-md",
          "transition-transform duration-300 ease-out will-change-transform",
          hideHeader ? "-translate-y-full" : "translate-y-0",
          "lg:translate-y-0",
        ].join(" ")}
      >
        <ConditionalNavbar />
        <Header />
        <ConditionalSubHeader />
      </header>

      <main
        className={`${hide ? "mt-10 md:mt-16 lg:mt-20" : "mt-26 lg:mt-50"} pb-20 lg:pb-0`}
      >
        {children}
        <MobileBottomNav />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </MobileNavProvider>
  );
}