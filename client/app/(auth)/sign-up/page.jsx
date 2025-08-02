"use client";

import Loading from "@/components/Loading";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isVerification, setIsVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, setActive, signUp } = useSignUp();
  const router = useRouter();
  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setUserDetails((prev) => ({ ...prev, [name]: inputValue }));
  };

  const {
    name = "",
    email = "",
    username = "",
    password = "",
    confirm = "",
    check = false,
  } = userDetails;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (!check) {
      setError("You must agree to the terms and conditions");
      return;
    }
    if (password.length < 6) {
      setError("Passwords to short");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const [firstName, lastName = ""] = name.trim().split(" ");

      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        username,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setIsVerification(true);
      setError("");
      setLoading(false);
      setUserDetails({
        name: "",
        email: "",
        username: "",
        password: "",
        confirm: "",
        check: false,
      });
    } catch (error) {
      setError(error?.errors?.[0]?.message || "Something went wrong");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    console.log("Verifying...");
    setError("");
    if (!code) return setError("Please enter a code");
    setLoading(true);
    try {
      const complete = await signUp.attemptEmailAddressVerification({ code });
      console.log("Verification Result:", complete);

      if (complete.status === "complete") {
        await setActive({ session: complete.createdSessionId });

        await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: complete.createdUserId,
            email: complete.emailAddress,
            firstName: complete.firstName,
            lastName: complete.lastName,
            username: complete.username,
          }),
        });
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(err?.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-[20px]">
        {isVerification ? (
          <div>
            <form
              onSubmit={handleVerification}
              className="max-w-md w-full flex flex-col gap-4 "
            >
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 rounded placeholder:text-[13px] text-[13px]"
              />
              {error && <p className="text-red-500 text-[12px]">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#af7ac5] text-white p-2 rounded"
              >
                {loading ? <Loading /> : "Verify"}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-[10px]">
            <h2 className="text-[16px] font-semibold text-center text-[#ff7043]">
              Create Account
            </h2>
            <form className="w-full p-[10px]" onSubmit={handleSignUp}>
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <label className="labels">Full Name</label>
                <input
                  name="name"
                  placeholder="Firstname Lastname"
                  className="w-full h-[35px] placeholder:text-[12px] text-[13px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                  value={name}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <label className="labels">Email</label>
                <input
                  name="email"
                  className="w-full h-[35px] text-[13px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                  value={email}
                  onChange={handleInput}
                />
              </div>
              {/* Username */}
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <label className="labels">Username</label>
                <input
                  name="username"
                  className="w-full h-[35px] text-[13px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                  value={username}
                  onChange={handleInput}
                />
              </div>
              {/* Password */}
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
              {/* Confirm Password */}
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <label className="labels">Confirm Password</label>
                <input
                  name="confirm"
                  type="password"
                  className="w-full h-[35px] text-[13px] p-[5px] rounded-[5px] border border-[#ccc] outline-0 bg-white"
                  value={confirm}
                  onChange={handleInput}
                />
              </div>
              {/* Terms Checkbox */}
              <div className="w-full p-[5px] flex flex-col gap-[5px]">
                <div className="flex items-center gap-[10px]">
                  <input
                    name="check"
                    type="checkbox"
                    className="w-[18px] h-[18px] accent-blue-600"
                    checked={check}
                    onChange={handleInput}
                  />
                  <span className="labels">
                    I agree to the terms and conditions
                  </span>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-[#af7ac5] text-white py-2 rounded  text-[13px]"
              >
                {loading ? <Loading /> : "Sign Up"}
              </button>
              {error && <p className="text-red-500 text-[12px]">{error}</p>}
            </form>
            <div className="text-center">
              <p className="text-[13px]">
                Already have an account?{" "}
                <span className="text-[blue] underline">
                  <Link href="/sign-in">Sign In</Link>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
