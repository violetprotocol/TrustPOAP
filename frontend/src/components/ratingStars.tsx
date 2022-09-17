import React from "react";

export const RatingStars = ({ rating }: { rating: number }) => {
  console.log("rating", rating);
  return (
    <div className="rating rating-lg rating-half mb-2">
      <input
        type="radio"
        name="rating-10"
        className="rating-hidden"
        checked={rating == 0}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 0}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 0.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 1}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 1.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 2}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 2.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 3}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 3.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-1"
        checked={rating > 4}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-primary mask mask-star-2 mask-half-2"
        checked={rating > 4.5}
      />
    </div>
  );
};
