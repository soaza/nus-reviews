import React, { useState } from "react";
import { useQuery } from "react-query";
import { LeaderboardRow } from "../../components/LeaderboardPage/LeaderboardRow";
import { TopRankingCard } from "../../components/LeaderboardPage/TopRankingCard";
import { getMostReviewedModules } from "../../utils/api";

const LeaderboardPage = () => {
  const [maxRows, setMaxRows] = useState(10);

  const { data: modules } = useQuery(["most_reviewed_modules"], async () => {
    const data = await getMostReviewedModules();
    return data;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="text-5xl font-semibold">Leaderboard</div>

      <div className="grid grid-rows-12 lg:grid-flow-col gap-4">
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

      <div
        onClick={() => {
          setMaxRows((prevState) => prevState + 10);
        }}
        className=" place-self-center bg-white border-black border hover:bg-gray-200 rounded-md cursor-pointer text-base p-2 font-medium"
      >
        Show more
      </div>
    </div>
  );
};

export default LeaderboardPage;
