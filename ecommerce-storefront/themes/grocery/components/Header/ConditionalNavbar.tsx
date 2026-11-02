'use client'
import { shouldHideTopNav } from "@/lib/shouldHideTopNav";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (shouldHideTopNav(pathname)) return null;
  return <TopNav />;    }