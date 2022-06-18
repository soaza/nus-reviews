import React from "react";
import { useQuery } from "react-query";
import { calculateOverallScore, ratingTypes } from "../../utils/common";
import { IOverallReview } from "../../utils/interface";
import { supabase } from "../../utils/supabase";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { RatingBar } from "./RatingBar";

export const OverallRating = (props: { moduleCode: string }) => {
  const { moduleCode } = props;

  const { data } = useQuery<IOverallReview>(
    ["reviews", moduleCode],
    async () => {
      const { data, error } = await supabase.rpc("getmoduleoverallratings", {
        module_code: moduleCode,
      });
      return data[0];
    }
  );

  return (
    <>
      {data && (
        <div className="">
          <div className="flex items-center mb-5">
            <OverallRatingScore score={calculateOverallScore(data)} />

            <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {data.total_count} reviews
            </p>
          </div>
          <div className="">
            {ratingTypes.map((ratingType, index) => {
              return (
                <RatingBar
                  key={index}
                  ratingType={ratingType}
                  rating={data[ratingType]}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
