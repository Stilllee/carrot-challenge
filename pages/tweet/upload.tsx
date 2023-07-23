import { NextPage } from "next";
import { useForm } from "react-hook-form";
import useMutation from "../../lib/useMutation";
import { useEffect } from "react";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";

interface UploadForm {
  text: string;
}

interface UploadResponse {
  ok: boolean;
  tweet: Tweet;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadForm>();
  const [tweet, { loading, data }] = useMutation<UploadResponse>("/api/tweets");
  const { text } = watch();
  const onValid = (data: UploadForm) => {
    if (loading) return;
    tweet(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/tweet/${data.tweet.id}`);
    }
  }, [data, router]);
  return (
    <div className="w-screen h-screen p-5 bg-butter-lavender">
      <div className="fixed flex items-center justify-center px-4 py-2 text-xl font-bold transition-colors border-transparent border-none shadow-xl cursor-pointer rounded-3xl top-5 right-5 text-butter-yellow hover:bg-butter-mint bg-butter-red hover:text-butter-yellow">
        <Link href="/">Home</Link>
      </div>
      <h1 className="mb-3 text-3xl font-bold text-butter-mint">Upload</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <textarea
          {...register("text", { required: true })}
          rows={5}
          placeholder="무슨 일이 일어나고 있나요?"
          className="w-full p-2 mt-1 border-2 rounded-md shadow-sm border-butter-yellow focus:ring-2 focus:ring-offset-2 focus:ring-butter-mint focus:outline-none"
        ></textarea>
        <button
          disabled={!text}
          type="submit"
          className="w-full px-4 py-2 mt-2 text-sm font-bold rounded-md shadow-sm cursor-pointer text-butter-mint hover:text-white text-md transition-colorsborder-transparent bg-butter-yellow hover:bg-butter-mint focus:ring-2 focus:ring-offset-2 focus:ring-butter-mint focus:outline-none"
        >
          {loading ? "로딩중..." : "트윗하기"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
