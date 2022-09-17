import { FC } from "react";

interface ReviewCardProps {
  reviewerAddress: string;
  reviewScore: number;
  reviewTitle: string;
  reviewBody: string;
  reviewDate: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({
  reviewerAddress,
  reviewScore,
  reviewTitle,
  reviewBody,
  reviewDate,
}) => {

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-2xl">
      <div className="card-body">
            <div className="flex justify-between">
            <span className="badge">sudoferraz.eth</span>
              <div className="rating gap-1">
                <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked={true}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked={false}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" checked={false}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" checked={false}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" checked={false}/>
              </div>
            </div>
        <h2 className="card-title pt-3">I cannot believe this event was free!</h2>
        <p>
          This was my first time in Berlin and I had 6 different doughnuts. Food is much better than back in my days in Nam.
          I was expecting to see Vitalik though.
        </p>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between"> 
        <div className="flex">
          <div className="pl-5 pb-5"> 👍 Useful </div>
          <div className="pl-5 pb-5"> 👎 Not useful </div>
        </div>
        <div>
          <a className="pr-5"> Sept. 21 2022 </a>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
