import React from "react";
import { capitaliseWord, formatScore } from "../../utils/common";

export const RatingBar = (props: { ratingType: string; rating: number }) => {
  const { ratingType, rating } = props;

  return (
    <dl>
      <dt className="text-sm font-medium text-gray-500 ">
        {capitaliseWord(ratingType)}
      </dt>
      <dd className="flex items-center mb-3">
        <div className="w-full bg-gray-200 rounded h-2.5  mr-2">
          <div
            className="bg-blue-600 h-2.5 rounded "
            style={{ width: `${(rating / 5) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500">
          {formatScore(rating)}
        </span>
      </dd>
    </dl>
  );
};
