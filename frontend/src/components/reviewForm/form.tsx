import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserTokensContext } from "../../context/userTokens";
import { useSubmitReview } from "../../context/useTrustPoap";

import { postToIpfs } from "../../services/pinata";
import { ErrorDisplay, LabeledInput } from "./labeledInput";
import { Stars } from "./stars";
import { SubmitReview } from "./submitReview";

export interface ReviewData {
  rating: number;
  title: string;
  content: string;
  reviewer?: string;
  creationTime?: string;
}

const useReviewForm = () => {
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const ctx = useContext(UserTokensContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<ReviewData> = async (data: ReviewData) => {
    const dataWithAddress = {
      ...data,
      reviewer: ctx.hbtTokenId.toHexString(),
    } as ReviewData;
    const hash = await postToIpfs(dataWithAddress);
    setIpfsHash(hash);
  };
  const submit = handleSubmit(onSubmit);

  return { submit, register, errors, ipfsHash };
};

export const ReviewForm = () => {
  const { submit, register, errors, ipfsHash } = useReviewForm();
  const submitReviewTx = useSubmitReview();

  return (
    <>
      <form onSubmit={submit}>
        <LabeledInput text="Rate this event">
          <Stars register={register} />
        </LabeledInput>
        {errors?.rating && <ErrorDisplay>Rating is required</ErrorDisplay>}

        <LabeledInput text="Title">
          <input
            type="text"
            placeholder="ETHBerlin Recommendation"
            className="input input-bordered wmax-w-xs"
            {...register("title", { required: true })}
          />
        </LabeledInput>
        {errors?.title && (
          <ErrorDisplay>A review title is required</ErrorDisplay>
        )}

        <LabeledInput text="Review Content">
          <textarea
            className="textarea textarea-bordered wmax-w-xs"
            placeholder="Write your review here"
            {...register("content", { required: true })}
          />
        </LabeledInput>
        {errors?.content && (
          <ErrorDisplay>A review content is required</ErrorDisplay>
        )}

        <button
          disabled={!!ipfsHash}
          type="submit"
          className="btn btn-primary mt-5 w-1/2"
        >
          Step 1. Upload Review {ipfsHash ? "✔️" : ""}
        </button>
      </form>

      {ipfsHash && (
        <p className="break-words rounded-xl px-5 py-3 text-xs font-mono">
          🎉 Review stored at{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`http://ipfs.io/ipfs/${ipfsHash}`}
            className="underline underline-offset-2"
          >
            ipfs://{ipfsHash}
          </a>
        </p>
      )}

      <SubmitReview tx={submitReviewTx} ipfsHash={ipfsHash} />
    </>
  );
};
