import { ratingTypes, parseDate } from "../../utils/common";
import { IReviewByUserLeaderboard } from "../../utils/interface";
import { Avatar } from "../Avatar";
import { Divider } from "../common/Divider";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { RatingBar } from "../ModuleCodePage/RatingBar";
import parse from "html-react-parser";
import Link from "next/link";

export const ReviewCard = (props: { review: IReviewByUserLeaderboard }) => {
  const { review } = props;

  const { user_name, user_avatar } = review;

  return (
    <div className="mt-12 mb-4 w-80 lg:w-3/4 self-center">
      <div className="mb-2 font-light text-gray-500  border-gray-300 border-2 rounded-lg p-4 relative">
        <div className="w-20 absolute ml-auto mr-auto text-center left-0 right-0 -top-12">
          <Avatar avatarOption={user_avatar} />
        </div>

        <div className="mt-8 text-center">
          <span className="font-bold">{user_name} </span>
          on{" "}
          <span className=" text-orange-500">
            <Link href={`/module/${review.review_module_code}`}>
              {review.review_module_code}
            </Link>
          </span>
          <div> {review.review_helpful_count} users found it helpful! 😄</div>
        </div>

        <div>
          <div className="flex items-center mb-1">
            <OverallRatingScore score={review.overall_score} />
          </div>

          <div>
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
        </div>

        {parse(review.review_description as string)}
      </div>

      <Divider />
    </div>
  );
};
