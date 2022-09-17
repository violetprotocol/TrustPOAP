import { useEffect, useState } from "react";
import {
  BigNumber,
  ContractFunction,
  ContractTransaction,
  ethers,
} from "ethers";
import { useProvider, useSigner } from "wagmi";

import contractAbi from "./constants/trustpoapContractABI.json";
import soulboundTokenConstants from "./constants/soulboundTokenConstants.json";

export const useReviews = (eventId: number) => {
  const provider = useProvider();
  const [reviews, setReviews] = useState<string[]>([]);

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
  const { data: wagmiSigner } = useSigner();
  const [submitReview, setSubmitReview] = useState<
    (
      eventId: number,
      hbtId: BigNumber,
      poapTokenId: BigNumber,
      uri: string
    ) => Promise<ContractTransaction>
  >(
    () =>
      (
        eventId: number,
        hbtId: BigNumber,
        poapTokenId: BigNumber,
        uri: string
      ) => {
        return null;
      }
  );

  useEffect(() => {
    (async () => {
      if (wagmiSigner && provider) {
        const environment = process.env.NEXT_PUBLIC_NODE_ENV;
        const trustPoapAddress =
          environment === "development"
            ? soulboundTokenConstants.trustPoapContractAddressPolygonMumbai
            : soulboundTokenConstants.trustPoapContractAddressPolygon;

        let contract = new ethers.Contract(
          trustPoapAddress,
          contractAbi,
          provider
        );
        contract = await contract.connect(wagmiSigner);
        setSubmitReview(() => contract.submitReview);
      }
    })();
  }, [wagmiSigner, provider]);

  return submitReview;
};
