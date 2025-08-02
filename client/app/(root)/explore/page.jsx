"use client";

import Categories from "@/components/Categories";
import Products from "@/components/Products";
import React, { useEffect, useState } from "react";

const page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const res = await fetch("/api/posts", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;
      setPosts(data);
    };

    fetchPosts();
  });

  return (
    <div className="px-[30px]">
      <div className="w-full px-[10px]">
        <Products title="Explore" products={posts}/>
      </div>
    </div>
  );
};

export default page;
