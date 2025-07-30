"use client";

import React from "react";
import ProductCard from "./ProductCard";

const Products = ({ title, products }) => {
  return (
    <section className="w-full">
      <div className="bg-[#af7ac5] py-[5px] my-[10px]">
        <h3 className="text-center font-bold uppercase ">{title}</h3>
      </div>
      <div className="w-full grid sm:grid-cols-4 grid-cols-2 gap-[10px]">
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default Products;
