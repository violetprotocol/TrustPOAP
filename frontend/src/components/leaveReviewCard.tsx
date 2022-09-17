import Link from "next/link";
import { useRouter } from "next/router";
import { RatingStars } from "./ratingStars";

export const LeaveReviewCard = () => {
  const router = useRouter();

  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl mb-4">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <a className="link" onClick={() => {router.push("/form")}}>
            Leave your review
          </a>
          <RatingStars rating={0} />
        </div>
      </div>
    </div>
  );
};

export default LeaveReviewCard;
