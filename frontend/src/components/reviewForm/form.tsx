import { LabeledInput } from "./labeledInput";
import { Stars } from "./stars";

export const ReviewForm = () => {
  return (
    <form>
      <LabeledInput text="Rate this event">
        <Stars />
      </LabeledInput>

      <LabeledInput text="Title">
        <input
          type="text"
          placeholder="ETHBerlin Recommendation"
          className="input input-bordered w-full max-w-xs"
        />
      </LabeledInput>

      <LabeledInput text="Review Content">
        <textarea
          className="textarea textarea-bordered"
          placeholder="Write your review here"
        />
      </LabeledInput>
    </form>
  );
};
