import Link from "next/link";
import { useContext } from "react";

import { UserTokensContext } from "../context/userTokens";

export const LeaveReviewCard = ({ firstReview }) => {
  const ctx = useContext(UserTokensContext);
  const eventId = ctx?.event?.id;

  return (
    <div className="card lg:card-bottom max-w-2xl my-4">
      <div className="card-body">
        <div className="mx-auto w-1/2">
          <Link href={{ pathname: "/form/[id]", query: { id: eventId } }}>
            <button disabled={!eventId} className="btn btn-primary w-full">
              {firstReview
                ? "Be the first to leave a review"
                : "Leave a review"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaveReviewCard;
