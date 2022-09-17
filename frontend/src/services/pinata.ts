import { ReviewData } from "../components/reviewForm/form";
import { HttpStatus } from "./http-status.enum";

const PINATA_PIN_POST_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

export const postToIpfs = async (data: ReviewData): string => {
  const pinataData = {
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      creationTime: Math.floor((new Date() as any) / 1000),
      ...data,
    },
  };

  const pinataDataStr = JSON.stringify(pinataData);
  var config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: pinataDataStr,
  };

  const response = (await fetch(PINATA_PIN_POST_URL, config)) as any;

  if (response?.status != HttpStatus.OK) {
    console.error("Couldn't post review to IPFS");
    return "";
  }

  const resBody = await response.json();
  const hash = resBody?.IpfsHash;
  if (!hash) console.error("Couldn't get hash of review from IPFS response");
  return hash;
};
