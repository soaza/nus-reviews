import { BigHead } from "@bigheads/core";
import React, { useEffect } from "react";
import { getRandomAvatarOptions } from "../../utils/bighead-randomise";
import { SelfAvatar } from "../Avatar";
import { Divider } from "../common/Divider";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { RatingBar } from "./RatingBar";

export const Review = () => {
  const ratings = [
    { ratingType: "Difficulty", rating: 5 },
    { ratingType: "Workload", rating: 3 },
    { ratingType: "Practicality", rating: 4 },
    { ratingType: "Enjoyability", rating: 4 },
  ];

  return (
    <div className="mb-4">
      <div className="flex items-center mb-4 space-x-1">
        <div className=" w-20">
          <SelfAvatar />
        </div>
        <div className="space-y-1 font-medium dark:text-white">
          <p>Jese Leos </p>
        </div>
      </div>
      <div className="flex items-center mb-1">
        <OverallRatingScore score={4} />
      </div>

      <div className="">
        {ratings.map((ratingObj, index) => {
          return (
            <RatingBar
              key={index}
              ratingType={ratingObj.ratingType}
              rating={ratingObj.rating}
            />
          );
        })}
      </div>

      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>Reviewed on March 3, 2017</p>
      </footer>
      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
        Best module taken ever. If you do not take this module in your NUS life,
        or SOC life, I can say you miss half of the fun you could have. But
        prepare to die. This module is coming with great fun, and also great
        stress and heavy work.
      </p>
      <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
        We got to do really cool stuff like programming with Lego MindStorm
        Robots!
      </p>

      <div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          19 people found this helpful
        </p>
        <div className="flex items-center mt-3 ">
          <button className="bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm font-medium  p-2">
            Helpful
          </button>
          <button className="ml-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm font-medium  p-2">
            Report
          </button>
        </div>
      </div>

      <Divider />
    </div>
  );
};
