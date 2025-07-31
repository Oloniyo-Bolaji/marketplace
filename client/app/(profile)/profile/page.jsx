"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const page = () => {
  const user = useUser();
  const [profileDetails, setProfileDetails] = useState();

  
  useEffect(() => {
    const getprofileDetails = async () => {
      if (user?.user?.id) {
        const res = await fetch(`/api/auth/${user?.user?.id}`);
        const result = await res.json();
        setProfileDetails(result.data);
        console.log(result.data);
      }
    };

    getprofileDetails();
  }, [user]);

  return (
    <div>
      <h1>{user.user?.firstName}</h1>
    </div>
  );
};

export default page;
