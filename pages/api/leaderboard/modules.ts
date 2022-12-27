import { NextApiRequest, NextApiResponse } from "next";
import { TLeaderboardCategory } from "../../../utils/interface";
import prisma from "../../../utils/prisma";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { selected_category }: { selected_category: TLeaderboardCategory } =
    req.body;

  if (req.method === "POST") {
    let result;

    switch (selected_category) {
      case "most_reviewed":
        result = await prisma.$queryRaw`
        SELECT review_module_code as module_code,COUNT(*) as review_metric
        FROM "Reviews"
        GROUP BY review_module_code 
        ORDER BY COUNT(*) DESC`;
        break;

      case "top_rated_modules":
        result = await prisma.$queryRaw`
        SELECT review_module_code as module_code,AVG(overall_score) as review_metric
        FROM "Reviews"
        GROUP BY review_module_code 
        HAVING COUNT(*) > 5
        ORDER BY AVG(overall_score) DESC`;
        break;

      case "top_rated_general_modules":
        result = await prisma.$queryRaw`
          SELECT review_module_code as module_code,AVG(overall_score) as review_metric
          FROM "Reviews"
          GROUP BY review_module_code 
          HAVING review_module_code LIKE 'GE%'
          ORDER BY AVG(overall_score) DESC`;
        break;

      case "top_rated_cs_modules":
        result = await prisma.$queryRaw`
            SELECT review_module_code as module_code,AVG(overall_score) as review_metric
            FROM "Reviews"
            GROUP BY review_module_code 
            HAVING review_module_code LIKE 'CS%'
            ORDER BY AVG(overall_score) DESC`;
        break;
    }

    res.json(result);
  }
}
