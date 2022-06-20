import React, { useContext, useState } from "react";
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
import { popNotification } from "../common/ToastNotif";
import { RatingBar } from "./RatingBar";
import { ReportReviewModal } from "./ReportReviewModal";
import parse from "html-react-parser";

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
    popNotification("Review reported!");

    refetchReviews();
  };

  return (
    <div className="mb-4 w-80 lg:w-full">
      <div className="flex items-center mb-4">
        <div className="w-20">
          <Avatar avatarOption={user_avatar} />
        </div>
        <div className="w-3/4 break-words font-light whitespace-pre-wrap ">
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

      <footer className="mb-5 text-sm text-gray-500 ">
        <p>Reviewed on {parseDate(review.review_created_at)}</p>
      </footer>

      {review.review_description && (
        <p className="mb-2 font-light text-gray-500  border-gray-300 border-2 rounded-lg p-4">
          {parse(review.review_description as string)}
        </p>
      )}

      <div>
        <p className="mt-1 text-xs text-gray-500 ">
          {review.review_helpful_count} people found this helpful
        </p>
        <div className="flex items-center mt-3 ">
          <button
            onClick={review.votedHelpfulByUser ? unvoteHelpful : voteHelpful}
            className={`
            transition-all duration-200
            ${
              review.votedHelpfulByUser
                ? `bg-green-500 text-green-100 `
                : `bg-green-100 text-green-700 hover:bg-green-200`
            } rounded-md text-sm font-medium  p-2  ease-in-out delay-150 hover:scale-110`}
          >
            Helpful
          </button>

          <button
            disabled={review.reportedByUser}
            onClick={() => {
              setShowModal(true);
            }}
            className={`
            ${
              review.reportedByUser
                ? `bg-red-500 text-red-100 `
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
