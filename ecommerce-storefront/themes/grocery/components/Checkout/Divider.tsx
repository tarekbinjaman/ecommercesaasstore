import { cn } from '@/lib/Checkout/utils';

export default function Divider({ className }: { className?: string }) {
  return <div className={cn('my-5 h-px w-full bg-gray-100', className)} />;
}