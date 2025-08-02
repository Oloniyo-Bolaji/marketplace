"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Categories = ({ handleCategoryClick }) => {
  const categories = [
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

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={5}
      loop={true}
      speed={3000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      freeMode={true}
      grabCursor={true}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
      }}
    >
      {categories.map((cat, index) => (
        <SwiperSlide key={index}>
          <div
            onClick={() => {
              handleCategoryClick(cat);
            }}
            className="bg-[#38664130] text-center p-[6px] rounded-[15px] text-[14px] text-[#386641] cursor-pointer"
          >
            {cat}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Categories;
