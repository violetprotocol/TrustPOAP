import { useState } from "react";

export const Stars = ({ register }) => {
  const [rating, setRating] = useState<number>(5);

  return (
    <div className="rating">
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(1)}
        checked={rating === 1}
        value={1}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(2)}
        checked={rating === 2}
        value={2}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(3)}
        checked={rating === 3}
        value={3}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(4)}
        checked={rating === 4}
        value={4}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        onClick={() => setRating(5)}
        checked={rating === 5}
        value={5}
        {...register("rating", { required: true })}
      />
    </div>
  );
};
