"use client";

import Announcement from "@/components/Announcement";
import Auctions from "@/components/Auctions";
import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [newPosts, setNewPosts] = useState([]);
  const [availablePosts, setAvailablePosts] = useState([]);
  const [auctionPosts, setAuctionPosts] = useState([])

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
      setNewPosts(newproducts);
    };

    const fetchAvailablePosts = async () => {
      const res = await fetch("/api/posts", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;
      const available = data.filter((d) => d.status === true);
      setAvailablePosts(available);
    };

    const fetchAuctions = async () => {
      const res = await fetch("/api/auctions", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;
      console.log(data);
      setAuctionPosts(data)
    };

    fetchAvailablePosts();
    fetchNewPosts();
    fetchAuctions();
  });

  return (
    <div className="text-black">
      <Header />
      <Announcement />
      <main className="p-[30px] flex flex-col gap-[20px]">
        {/**Auction products */}
        <Auctions products={auctionPosts}/>
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
