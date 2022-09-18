import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useHasPoapFromEvent } from "../context/useGetUserPoapFromEvent";
import { UserTokensContext } from "../context/userTokens";
import { RatingStars } from "./ratingStars";

export const LeaveReviewCard = (props) => {
  const router = useRouter();
  const ctx = useContext(UserTokensContext);
  const userPoap = useHasPoapFromEvent(ctx.event.id, ctx.address);

  const onClick = async () => {
    router.push("/form");
  };

  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl my-4">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <a className="link" onClick={onClick}>
            {props.firstReview
              ? "Be the first to leave a review"
              : "Leave a review"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeaveReviewCard;
