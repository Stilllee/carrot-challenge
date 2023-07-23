import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface SignInForm {
  email: string;
}

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onValid = async (data: SignInForm) => {
    if (!loading) {
      const request = await fetch("/api/users/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.status === 200) {
        router.push("/");
      } else if (request.status === 404) {
        alert("Account not found! Please create an account first.");
        router.replace("/create-account");
      } else {
        setLoading(false);
        alert("Log in failed! Please try again.");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 bg-butter-yellow">
      <h1 className="text-6xl font-bold text-butter-blue">Log in</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label
            className="text-lg font-bold text-butter-green"
            htmlFor="email"
          >
            Email:{" "}
          </label>
          <input
            className="bg-transparent border-2 border-butter-yellow border-b-butter-red"
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button className="items-center justify-center px-4 py-2 text-xl font-bold transition-colors border-transparent border-none rounded-md shadow-xl cursor-pointer text-butter-yellow hover:bg-butter-mint bg-butter-red hover:text-butter-yellow">
          Log in
        </button>
      </form>
      <div className="fixed flex items-center justify-center px-4 py-2 text-xl font-bold transition-colors border-transparent border-none shadow-xl cursor-pointer rounded-3xl top-5 right-5 text-butter-yellow hover:bg-butter-mint bg-butter-red hover:text-butter-yellow">
        <Link href="/create-account">Create Account</Link>
      </div>
    </div>
  );
};
