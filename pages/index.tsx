import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

export default () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/users/me");
  useEffect(() => {
    if (error) {
      router.replace("/create-account");
    }
  }, [router, error]);
  if (!data) {
    return <div />;
  }
  return (
    <div>
      <h1>Hello {data?.name}!</h1>
      <h3>Your email is: {data?.email}</h3>
    </div>
  );
};
