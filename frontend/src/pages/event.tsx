import { useContext, useEffect } from "react";
import EventCard from "../components/EventCard/eventCard";
import LeaveReviewCard from "../components/leaveReviewCard";
import ReviewCard from "../components/reviewCard";
import { useHasPoapFromEvent } from "../context/useGetUserPoapFromEvent";
import { UserTokensContext } from "../context/userTokens";

export const EventPage = () => {
  const ctx = useContext(UserTokensContext);
  // const userPoap = useHasPoapFromEvent(ctx.event.id, ctx.address);
  
  if (ctx.event) {
  return (
    <div>
      <EventCard
        name={ctx.event.name}
        link={ctx.event.event_url}
        description={ctx.event.description}
        startDate={ctx.event.start_date}
        location={ctx.event.virtual_event ? "virtual" : ctx.event.city }
        imageUrl={ctx.event.image_url}
      />
      <LeaveReviewCard />
      <ReviewCard />
    </div>
  );
  }

  return (
    <div>
      <EventCard
        name="ETHBerlin"
        link="https://ethberlin.ooo"
        description="ETHBerlin3 is a hackathon, a cultural festival, an educational event, a
        platform for hacktivism, and a community initiative to push the
        decentralized ecosystem forward."
        startDate="Sept. 16 2022"
        location="Berlin"
        imageUrl="https://poap9.imgix.net/walletconnect-eth-berlin-2022-2022-logo-1661801790740.png"
      />
      <LeaveReviewCard />
      <ReviewCard />
    </div>
  );
};

export default EventPage;
