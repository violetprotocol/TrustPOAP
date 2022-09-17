import EventCard from "../components/EventCard/eventCard";
import LeaveReviewCard from "../components/leaveReviewCard";
import ReviewCard from "../components/reviewCard";

export const EventPage = () => {
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
