"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";

import "swiper/css";
import Image from "next/image";
const Product = ({ product }) => {
  return (
    <div className="flex gap-[20px]">
      {/**Images and description */}
      <div>
        <div className="w-[300px] bg-[yellow]">
          <Swiper
            className="mySwiper"
            modules={[Navigation]}
            spaceBetween={50}
            navigation
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {product.images?.map((image, index) => {
              return (
                <SwiperSlide>
                  <Image
                    src={image}
                    alt="product image"
                    width={100}
                    height={100}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
      </div>
      {/**Other information */}
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
