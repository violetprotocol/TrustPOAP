import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useProvider } from "wagmi";

import contractAbi from "./constants/contractAbi.json";
import soulboundTokenConstants from "./constants/soulboundTokenConstants.json";

export const useHasHBT = (address: string) => {
  const provider = useProvider();
  const [hasHBT, setHasHBT] = useState(false);

  useEffect(() => {
    (async () => {
      if (!address) return;

      const environment = process.env.NEXT_PUBLIC_NODE_ENV;
      const soulboundAddress =
        environment === "development"
          ? soulboundTokenConstants.soulboundTokenContractAddressPolygonMumbai
          : soulboundTokenConstants.soulboundTokenContractAddressPolygon;

      const contract = new ethers.Contract(
        soulboundAddress,
        contractAbi,
        provider
      );
      const hbtBalance = await contract.callStatic.balanceOf(address);
      const hbtBalanceStr = ethers.utils.formatEther(
        hbtBalance.mul(BigNumber.from("1000000000000000000"))
      );
      setHasHBT(parseInt(hbtBalanceStr) > 0.001);
    })();
  }, [address, provider]);

  return hasHBT;
};
