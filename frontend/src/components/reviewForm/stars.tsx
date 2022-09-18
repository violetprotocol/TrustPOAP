import { useState } from "react";

export const Stars = ({ register }) => {
  const [rating, setRating] = useState<number>(2);

  const colour = () => {
    switch (rating) {
      case 1:
        return "bg-red-400";
      case 2:
        return "bg-orange-400";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-lime-400";
      case 5:
        return "bg-green-400";
    }
  };

  return (
    <div className="rating gap-1 rating-lg">
      <input
        type="radio"
        name="rating-3"
        className={`mask mask-star-2 ${colour()}`}
        onClick={() => setRating(1)}
        checked={rating === 1}
        value={1}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-3"
        className={`mask mask-star-2 ${colour()}`}
        onClick={() => setRating(2)}
        checked={rating === 2}
        value={2}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-3"
        className={`mask mask-star-2 ${colour()}`}
        onClick={() => setRating(3)}
        checked={rating === 3}
        value={3}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-3"
        className={`mask mask-star-2 ${colour()}`}
        onClick={() => setRating(4)}
        checked={rating === 4}
        value={4}
        {...register("rating", { required: true })}
      />
      <input
        type="radio"
        name="rating-3"
        className={`mask mask-star-2 ${colour()}`}
        onClick={() => setRating(5)}
        checked={rating === 5}
        value={5}
        {...register("rating", { required: true })}
      />
    </div>
  );
};
