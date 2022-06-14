import React from "react";
import { useQuery } from "react-query";
import { IReviewByUser } from "../../utils/interface";
import { supabase } from "../../utils/supabase";
import { Spinner } from "../common/Spinner";
import { FilterDropdown } from "./FilterDropdown";
import { Review } from "./Review";

export const Reviews = (props: { moduleCode: string }) => {
  const { moduleCode } = props;

  const { data: reviews, isLoading } = useQuery<IReviewByUser[]>(
    "reviews",
    async () => {
      const { data } = await supabase
        .from("Reviews")
        .select(`*,Users(*)`)
        .eq(`review_module_code`, `${moduleCode}`);

      return data as any;
    }
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="font-light text-center text-2xl mb-4">
          {reviews?.length} Reviews
        </div>

        <FilterDropdown />
      </div>

      {isLoading && <Spinner />}

      {reviews?.length === 0 && !isLoading && (
        <div className="text-gray-400">No reviews found.</div>
      )}

      {reviews?.map((review, index) => {
        return <Review key={index} review={review} />;
      })}
    </>
  );
};
