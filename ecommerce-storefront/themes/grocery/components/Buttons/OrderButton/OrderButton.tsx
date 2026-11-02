import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";

interface OrderButtonProps {
  href?: string;
  children?: React.ReactNode;
}

export default function OrderButton({
  href = "/",
  children = "অর্ডার করুন",
}: OrderButtonProps) {
  return (
    <Link
      href={href}
      className="
        flex gap-2 w-full items-center justify-center
        rounded-md bg-[#1A9D5B]
        px-3 py-2
        text-sm font-semibold text-white
        transition
        hover:bg-[#17834d]
      "
    >
      <FaBasketShopping/>
      {children}
    </Link>
  );
}