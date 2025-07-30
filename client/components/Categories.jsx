"use client"


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Categories = () => {
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
    >
      {categories.map((cat, index) => (
        <SwiperSlide key={index}>
          <div className="bg-[#888] text-center p-[10px] rounded-[15px] text-[14px]">{cat}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Categories;
