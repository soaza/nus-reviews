import Link from "next/link";
import React from "react";
import {
  formatLeaderboardScore,
  leaderboardCategoryMetricMapping,
} from "../../utils/common";
import {
  ILeaderboardModule,
  TLeaderboardCategory,
} from "../../utils/interface";

export const LeaderboardRow = (props: {
  module: ILeaderboardModule;
  ranking?: number;
  selectedTab: TLeaderboardCategory;
}) => {
  const { module, ranking, selectedTab } = props;

  return (
    <Link href={`/module/${module.module_code}`}>
      <div className="flex cursor-pointer flex-row justify-around p-4 border-2 rounded-md items-center hover:scale-105 transition ease-in-out delay-150">
        <div className="text-2xl lg:text-3xl ">{ranking}th</div>

        <div className="flex flex-col">
          <div className="text-2xl lg:text-3xl font-semibold">
            {module.module_code}
          </div>
          {/* <div className="text-xl font-medium"> Programming Methodology</div> */}
        </div>

        <div className="text-xl font-medium ">
          {formatLeaderboardScore(module.review_metric)}{" "}
          {leaderboardCategoryMetricMapping[selectedTab]}
        </div>
      </div>
    </Link>
  );
};
