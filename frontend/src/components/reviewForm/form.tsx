import { ContractTransaction } from "ethers";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHasPoapFromEvent } from "../../context/useGetUserPoapFromEvent";
import { UserTokensContext } from "../../context/userTokens";
import { useSubmitReview } from "../../context/useTrustPoap";
import { GitPoap } from "../../services/gitPoapApiClient";

import { postToIpfs } from "../../services/pinata";
import { ErrorDisplay, LabeledInput } from "./labeledInput";
import { Stars } from "./stars";

export interface ReviewData {
  rating: number;
  title: string;
  content: string;
}

const useReviewForm = () => {
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<ReviewData> = async (data: ReviewData) => {
    const hash = await postToIpfs(data);
    setIpfsHash(hash);
  };
  const submit = handleSubmit(onSubmit);

  return { submit, register, errors, ipfsHash };
};

const submitReview = async (
  submitReviewTx: (
    eventId: number,
    hbtId: number,
    poapTokenId: number,
    uri: string
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
      parseInt(hbtTokenId),
      parseInt(userPoap.tokenId),
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
  <div>
    <div className="flex justify start">
    <p className="text-3xl"> ✅ {" "} </p>
    <p className="pl-3 pt-1"> You hold a Humanbound Token </p>
    </div>
  </div>
  <div>
    <div className="flex justify start">
    <p className="text-3xl"> ✅ {" "} </p>
    <p className="pl-3 pt-1"> Verifying POAP ownership for this event... </p>
    </div>
  </div>
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

          <h2 className="text-left text-lg text-primary">Submit your review</h2>
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
    </form>
    </div>
  );
};
