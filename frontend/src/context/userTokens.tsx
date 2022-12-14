import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { GitPoapEvent } from "../services/gitPoapApiClient";
import { useHasHBT } from "./useCheckHumanBoundToken";
import { useHBTTokenId } from "./useGetHumanBoundTokenId";
import { useHasPoapFromEvent } from "./useGetUserPoapFromEvent";

export const UserTokensContext = createContext(null);

const useHasPOAP = (address: string, eventId: number) => {
  const [id, setId] = useState<string>("");
  const { poap: userPOAP, isLoading } = useHasPoapFromEvent(id, address);

  useEffect(() => {
    if (!eventId) return;
    if (id === eventId.toString()) return;
    setId(eventId.toString());
  }, [eventId, id]);

  return { userPOAP, isLoading };
};

const useEventId = (setEvent) => {
  const { query } = useRouter();
  const id = query?.id as string;
  useEffect(() => {
    if (!id) return;
    setEvent((event: GitPoapEvent) => ({ id: parseInt(id), ...event }));
  }, [id, setEvent]);
};

export const UserTokenProvider = ({ children }) => {
  const { address } = useAccount();
  const { hasHBT, isLoading: hbtLoading } = useHasHBT(address);
  const hbtTokenId = useHBTTokenId(address, hasHBT);

  const [event, setEvent] = useState<GitPoapEvent>();
  useEventId(setEvent);
  const { userPOAP, isLoading: poapLoading } = useHasPOAP(address, event?.id);

  const isLoading = hbtLoading || poapLoading;
  const ctxValue = {
    address,
    hasHBT,
    hbtTokenId,
    event,
    setEvent,
    userPOAP,
    isLoading,
  };

  return (
    <UserTokensContext.Provider value={ctxValue}>
      {children}
    </UserTokensContext.Provider>
  );
};
