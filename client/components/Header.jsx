import React from "react";

const Header = () => {
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

  return (
    <header className="w-full flex">
      <div className="w-[25%] bg-[white] flex items-center flex-col p-[25px]">
        <h3 className="font-bold text-[13px] uppercase text-[#af7ac5]">
          Categories
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
            No 1 place to buy and sell your products and meet artisans close to
            you. Buy & Sell Anything Easily.
          </h3>
          <button>Call to Action</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
