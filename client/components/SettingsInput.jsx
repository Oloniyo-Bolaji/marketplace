"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SettingsInput = ({ prop, placeholder, propDetail, open, setOpen }) => {
  const user = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(prop ?? "");
  }, [prop]);

  const handleSubmit = async (inputValue) => {
    try {
      const res = await fetch(`/api/auth/${user?.user?.id}/${propDetail}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: inputValue,
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert("profile edited successfully!");
        setOpen(false)
        setInputValue("");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Application Error:", err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col gap-[10px] items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full h-[40px] bg-[white] text-[black] rounded-[5px] outline-0 text-[13px] p-[5px] inset-shadow-sm inset-shadow-indigo-500 "
      />
      <button
        onClick={() => handleSubmit(inputValue)}
        className="bg-[#2563eb] w-fit p-[10px] rounded-[10px] text-[13px] text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default SettingsInput;
