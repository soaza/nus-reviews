import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import {
  calculateOverallScore,
  parseDate,
  ratingTypes,
} from "../../utils/common";
import { UserContext } from "../../utils/context";
import { IReviewByUser } from "../../utils/interface";
import { supabase } from "../../utils/supabase";
import { Avatar } from "../Avatar";
import { Divider } from "../common/Divider";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { RatingBar } from "./RatingBar";
import { ReportReviewModal } from "./ReportReviewModal";

export const Review = (props: {
  review: IReviewByUser;
  refetchReviews: () => void;
}) => {
  const { review, refetchReviews } = props;
  const { user_name, user_avatar } = review.Users;

  const { user: currentUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

  const voteHelpful = async () => {
    await supabase
      .from("HelpfulVotes")
      .insert([{ review_id: review.review_id, user_id: currentUser.user_id }]);
    refetchReviews();
  };

  const unvoteHelpful = async () => {
    await supabase
      .from("HelpfulVotes")
      .delete()
      .match({ review_id: review.review_id, user_id: currentUser.user_id });
    refetchReviews();
  };

  const reportReview = async () => {
    await supabase
      .from("ReportedReviews")
      .insert([{ review_id: review.review_id, user_id: currentUser.user_id }]);
    refetchReviews();
  };

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
        <p>Reviewed on {parseDate(review.review_created_at)}</p>
      </footer>

      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
        {review.review_description}
      </p>

      <div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {review.review_helpful_count} people found this helpful
        </p>
        <div className="flex items-center mt-3 ">
          <button
            disabled={review.reportedByUser}
            onClick={review.votedHelpfulByUser ? unvoteHelpful : voteHelpful}
            className={`${
              review.votedHelpfulByUser
                ? `bg-green-700 text-green-100 `
                : `bg-green-100 text-green-700 hover:bg-green-200`
            } rounded-md text-sm font-medium  p-2 transition ease-in-out delay-150 hover:scale-110`}
          >
            Helpful
          </button>

          <button
            onClick={() => {
              if (!review.reportedByUser) {
                setShowModal(true);
              }
            }}
            className={`
            ${
              review.reportedByUser
                ? `bg-red-700 text-red-100 `
                : `bg-red-100 text-red-700 hover:bg-red-200`
            }
            ml-4  rounded-md text-sm font-medium p-2 transition ease-in-out delay-150 hover:scale-110`}
          >
            {review.reportedByUser ? "Reported" : "Report"}
          </button>
        </div>
      </div>

      {showModal && (
        <ReportReviewModal
          showModal={showModal}
          setShowModal={setShowModal}
          reportReview={reportReview}
        />
      )}

      {/* <div className="mt-4 text-center font-light text-gray-400">
        {" "}
        This comment was originally posted on NUSMods
      </div> */}

      <Divider />
    </div>
  );
};
