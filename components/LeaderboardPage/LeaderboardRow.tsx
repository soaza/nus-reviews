import React from "react";

export const LeaderboardRow = () => {
  return (
    <div className="flex flex-row justify-around p-4 border-2 rounded-md items-center hover:scale-105 transition ease-in-out delay-150">
      <div className="text-3xl ">4th</div>

      <div className="flex flex-col">
        <div className="text-3xl font-semibold"> CS1010</div>
        <div className="text-xl font-medium"> Programming Methodology</div>
      </div>

      <div className="text-xl font-medium "> 5 reviews</div>
    </div>
  );
};
