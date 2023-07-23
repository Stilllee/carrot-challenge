import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import LogoutButton from "../components/logoutButton";
import Link from "next/link";
import { NextPage } from "next";
import { Tweet, User } from "@prisma/client";
import { format } from "date-fns";

interface TweetWithCount extends Tweet {
  _count: {
    likes: number;
  };
  user: User;
}

interface TweetResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data: userData, error } = useSWR("/api/users/me");
  const { data } = useSWR<TweetResponse>("/api/tweets");

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  useEffect(() => {
    if (error) {
      router.replace("/create-account");
    }
  }, [router, error]);

  if (!userData) {
    return <div />;
  }
  return (
    <div className="p-3 bg-butter-lavender">
      <div className="flex justify-between p-3 mb-4 ">
        <h1 className="text-4xl font-bold text-butter-blue">
          Hello {userData?.name}!
        </h1>
        <LogoutButton />
      </div>
      <div className="space-y-4">
        {data?.tweets?.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <div className="flex flex-col items-start pt-4 border-2 cursor-pointer bg-amber-50">
              <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-butter-yellow text-gray-800">
                트윗
              </span>
              <div className="px-4 mt-2 text-gray-700">
                <span className="font-medium text-orange-500"></span>{" "}
                {tweet?.text}
              </div>
              <div className="flex items-center justify-between w-full px-4 mt-5 text-xs font-medium text-gray-500">
                <span>{tweet?.user?.name}</span>
                <span>
                  {formatDate(tweet?.updatedAt.toLocaleString("ko-KR"))}
                </span>
              </div>
              <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t   w-full">
                <span className="flex items-center space-x-2 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>마음에 들어요 {tweet._count?.likes}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed flex items-center justify-center p-4 text-white transition-colors border-transparent border-none rounded-full shadow-xl cursor-pointer bottom-5 right-5 hover:bg-butter-mint aspect-square w-14 bg-butter-yellow">
        <Link href="/tweet/upload">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Home;
