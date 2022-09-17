import { createContext } from "react";
import { useAccount } from "wagmi";
import { useHasHBT } from "./useCheckHumanBoundToken";

export const UserTokensContext = createContext(null);

export const UserTokenProvider = ({ children }) => {
  const { address } = useAccount();
  const hasHBT = useHasHBT(address);
  return (
    <UserTokensContext.Provider value={{ address, hasHBT }}>
      {children}
    </UserTokensContext.Provider>
  );
};
