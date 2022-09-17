import { URLBuilder } from "./urlBuilder";

export type gitPoapEvent = {
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
  getEvent = async (eventId: number) => {

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as RequestCredentials,
    };

    const getEventUrl = new URLBuilder("https://api.poap.xyz/events/id/")
      .appendPath(eventId.toString())
      .build();

    const response = await fetch(getEventUrl.toString(), requestOptions);

    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data: gitPoapEvent = await response.json();
    return data as gitPoapEvent;
  }
}
