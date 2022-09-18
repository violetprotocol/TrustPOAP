import { BigNumber, ContractTransaction } from "ethers";
import { useContext } from "react";

import { UserTokensContext } from "../../context/userTokens";
import { GitPoap } from "../../services/gitPoapApiClient";

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

export const SubmitReview = ({ tx, ipfsHash }) => {
  const ctx = useContext(UserTokensContext);
  const { hbtTokenId, userPOAP } = ctx;

  return (
    <button
      disabled={!ipfsHash}
      className="btn btn-primary mt-5 w-1/2"
      onClick={() => submitReview(tx, ipfsHash, hbtTokenId, userPOAP)}
    >
      Step 2. Submit Review
    </button>
  );
};
