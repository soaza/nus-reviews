import React from "react";

export const RatingBar = (props: { ratingType: string; rating: number }) => {
  const { ratingType, rating } = props;
  return (
    <dl>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {ratingType}
      </dt>
      <dd className="flex items-center mb-3">
        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
          <div
            className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
            style={{ width: `${(rating / 5) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {rating}
        </span>
      </dd>
    </dl>
  );
};
