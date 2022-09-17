import { createContext, useState } from "react";
import { useAccount } from "wagmi";
import { GitPoapEvent } from "../services/gitPoapApiClient";
import { useHasHBT } from "./useCheckHumanBoundToken";

export const UserTokensContext = createContext(null);

export const UserTokenProvider = ({ children }) => {
  const [event, setEvent] = useState<GitPoapEvent>();
  const { address } = useAccount();
  const hasHBT = useHasHBT(address);
  return (
    <UserTokensContext.Provider value={{ address, hasHBT, event, setEvent }}>
      {children}
    </UserTokensContext.Provider>
  );
};
