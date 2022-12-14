import React from "react";
import { ILeaderboardModule } from "../../utils/interface";

export const TopRankingCard = (props: {
  module: ILeaderboardModule;
  ranking?: number;
}) => {
  const { module, ranking } = props;

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
    <div
      style={{ backgroundColor: backgroundColor() }}
      className={` border-2 border-white p-6 text-center col-span-3 rounded-lg hover:scale-105 transition ease-in-out delay-150`}
    >
      <div className="text-3xl font-semibold"> {module.module_code}</div>

      <div className="text-md text-black"> {module.review_count} reviews</div>

      <div className="text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full">
        {rankingPlacement()}
      </div>
    </div>
  );
};
