"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const Product = ({ product }) => {
  return (
    <div className="flex gap-[20px] sm:flex-row flex-col sm:px-[50px] px-[30px] py-[10px]">
      {/* Images and description */}
      <div className="w-full sm:w-[40%] flex flex-col gap-[20px]">
        <div className="w-full">
          <Swiper
            className="mySwiper"
            modules={[Navigation]}
            spaceBetween={50}
            navigation
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {product.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-[10px] overflow-hidden mx-auto">
                  <Image
                    src={image}
                    alt="product image"
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h2 className="uppercase text-[#386641] text-[15px] font-bold">
            {product.title}
          </h2>
          <p className="text-[#38664170] text-[12px] text-justify">
            {product.description}
          </p>
        </div>
      </div>

      {/* Other information */}
      <div>
        <div>
          <h2>&#8358;{product.price}</h2>
        </div>
        <div>
          <h3>more from seller {product.user?.username}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
