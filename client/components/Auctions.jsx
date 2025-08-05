"use client";

import React from "react";
import AuctionCard from "./AuctionCard";

const Auctions = ({products}) => {
  return (
    <section>
      <div className="bg-[#fed16a] py-[5px] my-[10px]">
        <h3 className="text-center font-bold uppercase text-[#386641]">
          AUCTIONS
        </h3>
      </div>
      <div className="w-full grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[10px]">
        {products?.map((product) => {
          return <AuctionCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default Auctions;
