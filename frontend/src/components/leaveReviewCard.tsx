import Link from "next/link";
import { RatingStars } from "./ratingStars";

export const LeaveReviewCard = () => {
  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl mb-4">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <a className="link" href={""}>
            Leave your review
          </a>
          <RatingStars rating={0} />
        </div>
      </div>
    </div>
  );
};

export default LeaveReviewCard;
