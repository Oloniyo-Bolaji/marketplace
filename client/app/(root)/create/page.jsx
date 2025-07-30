"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import ProductsForm from "@/components/ProductsForm";

const page = () => {
  return (
    <div>
      <ProductsForm />
    </div>
  );
};

export default page;
