import Link from "next/link";

export const LeaveReviewCard = () => {

  return (
    <div className="card lg:card-bottom bg-base-100 shadow-xl max-w-2xl">
      <div className="card-body">
        <div className="flex justify-between">
          <a className="link" href={""}>Leave your review</a>
          <div className="rating gap-1">
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked={false}/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked={false}/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" checked={false}/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" checked={false}/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" checked={false}/>
          </div>
        </div>
      </div>
      <div className="flex">
      <a className="pl-8"> Sort By: </a>
      <a className="font-bold pl-1"> Review Date </a>
      </div>
    </div>
  );
};

export default LeaveReviewCard;
