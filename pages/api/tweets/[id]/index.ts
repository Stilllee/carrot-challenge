import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../lib/withHandler";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        userId: user?.id,
        tweetId: Number(id),
      },
      select: {
        id: true,
      },
    })
  );
  res.json({
    ok: true,
    tweet,
    isLiked,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
