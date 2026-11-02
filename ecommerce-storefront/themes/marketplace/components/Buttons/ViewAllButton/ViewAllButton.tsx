import { Button } from "@/components/Button";

interface ViewAllButtonProps {
  href: string;
}

export default function ViewAllButton({ href }: ViewAllButtonProps) {
  return (
    <Button
      href={href}
      className="bg-[#1A9D5B] lg:px-10 px-5 lg:py-3 py-1.5 rounded-lg text-sm font-semibold text-white transition hover:bg-[#17834d]"
    >
      VIEW ALL
    </Button>
  );
}