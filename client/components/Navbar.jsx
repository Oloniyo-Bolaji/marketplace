"use client";

import Link from "next/link";
import React from "react";
import { LuMessageCircleMore, LuMessageSquareMore } from "react-icons/lu";
import { FaCartArrowDown, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useUser, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FaMessage } from "react-icons/fa6";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import { Pacifico } from "next/font/google";
import IconBadge from "@/ui-components/IconBadge";
import { FaShop } from "react-icons/fa6";
import { MdBuild } from "react-icons/md";
import IconTooltip from "@/ui-components/IconTooltip";
import { usePathname } from "next/navigation";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const pathname = usePathname();
  const user = useUser();

  return (
    <nav className="w-full h-[50px] flex justify-between items-center bg-[#386644] p-[30px]">
      <div>
        <Link
          href="/"
          className={`${pacifico.className} font-bold text-[#f97a00]`}
        >
          MarketPlace
        </Link>
      </div>
      {pathname === "/explore" && (
        <div className="relative w-[350px] max-w-md sm:block hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white placeholder:text-[13px] pr-10 pl-4 py-[5px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
            <CiSearch size={20} />
          </span>
        </div>
      )}
      <div className="flex items-center gap-4">
        <IconTooltip
          title="Explore"
          icon={
            <FaShop className="w-5 h-5 text-white hover:text-orange-400 transition-colors duration-200" />
          }
          link="/explore"
        />

        <IconTooltip
          title="Artisans"
          icon={
            <MdBuild className="w-5 h-5 text-white hover:text-orange-400 transition-colors duration-200" />
          }
          link="/artisans"
        />
        
        <SignedIn>
          <IconBadge
            title="Orders"
            icon={
              <FaMessage className="w-5 h-5 text-white hover:text-orange-400 transition-colors duration-200" />
            }
            link="/orders"
          />
          <Link href="/profile" className="block">
            <Image
              src={user.user?.imageUrl}
              alt="User profile"
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
        </SignedIn>

        <SignedOut>
          <Link
            href="/sign-up"
            className="text-white hover:text-orange-400 transition-colors duration-200"
          >
            <FaUserAlt className="w-5 h-5" />
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
