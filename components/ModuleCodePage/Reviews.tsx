import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../utils/context";
import { IReviewByUser } from "../../utils/interface";
import { supabase } from "../../utils/supabase";
import { Spinner } from "../common/Spinner";
import { FilterDropdown } from "./FilterDropdown";
import { Review } from "./Review";

export const Reviews = (props: { moduleCode: string }) => {
  const { moduleCode } = props;

  const { user: currentUser } = useContext(UserContext);

  const [sortOption, setSortOption] = useState<
    "Most Helpful" | "Recent" | "Oldest" | "Highest Score" | "Lowest Score"
  >("Recent");

  const sortMapping = {
    "Lowest Score": { col: "total_score", ascending: true },
    "Highest Score": { col: "total_score", ascending: false },
    "Most Helpful": { col: "review_helpful_count", ascending: false },
    Recent: { col: "review_created_at", ascending: false },
    Oldest: { col: "review_created_at", ascending: true },
  };

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery<IReviewByUser[]>(
    ["reviews", sortOption, moduleCode, currentUser],
    async () => {
      let { data: reviewData } = await supabase
        .from("Reviews")
        .select(`*,Users!Reviews_review_user_fkey!inner(*)`)
        .eq(`review_module_code`, `${moduleCode}`)
        .order(sortMapping[sortOption].col, {
          ascending: sortMapping[sortOption].ascending,
        });

      if (currentUser) {
        const { data: helpfulVotesData } = await supabase
          .from("HelpfulVotes")
          .select(`review_id`)
          .eq(`user_id`, `${currentUser.user_id}`);

        const { data: reportedReviewsData } = await supabase
          .from("ReportedReviews")
          .select(`review_id`)
          .eq(`user_id`, `${currentUser.user_id}`);

        const reviewsVoted = helpfulVotesData.map((data) => data.review_id);
        const reviewsReported = reportedReviewsData.map(
          (data) => data.review_id
        );

        reviewData = reviewData.map((review) => {
          if (reviewsVoted.includes(review.review_id)) {
            review.votedHelpfulByUser = true;
          } else {
            review.votedHelpfulByUser = false;
          }
          if (reviewsReported.includes(review.review_id)) {
            review.reportedByUser = true;
          } else {
            review.reportedByUser = false;
          }
          return review;
        });
      }

      return reviewData as any;
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
        return (
          <Review
            refetchReviews={refetch}
            key={moduleCode + index}
            review={review}
          />
        );
      })}
    </>
  );
};
