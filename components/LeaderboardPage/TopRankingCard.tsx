import Link from "next/link";
import React from "react";
import {
  formatScore,
  leaderboardCategoryMetricMapping,
} from "../../utils/common";
import {
  ILeaderboardModule,
  TLeaderboardCategory,
} from "../../utils/interface";

export const TopRankingCard = (props: {
  module: ILeaderboardModule;
  ranking?: number;
  selectedTab: TLeaderboardCategory;
}) => {
  const { module, ranking, selectedTab } = props;

  const backgroundColor = () => {
    switch (ranking) {
      case 1:
        // code block
        return "#FAEBA7";
      case 2:
        // code block
        return "#E9EAEC";
      case 3:
        // code block
        return "#F7D2AE";
      default:
      // code block
    }
  };

  const rankingPlacement = () => {
    switch (ranking) {
      case 1:
        // code block
        return "1ST";
      case 2:
        // code block
        return "2ND";
      case 3:
        // code block
        return "3RD";
      default:
      // code block
    }
  };

  return (
    <Link href={`/module/${module.module_code}`}>
      <div
        style={{ backgroundColor: backgroundColor() }}
        className={`cursor-pointer border-2 border-white p-6 text-center rounded-lg hover:scale-105 transition ease-in-out delay-150`}
      >
        <div className="text-2xl lg:text-3xl font-semibold">
          {module.module_code}
        </div>

        <div className="text-md text-black">
          {formatScore(module.review_metric)}{" "}
          {leaderboardCategoryMetricMapping[selectedTab]}
        </div>

        <div className="text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full">
          {rankingPlacement()}
        </div>
      </div>
    </Link>
  );
};
