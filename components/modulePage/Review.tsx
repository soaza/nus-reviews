import React from "react";
import {
  calculateOverallScore,
  parseDate,
  ratingTypes,
} from "../../utils/common";
import { IReviewByUser } from "../../utils/interface";
import { Avatar } from "../Avatar";
import { Divider } from "../common/Divider";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { RatingBar } from "./RatingBar";

export const Review = (props: { review: IReviewByUser }) => {
  const { review } = props;

  const { user_name, user_avatar } = review.Users;

  return (
    <div className="mb-4">
      <div className="flex items-center mb-4 space-x-1">
        <div className=" w-20">
          <Avatar avatarOption={user_avatar} />
        </div>
        <div className="space-y-1 font-medium dark:text-white">
          <p>{user_name} </p>
        </div>
      </div>

      <div className="flex items-center mb-1">
        <OverallRatingScore score={calculateOverallScore(review)} />
      </div>

      <div className="">
        {ratingTypes.map((ratingType, index) => {
          return (
            <RatingBar
              key={index}
              ratingType={ratingType}
              rating={review[ratingType]}
            />
          );
        })}
      </div>

      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>Reviewed on {parseDate(review.created_at)}</p>
      </footer>

      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
        {/* Best module taken ever. If you do not take this module in your NUS life,
        or SOC life, I can say you miss half of the fun you could have. But
        prepare to die. This module is coming with great fun, and also great
        stress and heavy work. */}
        {review.review_description}
      </p>

      <div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {review.review_helpful_count} people found this helpful
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

      {/* <div className="mt-4 text-center font-light text-gray-400">
        {" "}
        This comment was originally posted on NUSMods
      </div> */}

      <Divider />
    </div>
  );
};
