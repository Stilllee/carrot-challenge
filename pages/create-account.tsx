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
    <div>
      <h1 className="text-3xl font-bold">Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          <span>{errors?.name?.message}</span>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            {...register("email", { required: "Email is required" })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button>Create Account</button>
      </form>
      <Link href="/log-in">Log in</Link>
    </div>
  );
};
