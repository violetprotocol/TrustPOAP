import { useEffect, useState } from "react";
import { GitPoap, GitPoapApiClient } from "../services/gitPoapApiClient";

export const useHasPoapFromEvent = (eventId: string, address: string) => {
  const [poap, setPoap] = useState<GitPoap>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const gitPoapApiClient = new GitPoapApiClient();
    (async () => {
      if (!address || !eventId) return;

      setLoading(true);
      const response = await gitPoapApiClient.getUserPoapByEvent(
        eventId,
        address
      );
      if (response?.tokenId) {
        setPoap(response);
      }
      setLoading(false);
    })();
  }, [address, eventId]);

  return { poap, isLoading };
};
