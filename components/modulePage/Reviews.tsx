import React from "react";
import { useQuery } from "react-query";
import { IReviewByUser } from "../../utils/interface";
import { supabase } from "../../utils/supabase";
import { Review } from "./Review";

export const Reviews = () => {
  const { data: reviews } = useQuery<IReviewByUser[]>("reviews", async () => {
    const { data } = await supabase.from("Reviews").select(`*,Users(*)`);
    return data as any;
  });

  if (!reviews) {
    return null;
  }

  return (
    <>
      {reviews.map((review, index) => {
        return <Review key={index} review={review} />;
      })}
    </>
  );
};
