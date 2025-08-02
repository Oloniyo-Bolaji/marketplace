"use client";

import Marquee from "react-fast-marquee";
import React from "react";

const Announcement = () => {
  return (
    <div className="mt-[10px] py-[10px] bg-[#fed16a] text-[13px]">
      <Marquee>
        I can be a React component, multiple React components, or just some
        text. This will be used for announcement by admin and can or cannt show
        using conditional statement
      </Marquee>
    </div>
  );
};

export default Announcement;
