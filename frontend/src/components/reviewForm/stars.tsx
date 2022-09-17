import { useState } from "react";

export const Stars = () => {
  const [rating, setRating] = useState<number>(5);

  return (
    <div className="rating">
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(1)}
        checked={rating === 1}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(2)}
        checked={rating === 2}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(3)}
        checked={rating === 3}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(4)}
        checked={rating === 4}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(5)}
        checked={rating === 5}
      />
    </div>
  );
};
