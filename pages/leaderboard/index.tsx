import React, { useState } from "react";
import { useQuery } from "react-query";
import { LeaderboardRow } from "../../components/LeaderboardPage/LeaderboardRow";
import { TopRankingCard } from "../../components/LeaderboardPage/TopRankingCard";
import { getMostReviewedModules } from "../../utils/api";

const LeaderboardPage = () => {
  const { data: modules, isLoading } = useQuery(
    "most_reviewed_modules",
    async () => {
      const data = await getMostReviewedModules();
      return data;
    }
  );

  const [maxRows, setMaxRows] = useState(10);

  return (
    <div>
      <div className="text-5xl font-semibold mb-4">Leaderboard</div>

      <div className="grid grid-rows-12 grid-flow-col gap-4">
        {modules?.map((module, index) => {
          const ranking = index + 1;

          if (ranking <= 3) {
            return <TopRankingCard module={module} ranking={ranking} />;
          }
        })}
      </div>

      <div className="mt-4 grid gap-4">
        {modules?.map((module, index) => {
          const ranking = index + 1;

          if (ranking > 3 && ranking <= maxRows) {
            return <LeaderboardRow module={module} ranking={ranking} />;
          }
        })}
      </div>
    </div>
  );
};

export default LeaderboardPage;
