"use client";

import { usePathname } from "next/navigation";
import SubHeader from "./SubHeader";
import { shouldHideSubHeader } from "@/lib/shouldHideSubHeader";

export default function ConditionalSubHeader() {
  const pathname = usePathname();
  if (shouldHideSubHeader(pathname)) return null;
  return <SubHeader />;
}