import { BigNumber, ContractTransaction } from "ethers";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHasPoapFromEvent } from "../../context/useGetUserPoapFromEvent";
import { UserTokensContext } from "../../context/userTokens";
import { useSubmitReview } from "../../context/useTrustPoap";
import { GitPoap } from "../../services/gitPoapApiClient";

import { postToIpfs } from "../../services/pinata";
import { FormChecks } from "./formChecks";
import { ErrorDisplay, LabeledInput } from "./labeledInput";
import { Stars } from "./stars";

export interface ReviewData {
  rating: number;
  title: string;
  content: string;
  address?: string;
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
    const dataWithAddress = { ...data, address: ctx.address } as ReviewData;
    const hash = await postToIpfs(dataWithAddress);
    setIpfsHash(hash);
  };
  const submit = handleSubmit(onSubmit);

  return { submit, register, errors, ipfsHash };
};

const submitReview = async (
  submitReviewTx: (
    eventId: number,
    hbtId: BigNumber,
    poapTokenId: BigNumber,
    uri: string,
    opts?: any
  ) => Promise<ContractTransaction>,
  hash: string,
  hbtTokenId?: string,
  userPoap?: GitPoap
) => {
  //get humanBoundTokenId

  if (!hash || !hbtTokenId) {
    console.log("Cannot submit review without IPFS hash or HB token id.");
    return;
  }

  let txHash;
  try {
    const tx = await submitReviewTx(
      userPoap.event.id,
      BigNumber.from(hbtTokenId),
      BigNumber.from(userPoap.tokenId),
      hash
    );

    const receipt = tx.wait();
    txHash = (await receipt).transactionHash;
  } catch (e) {
    alert(e);
    return;
  }

  return txHash;
};

export const ReviewForm = () => {
  const ctx = useContext(UserTokensContext);
  const userPoap = useHasPoapFromEvent(ctx.event.id, ctx.address);
  const { submit, register, errors, ipfsHash } = useReviewForm();
  const submitReviewTx = useSubmitReview();

  return (
    <div>
      <FormChecks userHasPoap={userPoap?.tokenId !== undefined} userHasHbt={ctx.hasHBT} />
      <form onSubmit={submit} className="prose">
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
        {errors?.title && (
          <ErrorDisplay>A review title is required</ErrorDisplay>
        )}

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

        <h2 className="text-left text-lg text-primary mb-1">
          Upload your review on IPFS
        </h2>
        {!ipfsHash && (
          <>
            <button type="submit" className="btn btn-primary mt-5">
              Upload Review
            </button>
          </>
        )}
      </form>

        {ipfsHash && (
          <>
            <button disabled className="btn btn-primary mt-5">
              🥳 Review Uploaded !
            </button>

            <p className="break-words bg-base-300 rounded-xl px-5 py-3">
              🎉 Review stored at{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`http://ipfs.io/ipfs/${ipfsHash}`}
              >
                ipfs://{ipfsHash}
              </a>
            </p>

            <h2 className="text-left text-lg text-primary">
              Submit your review
            </h2>
            <button
              className="btn btn-primary"
              onClick={() =>
                submitReview(submitReviewTx, ipfsHash, ctx.hbtTokenId, userPoap)
              }
            >
              Submit Review
            </button>
          </>
        )}
    </div>
  );
};
