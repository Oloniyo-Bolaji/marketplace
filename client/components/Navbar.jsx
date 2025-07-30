"use client";

import Link from "next/link";
import React from "react";
import { LuMessageCircleMore, LuMessageSquareMore } from "react-icons/lu";
import { FaCartArrowDown, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { FaMessage } from "react-icons/fa6";
import Image from "next/image";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  const user = useUser();
  console.log(user);
  return (
    <nav className="w-full h-[70px] flex flex-col">
      <div className="flex justify-between items-center bg-[#10b981] h-[60%] p-[30px]">
        <div className="relative w-[350px] max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white placeholder:text-[13px] pr-10 pl-4 py-[5px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
            <CiSearch size={20} />
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[#f97316]">MarketPlace</h1>
        </div>
        <div className="flex items-center gap-[10px]">
          {user.isSignedIn ? (
            <Link href="/profile">
              <Image
                src={user.user.imageUrl}
                alt="user Logo"
                width={25}
                height={25}
                className="rounded-full bg-inherit"
              />
            </Link>
          ) : (
            <Link href="/sign-up" className="nav-links">
              <span>
                <FaUserAlt className="w-[15px] h-[15px] text-white" />
              </span>
            </Link>
          )}

          <Link
            href="/"
            className="relative inline-flex items-center justify-center w-8 h-8"
          >
            <Badge badgeContent={4} color="secondary">
              <FaCartArrowDown color="action" />
            </Badge>
          </Link>

          <Link
            href="/"
            className="relative inline-flex items-center justify-center w-8 h-8"
          >
            <Badge color="secondary" variant="dot">
              <FaMessage color="action" />
            </Badge>
          </Link>
        </div>
      </div>

      <div className="flex-evenly bg-[#10b98140] h-[40%] py-[5px]">
        <Link href="/">
          <span className=" text-[15px] text-[#2563eb] font-bold">
            BUY/SELL
          </span>
        </Link>
        <Link href="/">
          <span className=" text-[15px]  text-[#facc15] font-bold">
            ARTISANS
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
