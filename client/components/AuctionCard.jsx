"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getTime } from "@/lib/formatDateTime";
import { formatSingleTime } from "@/lib/formatDateTime";
import { useRouter } from "next/navigation";

const AuctionCard = ({ product }) => {
  const router = useRouter();
  const [startTimeLeft, setStartTimeLeft] = useState(
    getTime(product.startTime)
  );
  const [endTimeLeft, setEndTimeLeft] = useState(getTime(product.endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setStartTimeLeft(getTime(product.startTime));
      setEndTimeLeft(getTime(product.endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [product.startTime, product.endTime]);

  console.log(product);
  return (
    <div
      style={{
        backgroundImage: `url(${product.images[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex gap-[10px]  rounded-[5px] bg-white z-0 "
    >
      <div className="z-9999 bg-[#38664470] w-full h-full flex-center flex-col rounded-[5px] gap-[5px] py-[20px]">
        <h1 className="font-bold text-[13px] uppercase text-white">{product.title}</h1>
        <span className="font-bold text-[14px] text-[#f97a00]">&#8358;{product.price}</span>
        <button
          onClick={() => router.push(`auction/${product.id}`)}
          className="text-[12px] bg-[#386641] hover:text-[#386641] hover:bg-white text-white p-[5px] rounded-[5px] text-[#386641]"
        >
          View Auction
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
