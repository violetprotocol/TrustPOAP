
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useProvider } from "wagmi";

export const useHasHBT = (address: string) => {
  const provider = useProvider();
  // const [hasHBT, setHasHBT] = useState(false);
  const [tokenId, setTokenId] = useState<BigNumber>();
  const soulboundTokenFromBlockPolygon = 33099064;
  const soulboundAddress = "0x41be3a6c17cf76442d9e7b150de4870027d36f52";

  useEffect(() => {
    (async () => {
      if (!address) return false;

      const events = await provider.getLogs({
        fromBlock: soulboundTokenFromBlockPolygon,
        toBlock: "latest",
        address: soulboundAddress,
        topics: [
          ethers.utils.id("Minted(address,uint256)"),
          ethers.utils.hexZeroPad(address, 32),
        ],
      });

      if (events.length > 0) {
        const id = events[0].topics[2];
        setTokenId(BigNumber.from(id));
      } else {
        setTokenId(null);
      }
    })();
  }, [address, provider]);

  return tokenId;
};
