"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useUser } from "@clerk/nextjs";
import ImageUploader from "./ImageUploader";
import Loading from "./Loading";

const auctionSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  price: z.string().min(1, "Price must be at least 1"),
  description: z.string().min(1, "Description is required"),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .default([]),
  startTime: z
    .string()
    .min(1, "Start time is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date and time format"),
  endTime: z
    .string()
    .min(1, "End time is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date and time format"),
  status: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .default("false"),
});

const AuctionFormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(auctionSchema),
  });

  const onSubmit = async (data) => {
    if (!user.isSignedIn) {
      alert("Please log in to post a product");
      return;
    }

    if (!data.images || data.images.length === 0) {
      alert("Please add at least one image to post a product.");
      return;
    }

    setIsLoading(true);

    try {
      const formattedData = {
        ...data,
        price: Number(data.price.replace(/,/g, "")),
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      };

      const res = await fetch("/api/auctions/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: formattedData,
          sellerId: user.user.id,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Posted successfully!");
        router.push("/");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Application Error:", err);
      alert("Error submitting application");
    }
  };

  return (
    <div className="py-[10px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Product Title</label>
          <input
            className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] inset-shadow-sm inset-shadow-[#38664440] outline-0 bg-white"
            {...register("title")}
          />
          <p className="text-[red] text-[12px]">{errors.title?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Start Price</label>
          <input
            className="input placeholder:text-[13px]"
            {...register("price")}
            placeholder="Price in naira"
          />
          <p className="text-[red] text-[12px]">{errors.price?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Product Description</label>
          <textarea
            className="input sm:h-[150px] h-[100px]"
            {...register("description")}
          />
          <p className="text-[red] text-[12px]">
            {errors.description?.message}
          </p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Start Time</label>
          <input
            type="datetime-local"
            className="input placeholder:text-[13px]"
            {...register("startTime")}
          />
          <p className="text-[red] text-[12px]">{errors.startTime?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">End Time</label>
          <input
            type="datetime-local"
            className="input placeholder:text-[13px]"
            {...register("endTime")}
          />
          <p className="text-[red] text-[12px]">{errors.endTime?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Images</label>
          <ImageUploader setValue={setValue} errors={errors} />
          <p className="text-[red] text-[12px]">{errors.images?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-[#f97a00] hover:border-[#f97a00] hover:text-[#f97a00] hover:bg-white transition duration-300 text-white font-medium px-6 py-2 rounded-md shadow-md mx-auto block text-sm"
        >
          {isLoading ? <Loading /> : "Post"}
        </button>
      </form>
    </div>
  );
};

export default AuctionFormPage;
