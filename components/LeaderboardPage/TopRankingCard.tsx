import React from "react";

export const TopRankingCard = (props: { ranking?: number }) => {
  const { ranking } = props;

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
      <div className="text-3xl font-semibold"> CS1010</div>

      <div className="text-xl font-medium"> Programming Methodology</div>

      <div className="text-md text-black"> 24 reviews</div>

      <div className="text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full">
        {rankingPlacement()}
      </div>
    </div>
  );
};
