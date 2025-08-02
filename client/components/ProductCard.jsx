"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-[5px] shadow-[2px_2px_3px_#ccc] rounded-[10px] bg-white p-[10px]">
      <div className="relative w-full h-[200px]">
        {product.images[0] && <Image
          src={product.images[0]}
          alt={product.title}
          fill
          priority
          className="object-cover"
        />}
      </div>
      <div>
        <h3 className="font-bold text-[13px] uppercase">{product.title}</h3>
        {/**<p className="text-[13px] text-[#ccc]">
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </p>*/}
      </div>
      <div className="flex sm:flex-row sm:justify-between sm:items-center flex-col gap-[10px]">
        <h3 className="font-bold text-[14px] text-[#f97a00]">
          &#8358;{product.price}
        </h3>
        <button
          onClick={() => router.push(`product/${product.id}`)}
          className="text-[12px] border border-[#386641] border-solid p-[5px] rounded-[5px] text-[#386641]"
        >
          Preview
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
