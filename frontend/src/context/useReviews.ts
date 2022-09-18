import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

import contractAbi from "./constants/trustpoapContractABI.json";
import soulboundTokenConstants from "./constants/soulboundTokenConstants.json";
import { getReviewFromIpfs } from "../services/ipfs";
import { ReviewData } from "../components/reviewForm/form";

export const useReviews = (eventId: number) => {
  const eventReviewHashes = useReviewHashes(eventId);
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    (async () => {
      if (!eventReviewHashes) return;
      const reviews = await Promise.all(
        eventReviewHashes.map(
          async (hash): Promise<ReviewData | null> =>
            await getReviewFromIpfs(hash)
        )
      );
      setReviews(reviews);
    })();
  }, [eventReviewHashes]);

  return reviews;
};

export const useReviewHashes = (eventId: number) => {
  const provider = useProvider();
  const [hashes, setHashes] = useState<string[]>([]);

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
      console.log(reviewURIs);
      setHashes(reviewURIs);
    })();
  }, [eventId, provider]);

  return hashes;
};
