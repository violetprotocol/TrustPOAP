import { createContext } from "react";
import { useAccount } from "wagmi";
import { useCheckHumanBoundToken, useHasHBT } from "./useCheckHumanBoundToken";

export const UserTokensContext = createContext(null);

export const UserTokenProvider = ({ children }) => {
  const { address } = useAccount();
  const balance = useHasHBT(address);
  // const {isLoading, tokenId} = useCheckHumanBoundToken(address);

  return (
    <UserTokensContext.Provider value={{ address: address, balance: balance }}>
      {children}
    </UserTokensContext.Provider>
  );
};
