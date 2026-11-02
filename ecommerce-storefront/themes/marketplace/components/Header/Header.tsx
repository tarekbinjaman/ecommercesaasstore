'use client';
import { useState } from "react";
import { FaLeaf, FaRegUser, FaShoppingBag } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "../Mobilesidebar/MobileSidebar";

export function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <>
      <div className="lg:py-6 py-4 flex flex-col lg:flex-row justify-center items-center lg:gap-10 gap-0 lg:bg-white bg-[#145C38]">
{/* Logo and text */}
<div className="w-full lg:w-auto flex justify-between items-center px-8 lg:px-0 mb-6 lg:mb-0">

  {/* sidebar trigger */}
  <div className="lg:hidden">
    <button onClick={() => setIsMobileSidebarOpen(true)}>
    <RxHamburgerMenu className="text-3xl font-bold" />
    </button>
  </div>

{/* Search and logo */}
<div className="flex gap-2 items-center">
<div className="border-white xl:w-12 xl:h-12 w-10 h-10 rounded-full flex items-center justify-center bg-[#377456] lg:bg-green-600">
<FaLeaf className="xl:w-7 xl:h-7 w-5 h-5" />
</div>
<div className="text-center">
<p className="text-xl xl:text-3xl lg:text-2xl text-white lg:text-green-600 font-bold">GOFRESH</p>
<p className="text-xs xl:text-sm text-white lg:text-green-600">BEST ORGANIC FOOD</p>
</div>
</div>

{/* user icon */}
  <div className=" lg:hidden">
<div className="group flex gap-2">
<FaRegUser className="text-white group-hover:text-green-600 w-6 h-6 cursor-pointer transition duration-300" />
<p className="text-green-900 group-hover:text-green-600 text-sm font-semibold cursor-pointer lg:pb-3 transition duration-200 hidden xl:block">LOGIN / REGISTER</p>
</div>
  </div>

</div>

{/* search input field */}
<div
className="relative flex h-11 w-11/12 2xl:max-w-[935px] xl:max-w-[800px] lg:max-w-[600px] items-center rounded-full
border-2 bg-[#f4f8f6] px-5 shadow-sm
focus-within:border-green-600 transition duration-300"
>
<input
type="text"
placeholder="Search for products..."
className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-500"
/>

<button className="absolute -right-0.5 flex h-11 w-15 items-center justify-center rounded-r-full bg-green-600 text-white hover:bg-green-700 transition duration-300">
<IoSearchSharp className="text-white h-5 w-5" />
</button>
</div>

{/* user register/login and cart icon */}
<div className="flex gap-4">
  <div className="hidden lg:block">
<div className="group flex gap-2">
<FaRegUser className="text-green-900 group-hover:text-green-600 w-6 h-6 cursor-pointer transition duration-300" />
<p className="text-green-900 group-hover:text-green-600 text-sm font-semibold cursor-pointer lg:pb-3 transition duration-200 hidden xl:block">LOGIN / REGISTER</p>
</div>
  </div>
<div className="relative hidden lg:block">
<FaShoppingBag className="text-green-900 hover:text-green-700 w-6 h-6 cursor-pointer transition duration-300" />
<div className="absolute top-0 -right-2 h-4 w-4 bg-green-600 rounded-full flex items-center justify-center border-white border-2">
<span className="text-xs">0</span>
</div>
</div>
</div>
</div>
<MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </>
  );
}
