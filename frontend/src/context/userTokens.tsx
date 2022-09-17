import { createContext, useState } from "react";
import { useAccount } from "wagmi";
import { GitPoapEvent } from "../services/gitPoapApiClient";
import { useHasHBT } from "./useCheckHumanBoundToken";
import { useHBTTokenId } from "./useGetHumanBoundTokenId";

export const UserTokensContext = createContext(null);

export const UserTokenProvider = ({ children }) => {
  const { address } = useAccount();
  const hasHBT = useHasHBT(address);
  const hbtTokenId = useHBTTokenId(address, hasHBT);

  const [event, setEvent] = useState<GitPoapEvent>();

  const ctxValue = { address, hasHBT, hbtTokenId, event, setEvent };

  return (
    <UserTokensContext.Provider value={ctxValue}>
      {children}
    </UserTokensContext.Provider>
  );
};
