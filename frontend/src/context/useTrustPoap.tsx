import { useEffect, useState } from "react";
import {
  BigNumber,
  ContractFunction,
  ContractTransaction,
  ethers,
} from "ethers";
import { useProvider } from "wagmi";

import contractAbi from "./constants/trustpoapContractABI.json";
import soulboundTokenConstants from "./constants/soulboundTokenConstants.json";

export const useReviews = (eventId: number) => {
  const provider = useProvider();
  const [reviews, setReviews] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      if (!eventId) return;

      const environment = process.env.NEXT_PUBLIC_NODE_ENV;
      const trustPoapAddress =
        environment === "development"
          ? soulboundTokenConstants.trustPoapContractAddressPolygonMumbai
          : soulboundTokenConstants.trustPoapContractAddressPolygon;

      const contract = new ethers.Contract(
        trustPoapAddress,
        contractAbi,
        provider
      );
      const reviewURIs = await contract.callStatic.getEventReviewURIs(eventId);
      setReviews(reviewURIs);
    })();
  }, [eventId, provider]);

  return reviews;
};

export const useSubmitReview = () => {
  const provider = useProvider();
  const [submitReview, setSubmitReview] =
    useState<
      (
        eventId: number,
        hbtId: number,
        poapTokenId: number,
        uri: string
      ) => Promise<ContractTransaction>
    >();

  useEffect(() => {
    (async () => {
      const environment = process.env.NEXT_PUBLIC_NODE_ENV;
      const trustPoapAddress =
        environment === "development"
          ? soulboundTokenConstants.trustPoapContractAddressPolygonMumbai
          : soulboundTokenConstants.trustPoapContractAddressPolygon;

      const contract = new ethers.Contract(
        trustPoapAddress,
        contractAbi,
        provider
      );
      setSubmitReview(contract.submitReview);
    })();
  }, [provider]);

  return submitReview;
};