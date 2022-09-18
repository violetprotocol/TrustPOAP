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
  const userPoap = ctx.userPOAP;
  const { submit, register, errors, ipfsHash } = useReviewForm();
  const submitReviewTx = useSubmitReview();

  return (
    <div>
      <div>
        <FormChecks
          userHasPoap={userPoap?.tokenId !== undefined}
          userHasHbt={ctx.hasHBT}
        />
        <form onSubmit={submit}>
          <div className="mx-auto p-2 flex content-center">
            <LabeledInput text="Rate this event">
              <Stars register={register} />
            </LabeledInput>
            {errors?.rating && <ErrorDisplay>Rating is required</ErrorDisplay>}
          </div>

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

        {!ipfsHash && (
          <p className="break-words rounded-xl px-5 py-3 text-xs font-mono">
            🎉 Review stored at{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`http://ipfs.io/ipfs/${ipfsHash}`}
            >
              ipfs://{ipfsHash}
            </a>
          </p>
        )}

        <button
          disabled={!ipfsHash}
          className="btn btn-primary mt-5 w-1/2"
          onClick={() =>
            submitReview(submitReviewTx, ipfsHash, ctx.hbtTokenId, userPoap)
          }
        >
          Step 2. Submit Review
        </button>
      </div>
    </div>
  );
};
