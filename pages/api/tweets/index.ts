import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../.././lib/withHandler";
import db from "../../.././lib/db";
import { withApiSession } from "../../.././lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { text },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const tweet = await db.tweet.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
  }
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
