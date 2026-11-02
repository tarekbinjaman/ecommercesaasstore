'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChatDotsFill } from 'react-icons/bs';
import { FaBasketShopping, FaLeaf, FaRegUser } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';

interface MobileBottomNavProps {
  cartCount?: number;
  onCategoryClick?: () => void;
}

const ITEM_BASE =
  'flex h-full flex-1 flex-col items-center justify-center gap-1 py-2 ' +
  'text-[11px] text-nav-muted transition-all duration-300 hover:text-primary';

const ITEM_ACTIVE = 'text-green-600';

export default function MobileBottomNav({
  cartCount = 0,
  onCategoryClick,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav
      id="mobileBottomNav"
      className="fixed z-100 bottom-0 left-0 z-bottom-nav hidden h-bottom-nav w-full
                 items-center border-t border-gray-border bg-white
                 shadow-bottom-nav max-[768px]:flex md:flex lg:hidden"
    >
      <Link href="/" className={`${ITEM_BASE} ${isActive('/') ? ITEM_ACTIVE : 'text-gray-400'}`}>
      <div className='h-9 w-9'>
        <IoMdHome className='text-green-700 h-full w-full' />
      </div>
        <span>Home</span>
      </Link>

      <Link href="/" className={`${ITEM_BASE} ${isActive('/chat') ? ITEM_ACTIVE : 'text-gray-400'} `}>
        <BsChatDotsFill className=" text-[19px]" />
        <span>Chat</span>
      </Link>

<Link
  href="/"
  aria-label="কার্ট"
  className={`${ITEM_BASE} ${isActive('/chat') ? ITEM_ACTIVE : 'text-gray-400'} -translate-y-8`}
>
  <span
    className="absolute left-1/2 top-1/2 flex h-[54px] w-[54px]
               -translate-x-1/2 -translate-y-1/2
               items-center justify-center rounded-full
               border-4 border-white bg-green-600
               text-[22px] text-white shadow-lg shadow-center-btn"
  >
    <FaBasketShopping className="text-xl text-white" />
  </span>

  <span
    className="absolute left-1/2 top-1/2 flex h-4 w-4
               -translate-y-[28px] translate-x-[12px]
               items-center justify-center rounded-full
               border-2 border-white bg-primary-dark
               bg-red-500
               text-[9px] leading-none text-white"
  >
    {cartCount}
  </span>
</Link>

      <button
        type="button"
        onClick={onCategoryClick}
        className={`${ITEM_BASE} ${isActive('/chat') ? ITEM_ACTIVE : 'text-gray-400'} `}
      >
        <FaLeaf className="fas fa-leaf text-[19px]" />
        <span>Organic</span>
      </button>

      <Link href="/" className={`${ITEM_BASE} ${isActive('/chat') ? ITEM_ACTIVE : 'text-gray-400'} `}>
        <FaRegUser className="far fa-user text-[19px]" />
        <span>Login</span>
      </Link>
    </nav>
  );
}