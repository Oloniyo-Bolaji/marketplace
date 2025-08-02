"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import { usePathname } from "next/navigation";
import BasicSelect from "@/ui-components/SelectForm";

const Products = ({ title, products }) => {
  const pathname = usePathname();
  const [categoryProducts, setCategoryProducts] = useState([]);

  const handleCategoryClick = async (category) => {
    const res = await fetch("/api/posts", {
      cache: "no-store",
    });
    const result = await res.json();
    const data = result.data;
    const catProd = data.filter((d) => d.category === category);
    console.log(catProd);
    setCategoryProducts(catProd);
  };

  const handleSortChange = async (value) => {
     const res = await fetch("/api/posts", {
      cache: "no-store",
    });
    const result = await res.json();
    const data = result.data;
    if(value === "Newest"){
     setCategoryProducts()
    }
    console.log("Selected sort option:", value);
  };

  return (
    <section className="w-full">
      <div className="bg-[#fed16a] py-[5px] my-[10px]">
        <h3 className="text-center font-bold uppercase text-[#386641]">
          {title}
        </h3>
      </div>
      {pathname === "/explore" && (
        <div className="my-[10px] flex flex-col gap-[10px]">
          <div>
            <Categories handleCategoryClick={handleCategoryClick} />
          </div>
          <div className="flex justify-end">
            <BasicSelect />
          </div>
        </div>
      )}
      <div className="w-full grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[10px]">
        {(categoryProducts.length > 0 ? categoryProducts : products)?.map(
          (product) => {
            return <ProductCard key={product.id} product={product} />;
          }
        )}
      </div>
    </section>
  );
};

export default Products;
