import Link from "next/link";
import { useContext } from "react";

import { UserTokensContext } from "../context/userTokens";

export const LeaveReviewCard = () => {
  const ctx = useContext(UserTokensContext);
  const eventId = ctx?.event?.id;

  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl my-4">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <Link href={`/form/${eventId}`}>
            <button className="btn btn-secondary">Leave a review</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaveReviewCard;
