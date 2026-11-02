import Image from "next/image";
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#145C38] text-white">
      {/* Footer Main */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1500px] px-5 py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            
            {/* About */}
            <div>
              {/* Logo */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-12 w-12 bg-[#317050] flex items-center justify-center rounded-full">
                <Leaf className="text-3xl text-green-400" />
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-wide">
                    GOFRESH
                  </span>

                  <span className="text-[10px] tracking-[2px] text-gray-300">
                    BEST ORGANIC FOOD
                  </span>
                </div>
              </div>

              {/* About Text */}
              <p className="mb-6 max-w-lg text-md leading-6 text-gray-300">
                We offer fast delivery, secure payment, easy returns,
                and the best quality products at affordable prices.
              </p>

              {/* Contact */}
              <ul className="flex flex-col gap-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-green-400"
                  />

                  <span>
                    গুলশান সার্কেল ২, ঢাকা, বাংলাদেশ
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone
                    size={18}
                    className="shrink-0 text-green-400"
                  />

                  <span>Phone: +8801714431260</span>
                </li>

                <li className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="shrink-0 text-green-400"
                  />

                  <span>Email: contact@advaxe.com</span>
                </li>
              </ul>
            </div>

    {/* support and usefull link */}
    <div className="flex lg:justify-between md:gap-56 gap-30">
            {/* Support */}
            <div>
              <h4 className="mb-5 text-md font-semibold">
                SUPPORT
                  <span className="mt-2 block h-[2.3px] w-10 bg-green-400" />
              </h4>

<ul className="flex flex-col gap-3">
  <li>
    <a
      href="#"
      className="
        inline-block
        text-sm text-gray-300
        transition-all duration-200 ease-out
        hover:translate-x-2
        hover:text-green-400
      "
    >
      Privacy Policy
    </a>
  </li>

  <li>
    <a
      href="#"
      className="
        inline-block
        text-sm text-gray-300
        transition-all duration-200 ease-out
        hover:translate-x-2
        hover:text-green-400
      "
    >
      Returns Policy
    </a>
  </li>
</ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="mb-5 text-md font-semibold tracking-wide">
                USEFUL LINK
                                  <span className="mt-2 block h-[2.3px] w-10 bg-green-400" />
              </h4>
<ul className="flex flex-col gap-3">
  <li>
    <a
      href="#"
      className="
        inline-block
        text-sm text-gray-300
        transition-all duration-200 ease-out
        hover:translate-x-2
        hover:text-green-400
      "
    >
      Home
    </a>
  </li>

  <li>
    <a
      href="#"
      className="
        inline-block
        text-sm text-gray-300
        transition-all duration-200 ease-out
        hover:translate-x-2
        hover:text-green-400
      "
    >
      Shop
    </a>
  </li>

  <li>
    <a
      href="#"
      className="
        inline-block
        text-sm text-gray-300
        transition-all duration-200 ease-out
        hover:translate-x-2
        hover:text-green-400
      "
    >
      Categories
    </a>
  </li>

  <li>
    <a
      href="#"
      className="
        inline-block
        text-sm text-gray-300
        transition-all duration-200 ease-out
        hover:translate-x-2
        hover:text-green-400
      "
    >
      My Account
    </a>
  </li>
</ul>
            </div>
    </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#114E30]">
        <div className="mx-auto max-w-[1200px] px-5 py-5">
          <div
            className="
              flex flex-col
              items-center justify-between
              gap-4
              text-center
              md:flex-row
              md:text-left
            "
          >
            {/* Copyright */}
            <p className="text-xs text-gray-400">
              Company © 2026. Developed by Sayef Ahmed.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Bkash_Logo.svg/1200px-Bkash_Logo.svg.png"
                alt="bKash"
                width={55}
                height={28}
                className="h-7 w-auto object-contain"
              />

              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Nagad-Logo.svg/1200px-Nagad-Logo.svg.png"
                alt="Nagad"
                width={55}
                height={28}
                className="h-7 w-auto object-contain"
              />

              <span
                className="
                  flex h-7 items-center
                  rounded-md bg-[#6A1B9A]
                  px-3
                  text-xs font-semibold
                  text-white
                "
              >
                রকেট
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}