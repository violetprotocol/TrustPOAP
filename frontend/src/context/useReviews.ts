import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

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
