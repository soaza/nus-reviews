import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { offset } = req.body;

  if (req.method === "POST") {
    const result = await prisma.$queryRaw`
      SELECT review_module_code as module_code,COUNT(*) as review_count
      FROM "Reviews"
      GROUP BY review_module_code 
      ORDER BY COUNT(*) DESC`;

    // const result = await prisma.reviews.groupBy({
    //   by: ["review_module_code"],
    //   _count: { review_module_code: true },
    //   orderBy: {
    //     _count: {
    //       review_module_code: "desc",
    //     },
    //   },
    // });
    res.json(result);
  }
}
