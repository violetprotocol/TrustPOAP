import { useEffect, useState } from "react";
import { BigNumber, ContractTransaction, ethers } from "ethers";
import { useProvider, useSigner } from "wagmi";

import contractAbi from "./constants/trustpoapContractABI.json";
import soulboundTokenConstants from "./constants/soulboundTokenConstants.json";

export const useSubmitReview = () => {
  const provider = useProvider();
  const { data: wagmiSigner } = useSigner();
  const [submitReview, setSubmitReview] = useState<
    (
      eventId: number,
      hbtId: BigNumber,
      poapTokenId: BigNumber,
      uri: string,
      opts?: any
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
