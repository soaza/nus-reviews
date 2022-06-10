import React from "react";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { RatingBar } from "./RatingBar";

export const OverallRating = () => {
  const ratings = [
    { ratingType: "Difficulty", rating: 5 },
    { ratingType: "Workload", rating: 3 },
    { ratingType: "Practicality", rating: 4 },
    { ratingType: "Enjoyability", rating: 4 },
  ];
  return (
    <div>
      <div className="flex items-center mb-5">
        <OverallRatingScore score={3} />

        <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          376 reviews
        </p>
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
    </div>
  );
};
