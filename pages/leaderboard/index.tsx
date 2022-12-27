import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Spinner } from "../../components/common/Spinner";
import { FilterBar } from "../../components/LeaderboardPage/FilterBar";
import { LeaderboardRow } from "../../components/LeaderboardPage/LeaderboardRow";
import { TopRankingCard } from "../../components/LeaderboardPage/TopRankingCard";
import { getLeaderboardModules } from "../../utils/api";
import { useLeaderboardStore } from "../../zustand/store";

const LeaderboardPage = () => {
  const category = useLeaderboardStore((state) => state.category);
  const maxRows = useLeaderboardStore((state) => state.maxRows);
  const setMaxRows = useLeaderboardStore((state) => state.setMaxRows);
  const incrementMaxRows = useLeaderboardStore(
    (state) => state.incrementMaxRows
  );

  const {
    data: modules,
    isFetching,
    refetch,
  } = useQuery(["leaderboard_modules"], async () => {
    const data = await getLeaderboardModules(category);
    return data;
  });

  useEffect(() => {
    refetch();
    setMaxRows(10);
  }, [category]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl lg:text-5xl font-semibold">Leaderboard</div>

      <FilterBar selectedTab={category} />

      {isFetching && <Spinner />}

      {!isFetching && (
        <>
          {/* TOP 3 */}
          <div className="grid grid-rows-12 lg:grid-flow-col gap-4">
            {modules?.map((module, index) => {
              const ranking = index + 1;

              if (ranking <= 3) {
                return (
                  <TopRankingCard
                    key={index}
                    module={module}
                    ranking={ranking}
                    selectedTab={category}
                  />
                );
              }
            })}
          </div>

          {/* REST */}
          <div className="mt-4 grid gap-4">
            {modules?.map((module, index) => {
              const ranking = index + 1;

              if (ranking > 3 && ranking <= maxRows) {
                return (
                  <LeaderboardRow
                    key={index}
                    module={module}
                    ranking={ranking}
                    selectedTab={category}
                  />
                );
              }
            })}
          </div>

          {modules.length > maxRows && (
            <div
              onClick={() => {
                incrementMaxRows();
              }}
              className=" place-self-center bg-white border-black border hover:bg-gray-200 rounded-md cursor-pointer text-base p-2 font-medium"
            >
              Show more
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
