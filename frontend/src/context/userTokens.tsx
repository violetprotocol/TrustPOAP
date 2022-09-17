import { createContext } from "react";
import { useAccount } from "wagmi";

export const UserTokensContext = createContext(null);

export const UserTokenProvider = ({ children }) => {
  const { address } = useAccount();
  return (
    <UserTokensContext.Provider value={{ address: address }}>
      {children}
    </UserTokensContext.Provider>
  );
};
