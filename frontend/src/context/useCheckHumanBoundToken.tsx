import { useCallback, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useAccount, useNetwork, useProvider, useSigner } from "wagmi";

import contractAbi from "./constants/contractAbi.json";
import soulboundTokenConstants from "./constants/soulboundTokenConstants.json";

export const useHasHBT = (address) => {
  const provider = useProvider();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    (async () => {
      if (!address) return false;

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
      setBalance(hbtBalance);
    })();
  }, [address, provider]);

  return balance;
};

export const isChainSupported = (provider, chainId?: number): boolean => {
  // Checks if chainId is included on the supported Chains from provider
  if (chainId === undefined || provider) return false;
  const { chains: supportedChains } = provider;
  return supportedChains.some(
    (supportedChain) => supportedChain.id === chainId
  );
};

export const useCheckHumanBoundToken = () => {
  const provider = useProvider();
  const { chain } = useNetwork();
  const { data: wagmiSigner } = useSigner();
  const { address } = useAccount();

  const [chainId, setChainId] = useState<number>();
  const [isBadState, setBadState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<BigNumber>();

  const environment = process.env.NEXT_PUBLIC_NODE_ENV;
  const soulboundConstantsByEnvironment =
    environment === "development"
      ? [
          soulboundTokenConstants.soulboundTokenContractAddressPolygonMumbai,
          soulboundTokenConstants.soulboundTokenFromBlockPolygonMumbai,
        ]
      : [
          soulboundTokenConstants.soulboundTokenContractAddressPolygon,
          soulboundTokenConstants.soulboundTokenFromBlockPolygon,
        ];

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

  const checkUserMinted = useCallback(async () => {
    if (!chainId || isLoading) {
      setBadState(true);
      return;
    }

    try {
      setIsLoading(true);
      const events = await provider.getLogs({
        fromBlock: soulboundConstantsByEnvironment[1],
        toBlock: "latest",
        address: soulboundConstantsByEnvironment[0].toString(),
        topics: [
          ethers.utils.id("Minted(address,uint256)"),
          ethers.utils.hexZeroPad(address, 32),
        ],
      });

      if (events.length > 0) {
        const id = events[0].topics[2];
        const blockHash = events[0].blockHash;

        const block = await provider.getBlock(blockHash);

        setTokenId(BigNumber.from(id));
      } else {
        setTokenId(null);
      }
    } catch (e) {
      setBadState(true);
      console.log(e);
    }

    setIsLoading(false);
  }, [address, chainId, isLoading, provider]);

  useEffect(() => {
    const isSupportedChain = isChainSupported(provider, chainId);
    if (isSupportedChain) {
      checkUserMinted();
    }
  }, [chainId, address, checkUserMinted]);

  if (!address)
    return {
      isLoading: false,
      isBadState: false,
      tokenId: false,
      chainId,
    };

  return {
    isLoading,
    isBadState,
    tokenId,
    chainId,
  };
};
