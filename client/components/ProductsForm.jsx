"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useUser } from "@clerk/nextjs";

const categoryEnum = z.enum([
  "Beauty",
  "Furniture",
  "Electrical Appliances",
  "Fashion Accessories",
  "Tools & Equipments",
  "Computers & Accessories",
  "Agriculture & Food",
  "Education & Office",
  "Miscellaneous",
]);

const postSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  price: z.string().min(1, "Price must be at least 1"),
  description: z.string().min(1, "Description is required"),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .default([]),
  category: categoryEnum,
  status: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .default("false"),
});

const page = ({ product }) => {
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
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        category: product.category,
        status: product.status,
      });
    }
  }, [product, reset]);

  const handleImageUploadSuccess = (urls) => {
    setValue("images", urls);
  };

  const onSubmit = async (data) => {
    if (!user.isSignedIn) {
      alert("Please log in to post a product");
      return;
    }
    if(!data.images || data.images.length === 0){
      alert("Please add at least one image to post a product");
      return;
    }
    console.log(data);
    try {
      const res = await fetch(product ? `/api/posts/${id}` : "/api/posts/new", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          sellerId: user.user.id,
        }),
      });
      console.log(res);
      const result = await res.json();
      if (result.success) {
        alert(product ? "post edited" : "posted successfully!");
        router.push("/");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Application Error:", err);
      alert("Error submitting application");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full p-[5px] flex flex-col gap-[5px]">
          <label className="text-[16px]">Product Title</label>
          <input
            className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
            {...register("title")}
          />
          <p className="text-[red] text-[12px]">{errors.title?.message}</p>
        </div>
        <div className="w-full p-[5px] flex flex-col gap-[5px]">
          <label className="text-[16px]">Price</label>
          <input
            className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
            {...register("price")}
          />
          <p className="text-[red] text-[12px]">{errors.price?.message}</p>
        </div>
        <div className="w-full p-[5px] flex flex-col gap-[5px]">
          <label className="text-[16px]">Product Description</label>
          <textarea
            className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
            {...register("description")}
          />
          <p className="text-[red] text-[12px]">
            {errors.description?.message}
          </p>
        </div>
        <div className="w-full p-[5px] flex flex-col gap-[5px]">
          <label className="text-[16px]">Category</label>
          <select
            {...register("category")}
            className="bg-[white] w-full h-[35px] text-[14px] p-[5px] rounded-[10px] outline-[0] border-[1px] border-solid border-[#ccc]"
          >
            <option>Select Category</option>
            {categoryEnum.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="text-[red] text-[12px]">{errors.category?.message}</p>
        </div>
        <select
          className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
          {...register("status", { valueAsNumber: false })}
        >
          <option value="">-- Select Status --</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <div className="w-full p-[5px] flex flex-col gap-[5px] text-black">
          <label className="text-[16px]">Images</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const urls = res.map((file) => file.ufsUrl);
              setValue("images", urls);
              console.log("Uploaded URLs: ", urls);
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
            appearance={{
              button: {
                backgroundColor: "#af7ac5",
                color: "#fff",
                padding: "8px 16px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              },
              container: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: "10px 0",
              },
              allowedContent: {
                display: "none",
                fontSize: "12px",
                color: "#666",
              },
            }}
          />
          <p className="text-[red] text-[12px]">{errors.images?.message}</p>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-[#af7ac5] text-white py-2 rounded  text-[13px]"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default page;
