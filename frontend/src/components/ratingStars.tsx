import React from "react";

export const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="rating rating-lg rating-half">
      <input
        type="radio"
        name="rating-10"
        className="rating-hidden"
        checked={rating == 0}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 0}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 0.5}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 1}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 1.5}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 2}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 2.5}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 3}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 3.5}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 4}
        readOnly
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 4.5}
        readOnly
      />
    </div>
  );
};
