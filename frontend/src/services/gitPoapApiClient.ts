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
  from_admin: boolean;
  virtual_event: false;
  event_template_id: number,
  event_host_id: number;
  private_event: boolean;
}

export class GitPoapApiClient {
  getEvent = async (eventId: string) => {

    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   mode: "no-cors"
    // } as RequestInit;

    const getEventUrl = new URLBuilder("https://api.poap.xyz/events/id/")
      .appendPath(eventId.toString())
      .build();

    const data = await fetch(getEventUrl.toString())
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    }).catch((e) => {
      throw e;
    });

    return data
  }
}
