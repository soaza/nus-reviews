import React from "react";
import { useQuery } from "react-query";
import { LeaderboardRow } from "../../components/LeaderboardPage/LeaderboardRow";
import { TopRankingCard } from "../../components/LeaderboardPage/TopRankingCard";

const LeaderboardPage = () => {
  return (
    <div>
      <div className="grid grid-rows-12 grid-flow-col gap-4">
        <TopRankingCard ranking={1} />
        <TopRankingCard ranking={2} />
        <TopRankingCard ranking={3} />
      </div>

      <div className="mt-4 grid gap-4">
        {Array.from(Array(100).keys()).map(() => {
          return <LeaderboardRow />;
        })}
      </div>
    </div>
  );
};

export default LeaderboardPage;
