import { SubmitHandler, useForm } from "react-hook-form";

import { postToIpfs } from "../../services/pinata";
import { ErrorDisplay, LabeledInput } from "./labeledInput";
import { Stars } from "./stars";

export interface ReviewData {
  rating: number;
  title: string;
  content: string;
}

const useReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<ReviewData> = async (data: ReviewData) => {
    console.log(JSON.stringify(data));
    await postToIpfs(data);
  };
  const submit = handleSubmit(onSubmit);

  return { submit, register, errors };
};

export const ReviewForm = () => {
  const { submit, register, errors } = useReviewForm();

  return (
    <form onSubmit={submit}>
      <LabeledInput text="Rate this event">
        <Stars register={register} />
      </LabeledInput>
      {errors?.rating && <ErrorDisplay>Rating is required</ErrorDisplay>}

      <LabeledInput text="Title">
        <input
          type="text"
          placeholder="ETHBerlin Recommendation"
          className="input input-bordered w-full max-w-xs"
          {...register("title", { required: true })}
        />
      </LabeledInput>
      {errors?.title && <ErrorDisplay>A review title is required</ErrorDisplay>}

      <LabeledInput text="Review Content">
        <textarea
          className="textarea textarea-bordered"
          placeholder="Write your review here"
          {...register("content", { required: true })}
        />
      </LabeledInput>
      {errors?.content && (
        <ErrorDisplay>A review content is required</ErrorDisplay>
      )}

      <button type="submit" className="btn btn-primary mt-5">
        Submit
      </button>
    </form>
  );
};
