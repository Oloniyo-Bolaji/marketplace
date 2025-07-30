"use client";

import Loading from "@/components/Loading";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, setActive, signIn } = useSignIn();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { email = "", password = "" } = userDetails;

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error", err);
      setError(err.errors?.[0]?.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setError("");
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-[20px]">
        <div className="w-full flex flex-col gap-[10px]">
          <h2 className="text-[16px] font-semibold text-center text-[#c8e6c9]">
            Welcome Back
          </h2>
          <form className="w-full p-[10px]" onSubmit={handleSignIn}>
            <div className="w-full p-[5px] flex flex-col gap-[5px]">
              <label className="labels">Email</label>
              <input
                name="email"
                className="w-full h-[35px] text-[13px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                value={email}
                onChange={handleInput}
              />
            </div>
            <div className="w-full p-[5px] flex flex-col gap-[5px]">
              <label className="labels">Password</label>
              <input
                name="password"
                type="password"
                className="w-full h-[35px] text-[13px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                value={password}
                onChange={handleInput}
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-[#10b981] text-white py-2 rounded  text-[13px]"
            >
              {loading ? <Loading /> : "Sign In"}
            </button>
            {error && <p className="text-red-500 text-[12px]">{error}</p>}
          </form>
          <div className="flex justify-end">
            <p className="text-[13px] ">
              <Link href="/" className="text-[blue] underline">
                {" "}
                Forgot Password?{" "}
              </Link>
            </p>
          </div>
          <div className="text-center">
            <p className="text-[13px]">
              Don't have an account?{" "}
              <span className="text-[blue] underline">
                <Link href="/sign-up">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
