import React from "react";
import { useQuery } from "react-query";
import { getLeaderboardModules, getMostHelpfulReviews } from "../../utils/api";
import { Review } from "../ModuleCodePage/Review";
import { ReviewCard } from "./ReviewCard";

export const ReviewsBoard = () => {
  const { data: reviews } = useQuery(["leaderboard_reviews"], async () => {
    const data = await getMostHelpfulReviews();
    return data;
  });

  return (
    <>
      {reviews?.map((review) => {
        return <ReviewCard key={review.review_id} review={review} />;
      })}
    </>
  );
};
