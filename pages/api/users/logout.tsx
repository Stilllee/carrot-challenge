import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/withSession";

export default withApiSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // 로그아웃 처리: 세션 파기
    await req.session.destroy();
    await req.session.save();

    return res.status(200).end();
  }
);
