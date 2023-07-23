import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface SignUpForm {
  name: string;
  email: string;
}

export default () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const [loading, setLoading] = useState(false);
  const onValid = async (data: SignUpForm) => {
    if (!loading) {
      setLoading(true);
      const request = await fetch("/api/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      if (request.status === 200) {
        alert("Account already exists! Please log in!");
      }
      if (request.status === 201) {
        alert("Account already created! Please log in!");
      }
      if (request.status !== 405) {
        router.push("/log-in");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 bg-butter-yellow">
      <h1 className="text-6xl font-bold text-butter-blue">Create Account</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="text-lg font-bold text-butter-green" htmlFor="name">
            Name:{" "}
          </label>
          <input
            className="bg-transparent border-2 border-butter-yellow border-b-butter-red"
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          <span>{errors?.name?.message}</span>
        </div>
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
            type="text"
            {...register("email", { required: "Email is required" })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button className="items-center justify-center px-4 py-2 text-xl font-bold transition-colors border-transparent border-none rounded-md shadow-xl cursor-pointer text-butter-yellow hover:bg-butter-mint bg-butter-red hover:text-butter-yellow">
          Create Account
        </button>
      </form>
      <div className="fixed flex items-center justify-center px-4 py-2 text-xl font-bold transition-colors border-transparent border-none shadow-xl cursor-pointer rounded-3xl top-5 right-5 text-butter-yellow hover:bg-butter-mint bg-butter-red hover:text-butter-yellow">
        <Link href="/log-in">Log in</Link>
      </div>
    </div>
  );
};
