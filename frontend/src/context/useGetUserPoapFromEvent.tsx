import { useEffect, useState } from "react";
import { GitPoap, GitPoapApiClient } from "../services/gitPoapApiClient";

export const useHasPoapFromEvent = (eventId: string, address: string) => {
  const [poap, setPoap] = useState<GitPoap>(null);

  useEffect(() => {
    const gitPoapApiClient = new GitPoapApiClient();
    (async () => {
      if (!address || !eventId) return;

      const response = await gitPoapApiClient.getUserPoapByEvent(
        eventId,
        address
      );
      if (response?.tokenId) {
        setPoap(response);
      }
    })();
  }, [address, eventId]);

  return poap;
};
