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
  const reviewerAddressParsed = reviewerAddress ? reviewerAddress : "sudoferraz.eth";
  const reviewScoreParsed = reviewScore ? reviewScore : 3;
  const reviewTitleParsed = reviewTitle ? reviewTitle : "I cannot believe this event was free!";
  const reviewBodyParsed = reviewBody ? reviewBody : "This was my first time in Berlin and I had 6 different doughnuts. Food is much better than back in my days in Nam. I was expecting to see Vitalik though.";
  const reviewDateParsed = reviewDate ? reviewDate : "Sept. 21 2022";


  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl">
      <div className="card-body">
            <div className="flex justify-between">
            <span className="badge">{reviewerAddressParsed}</span>
              <div className="rating gap-1">
                <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked={reviewScoreParsed >= 1}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked={reviewScoreParsed >= 2}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" checked={reviewScoreParsed >= 3}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" checked={reviewScoreParsed >= 4}/>
                <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" checked={reviewScoreParsed >= 5}/>
              </div>
            </div>
        <h2 className="card-title pt-3">{reviewTitleParsed}</h2>
        <p>
          {reviewBodyParsed}
        </p>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between"> 
        <div className="flex">
          <div className="pl-5 pb-5"> 👍 Useful </div>
          <div className="pl-5 pb-5"> 👎 Not useful </div>
        </div>
        <div>
          <a className="pr-5">{reviewDateParsed}</a>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
