import { FC } from "react";
import { RatingStars } from "./ratingStars";

interface ReviewCardProps {
  reviewerId?: string;
  reviewScore?: number;
  reviewTitle?: string;
  reviewBody?: string;
  reviewDate?: string;
  reviewRating?: number;
}

export const ReviewCard: FC<ReviewCardProps> = ({
  reviewerId,
  reviewScore,
  reviewTitle,
  reviewBody,
  reviewDate,
  reviewRating = 0,
}) => {
  const reviewerIdParsed = reviewerId ? reviewerId : "Unknown user";
  const reviewScoreParsed = reviewScore ? reviewScore : 3;
  const reviewTitleParsed = reviewTitle
    ? reviewTitle
    : "I cannot believe this event was free!";
  const reviewBodyParsed = reviewBody
    ? reviewBody
    : "This was my first time in Berlin and I had 6 different doughnuts. Food is much better than back in my days in Nam. I was expecting to see Vitalik though.";
  const reviewDateParsed = reviewDate ? reviewDate : "Sept. 21 2022";

  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl mb-4">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <span className="badge">{reviewerIdParsed}</span>
          <RatingStars rating={reviewRating} />
        </div>
        <h2 className="card-title pt-3">{reviewTitleParsed}</h2>
        <p>{reviewBodyParsed}</p>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between">
        <div className="flex tooltip tooltip-primary" data-tip="Coming Soon">
          <div className="pl-5 pb-5"> 👍 Useful </div>
          <div className="pl-5 pb-5"> 👎 Not useful </div>
        </div>
        <div>
          {reviewDateParsed && (
            <a className="pr-5">
              {new Date(parseInt(reviewDateParsed) * 1000).toDateString()}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
