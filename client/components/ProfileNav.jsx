"use client";

import IconTooltip from "@/ui-components/IconTooltip";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";

const ProfileNav = () => {
  const pathname = usePathname();

  const page =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname === "/settings"
      ? "Settings"
      : "Profile";

  return (
    <nav className="w-full h-[50px] flex-between sm:px-[50px] px-[10px]">
      <div className="sm:text-[30px] text-[15px]">
        <IconTooltip title="Back" icon={<IoMdArrowBack />} link="/" />
      </div>
      <div>
        <h2>{page}</h2>
      </div>
      <div className="flex items-center gap-[10px] sm:text-[30px] text-[15px]">
        <IconTooltip
          title="Settings"
          icon={<IoMdSettings />}
          link="/settings"
        />
        <IconTooltip
          title="Dashboard"
          icon={<MdSpaceDashboard />}
          link="/dashboard"
        />
      </div>
    </nav>
  );
};

export default ProfileNav;
