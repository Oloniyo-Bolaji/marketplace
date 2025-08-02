"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { IoIosSend, IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Product = ({ product }) => {
  const router = useRouter();
  const [sellersPosts, setSellersPosts] = useState([]);

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const day = date.toLocaleDateString("en-GB");
    return `Posted at ${time} on ${day}`;
  };

  useEffect(() => {
    if (!product?.user?.id) return;

    const fetchUserPosts = async () => {
      const res = await fetch(`/api/user/${product.user.id}/posts`, {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;
      console.log(data);
      setSellersPosts(data);
    };
    fetchUserPosts();
  }, [product?.user?.id]);

  return (
    <div className="flex gap-[20px] sm:flex-row flex-col sm:px-[50px] px-[30px] py-[10px]">
      <div>
        <button onClick={() => router.back()}>
          <IoMdArrowBack />
        </button>
      </div>
      {/* Images */}
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
                <div className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-[10px] border-[2px] border-[#386641] overflow-hidden mx-auto">
                  <Image
                    src={image}
                    alt="product image"
                    sizes="(max-width: 640px) 300px, 400px"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="sm:grid grid-cols-4 gap-[10px] hidden ">
          {product.images?.slice(0, 4).map((image, index) => {
            return (
              <div
                key={index}
                className="relative w-full h-[120px] shadow-[2px_2px_4px_#ccc] mx-auto rounded-[5px]"
              >
                <Image
                  src={image}
                  alt="product image"
                  sizes="(min-width: 640px) 25vw"
                  priority
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Other information */}
      <div className="flex flex-col gap-[5px]">
        <div>
          <h2 className="uppercase text-[#386641] text-[15px] font-bold">
            {product.title}
          </h2>
          <p className="text-[#38664170] text-[12px] text-justify leading-[20px]">
            {product.description}
          </p>
        </div>
        <div>
          <h1 className="uppercase text-[#386641] text-[13px] font-bold">
            PRICE
          </h1>
          <h2 className="text-[#f97a00] text-[16px] font-bold">
            &#8358;{product.price}
          </h2>
        </div>
        <div>
          <h1 className="uppercase text-[#386641] text-[13px] font-bold">
            Category
          </h1>
          <h2 className="text-[#38664170] text-[12px]">{product.category}</h2>
        </div>
        <div>
          <h1 className="uppercase text-[#386641] text-[13px] font-bold">
            sellers's location
          </h1>
          <h2 className="text-[#38664170] text-[12px]">
            {product.user?.location}
          </h2>
        </div>
        <div>
          <button className="uppercase bg-[#f97a00] text-[10px] w-[150px] text-white py-[10px] gap-[10px] flex-center">
            <span>Message seller</span>
            <span className="text-[15px]">
              <IoIosSend />
            </span>
          </button>
        </div>
        <div>
          <h2 className="text-[#38664170] text-[12px]">
            {formatDateTime(product.createdAt)}
          </h2>
        </div>
        <div className="w-full">
          <div className="sm:ml-auto w-fit text-left">
            <h3 className="uppercase text-[#386641] text-[13px] font-bold underline pb-[5px]">
              more from seller{" "}
              <span className="lowercase">{product.user?.username}</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 mt-[5px]">
              {sellersPosts?.slice(0, 3).map((post) => {
                const { id, images } = post;
                if (!images || !images[0]) return null;
                return (
                  <div
                    key={id}
                    className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-[10px] shadow-[2px_2px_4px_#ccc] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:brightness-95"
                    onClick={() => router.push(`/product/${id}`)}
                  >
                    <Image
                      src={images[0]}
                      alt="product image"
                      sizes="(min-width: 640px) 120px, 100px"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
