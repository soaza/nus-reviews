import Link from "next/link";
import React from "react";
import { ILeaderboardModule } from "../../utils/interface";

export const LeaderboardRow = (props: {
  module: ILeaderboardModule;
  ranking?: number;
}) => {
  const { module, ranking } = props;

  return (
    <Link href={`/module/${module.module_code}`}>
      <div className="flex cursor-pointer flex-row justify-around p-4 border-2 rounded-md items-center hover:scale-105 transition ease-in-out delay-150">
        <div className="text-3xl ">{ranking}th</div>

        <div className="flex flex-col">
          <div className="text-3xl font-semibold">{module.module_code}</div>
          {/* <div className="text-xl font-medium"> Programming Methodology</div> */}
        </div>

        <div className="text-xl font-medium ">
          {" "}
          {module.review_count} reviews
        </div>
      </div>
    </Link>
  );
};
