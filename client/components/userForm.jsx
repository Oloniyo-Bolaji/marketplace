"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import Link from "next/link";

const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Must be a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const UserForm = ({ title }) => {
  const [isVerification, setIsVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, setActive, signUp } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleSignUp = async (data) => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name, 
        username: data.username,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setIsVerification(true);
    } catch (error) {
      console.error(error?.errors?.[0]?.message || "Something went wrong");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    if (!code) return setError("Please enter a code");
    setLoading(true);
    try {
      const complete = await signUp.attemptEmailAddressVerification({ code });

      if (complete.status === "complete") {
        await setActive({ session: complete.createdSessionId });
        console.log(complete.status);
        const user = signUp.user;
        const email = user.emailAddresses[0].emailAddress;
        const name = user.firstName || "NoName";
        const username = user.username || name.toLowerCase();
        const id = user.id;

        await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, username, email }),
        });
      }
      setIsVerification(false);
    } catch (err) {
      console.error(err);
      setError(err?.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (data) => {
    const userEmail = data.email;
    const userPassword = data.password;
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: userEmail,
        password: userPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error("Login error", err);
      setError(err.errors?.[0]?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-[20px]">
        {isVerification ? (
          <div>
            <form
              onSubmit={handleVerification}
              className="max-w-md w-full flex flex-col gap-4 bg-white rounded-xl shadow-md p-6"
            >
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 rounded"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white p-2 rounded"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-[10px]">
            <h2 className="text-2xl font-semibold text-center text-black">
              {title}
            </h2>
            <form
              className="w-full p-[10px]"
              onSubmit={
                pathname === "/sign-up"
                  ? handleSubmit(handleSignUp)
                  : handleSubmit(handleLogin)
              }
            >
              {pathname === "/sign-up" && (
                <div className="w-full p-[5px] flex flex-col gap-[5px]">
                  <label className="text-[16px]">Full Name</label>
                  <input
                    className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                    {...register("name")}
                  />
                  <p className="text-[red] text-[12px]">
                    {errors.name?.message}
                  </p>
                </div>
              )}
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <label className="font-bold text-[16px]">Email</label>
                <input
                  className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                  {...register("email")}
                />
                <p className="text-[red] text-[12px]">
                  {errors.email?.message}
                </p>
              </div>
              {/* Username */}
              {pathname === "/sign-up" && (
                <div className="w-full p-[5px] flex flex-col gap-[5px]">
                  <label className="font-bold text-[16px]">Username</label>
                  <input
                    className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                    {...register("username")}
                  />
                  <p className="text-[red] text-[12px]">
                    {errors.username?.message}
                  </p>
                </div>
              )}

              {/* Password */}
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <label className="font-bold text-[16px]">Password</label>
                <input
                  type="password"
                  className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                  {...register("password")}
                />
                <p className="text-[red] text-[12px]">
                  {errors.password?.message}
                </p>
              </div>

              {/* Confirm Password */}
              {pathname === "/sign-up" && (
                <div className="w-full p-[5px] flex flex-col gap-[5px]">
                  <label className="font-bold text-[16px]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full h-[35px] text-[14px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                    {...register("confirmPassword")}
                  />
                  <p className="text-[red] text-[12px]">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              )}
              {/* Terms Checkbox */}
              {pathname === "/sign-up" && (
                <div className="w-full p-[5px] flex flex-col gap-[5px]">
                  <div className="flex items-center gap-[10px]">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px] accent-blue-600"
                      {...register("terms")}
                    />
                    <span className="text-[14px]">
                      I agree to the terms and conditions
                    </span>
                  </div>
                  <p className="text-[red] text-[12px]">
                    {errors.terms?.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {pathname === "/sign-up" ? "Sign Up" : "Sign In"}
              </button>
            </form>
            {pathname === "/sign-up" && (
              <p>
                Already have an account?{" "}
                <span className="text-blue underline">
                  <Link href="/sign-in">Sign In</Link>
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
