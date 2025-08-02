"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import ProductsForm from "@/components/ProductsForm";

const page = () => {
  return (
    <div className="py-[10px] sm:px-[100px] px-[30px]">
      <h2 className="text-center uppercase text-[#386644] text-[13px]">Post your product for sale</h2>
      <ProductsForm />
    </div>
  );
};

export default page;
