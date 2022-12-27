import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let result;

    result = await prisma.$queryRaw`
        SELECT * FROM (SELECT * FROM "Reviews" ORDER BY "review_helpful_count" DESC LIMIT 10) AS X  inner join "Users" on "Users".user_uuid = X.review_user`;

    res.json(result);
  }
}
