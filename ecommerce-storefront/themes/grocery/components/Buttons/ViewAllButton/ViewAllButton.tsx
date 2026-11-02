import { Button } from "@/components/Button";
import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
}

export default function ViewAllButton({ href }: ViewAllButtonProps) {
  // console.log("Href", href)
  return (
    <Link href={href}>
    <Button
      className="bg-[#1A9D5B] lg:px-10 px-5 lg:py-3 py-1.5 rounded-lg text-sm font-semibold text-white transition hover:bg-[#17834d] cursor-pointer"
    >
      VIEW ALL
    </Button>
    </Link>
  );
}