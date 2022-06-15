import React, { useState } from "react";
import { useQuery } from "react-query";
import { IReviewByUser } from "../../utils/interface";
import { supabase } from "../../utils/supabase";
import { Spinner } from "../common/Spinner";
import { FilterDropdown } from "./FilterDropdown";
import { Review } from "./Review";

export const Reviews = (props: { moduleCode: string }) => {
  const { moduleCode } = props;

  const [sortOption, setSortOption] = useState<
    "Most Helpful" | "Recent" | "Oldest"
  >("Recent");

  const sortMapping = {
    "Most Helpful": { col: "review_helpful_count", ascending: false },
    Recent: { col: "review_created_at", ascending: false },
    Oldest: { col: "review_created_at", ascending: true },
  };

  const { data: reviews, isLoading } = useQuery<IReviewByUser[]>(
    ["reviews", sortOption],
    async () => {
      const { data } = await supabase
        .from("Reviews")
        .select(`*,Users(*)`)
        .eq(`review_module_code`, `${moduleCode}`)
        .order(sortMapping[sortOption].col, {
          ascending: sortMapping[sortOption].ascending,
        });

      return data as any;
    }
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="font-light text-center text-2xl mb-4">
          {reviews?.length} Reviews
        </div>

        <FilterDropdown sortOption={sortOption} setSortOption={setSortOption} />
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
