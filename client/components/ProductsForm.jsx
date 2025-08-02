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
    if (!data.images || data.images.length === 0) {
      alert("Please add at least one image to post a product, Click on upload images button");
      return;
    }
    console.log(data);
    setIsLoading(true);
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
        setIsLoading(true);
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
          <label className="label">Price</label>
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
          <label className="label">Category</label>
          <select {...register("category")} className="input">
            <option>-- Select Category --</option>
            {categoryEnum.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="text-[red] text-[12px]">{errors.category?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Status</label>
          <select
            className="input"
            {...register("status", { valueAsNumber: false })}
          >
            <option value="">-- Select Status --</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
          <p className="text-[red] text-[12px]">{errors.status?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label className="label">Images</label>
          {/*<UploadButton
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
                backgroundColor: "#f97a00",
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
          />*/}
          <ImageUploader setValue={setValue} errors={errors} />
          <p className="text-[red] text-[12px]">{errors.images?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-[#f97a00] hover:border-[#f97a00] hover:text-[#f97a00] hover:bg-white transition duration-300 text-white font-medium px-6 py-2 rounded-md shadow-md mx-auto block text-sm"
        >
          {isLoading ? <Loading />: product ? "Update Product" : "Post Product"}
        </button>
      </form>
    </div>
  );
};

export default page;
