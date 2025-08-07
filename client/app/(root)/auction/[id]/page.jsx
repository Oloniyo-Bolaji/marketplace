"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const id = params.id;
    const [product, setProduct] = useState({});
  
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/auctions/${id}`, {
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
      <h1>{product.title}</h1>
    </div>
  );
};

export default page;
