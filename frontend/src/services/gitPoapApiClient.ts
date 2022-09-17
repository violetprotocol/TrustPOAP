import { URLBuilder } from "./urlBuilder";

export type GitPoapEvent = {
  id: number
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  from_admin?: boolean;
  virtual_event?: boolean;
  event_template_id?: number,
  event_host_id?: number;
  private_event?: boolean;
}

export type GitPoap = {
  event: GitPoapEvent;
  tokenId: string;
  owner: string;
  layer: string;
  created: string;
  supply: GitPoapSupply;
}

export type GitPoapSupply = {
  total: number;
  order: number;
}

export class GitPoapApiClient {
  getEvent = async (eventId: string) => {

    const getEventUrl = new URLBuilder("https://api.poap.xyz/events/id/")
      .appendPath(eventId.toString())
      .build();

    const data = await fetch(getEventUrl.toString())
    .then(response => response.json())
    .then(data => {
      return data;
    }).catch((e) => {
      throw e;
    });

    return data
  }

  getUserPoapByEvent = async (eventId: string, walletAddress: string) => {
    const getUserPoapByEventUrl = new URLBuilder("https://api.poap.tech/actions/scan/")
      .appendPath(walletAddress.toString().toLowerCase())
      .appendPath(eventId.toString())
      .build();

    const data = await fetch(getUserPoapByEventUrl)
    .then(response => response.json())
    .then(data => {
      return data;
    }).catch((e) => {
      throw e;
    });
    
    return data;
  }
}
