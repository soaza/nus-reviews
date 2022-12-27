import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Spinner } from "../../components/common/Spinner";
import { FilterBar } from "../../components/LeaderboardPage/FilterBar";
import { LeaderboardRow } from "../../components/LeaderboardPage/LeaderboardRow";
import { TopRankingCard } from "../../components/LeaderboardPage/TopRankingCard";
import { getLeaderboardModules } from "../../utils/api";
import { TLeaderboardCategory } from "../../utils/interface";

const LeaderboardPage = () => {
  const [maxRows, setMaxRows] = useState(10);
  const [selectedTab, setSelectedTab] =
    useState<TLeaderboardCategory>("most_reviewed");

  const {
    data: modules,
    isFetching,
    refetch,
  } = useQuery(["leaderboard_modules"], async () => {
    const data = await getLeaderboardModules(selectedTab);
    return data;
  });

  useEffect(() => {
    refetch();
    setMaxRows(10);
  }, [selectedTab]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl lg:text-5xl font-semibold">Leaderboard</div>

      <FilterBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {isFetching && <Spinner />}

      {!isFetching && (
        <>
          {" "}
          <div className="grid grid-rows-12 lg:grid-flow-col gap-4">
            {modules?.map((module, index) => {
              const ranking = index + 1;

              if (ranking <= 3) {
                return (
                  <TopRankingCard
                    module={module}
                    ranking={ranking}
                    selectedTab={selectedTab}
                  />
                );
              }
            })}
          </div>
          <div className="mt-4 grid gap-4">
            {modules?.map((module, index) => {
              const ranking = index + 1;

              if (ranking > 3 && ranking <= maxRows) {
                return (
                  <LeaderboardRow
                    module={module}
                    ranking={ranking}
                    selectedTab={selectedTab}
                  />
                );
              }
            })}
          </div>
          {modules.length > maxRows && (
            <div
              onClick={() => {
                setMaxRows((prevState) => prevState + 10);
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
