"use client";

import Announcement from "@/components/Announcement";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const category = [
    "Beauty",
    "Furniture",
    "Electrical Appliances",
    "Fashion Accessories",
    "Tools & Equipments",
    "Computers & Accessories",
    "Agriculture & Food",
    "Education & Office",
    "Miscellaneous",
  ];
  const [newPosts, setNewPosts] = useState([]);
  const [availablePosts, setAvailablePosts] = useState([]);

  useEffect(() => {
    const fetchNewPosts = async () => {
      const res = await fetch("/api/posts", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;

      const now = new Date();
      const twoHoursInMs = 2 * 60 * 60 * 1000;

      const newproducts = data.filter((d) => {
        const createdAt = new Date(d.createdAt);
        return now - createdAt <= twoHoursInMs;
      });
      console.log(newproducts);
      setNewPosts(newproducts);
    };

    const fetchAvailablePosts = async () => {
      const res = await fetch("/api/posts", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;
      const available = data.filter((d) => d.status === true);
      console.log(available);
      setAvailablePosts(available);
    };

    fetchAvailablePosts();
    fetchNewPosts();
  });

  return (
    <div className="text-black">
      <header className="w-full flex">
        <div className="w-[25%] bg-[white] flex items-center flex-col p-[25px]">
          <h3 className="font-bold text-[13px] uppercase text-[#af7ac5]">
            Popular Category
          </h3>
          <div className="list-none text-[13px] leading-[30px] text-[#af7ac5]">
            {category.map((cat, index) => {
              return <li key={index}>{cat}</li>;
            })}
          </div>
        </div>
        <div className="w-[75%] p-[10px]">
          <div className="rounded-[15px] w-full bg-[#fed16a] h-full flex items-center justify-center">
            <h3>
              No 1 place to buy and sell your products and meet artisans close
              to you. Buy & Sell Anything Easily.
            </h3>
            <button>Call to Action</button>
          </div>
        </div>
      </header>
      <Announcement />
      <main className="p-[30px] flex flex-col gap-[20px]">
        {/**New products */}
        {newPosts.length > 0 && (
          <Products title="What's new" products={newPosts} />
        )}
        {/**Available product that are no longer new */}
        <Products title="Available Products" products={availablePosts} />
      </main>
    </div>
  );
};

export default Home;
