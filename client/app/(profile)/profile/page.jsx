"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const page = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <h1>{user.user?.firstName}</h1>
    </div>
  );
};

export default page;
