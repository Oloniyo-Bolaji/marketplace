"use client";

import ProductPage from "@/components/ProductPage";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;

      setProduct(data);
    };

    fetchProduct();
  });

  return (
    <div>
      <ProductPage  product={product}/>
    </div>
  );
};

export default Product;
