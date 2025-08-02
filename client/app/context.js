"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch("/api/user/{}", {
        cache: "no-store",
      });
      const result = await res.json();
      const data = result.data;
      const catProd = data.filter((d) => d.category === category);
      console.log(catProd);
      setCategoryProducts(catProd);
    };
  });
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
