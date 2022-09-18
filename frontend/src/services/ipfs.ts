import { ReviewData } from "../components/reviewForm/form";
import { HttpStatus } from "./http-status.enum";

const correctReviewType = (data: any): boolean => {
  return data?.title && data?.content && data?.rating;
};

export const getReviewFromIpfs = async (
  hash: string
): Promise<ReviewData | null> => {
  if (!hash) return null;

  const response = await fetch(`http://ipfs.io/ipfs/${hash}`);
  if (response.status != HttpStatus.OK) {
    console.error("Couldn't fetch Review from IPFS", hash);
    return null;
  }

  const data = await response.json();
  if (!correctReviewType(data)) {
    console.log("Wrong review type returned from IPFS");
    return null;
  }

  return data as ReviewData;
};
