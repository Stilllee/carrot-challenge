import { Router, useRouter } from "next/router";
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
      } else {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};
