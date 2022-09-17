import Link from "next/link";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { useContext, useEffect, useMemo, useState } from "react";
import EventCard from "../../components/EventCard/eventCard";
import LeaveReviewCard from "../../components/leaveReviewCard";
import ReviewCard from "../../components/reviewCard";
import { UserTokensContext } from "../../context/userTokens";
import { GitPoapApiClient } from "../../services/gitPoapApiClient";

export const EventPage = () => {
  const [isLoading, setisLoading] = useState(true);
  const ctx = useContext(UserTokensContext);
  const router = useRouter();
  const apiClient = useMemo(() => new GitPoapApiClient(), []);
  const { eventId } = router.query;

  useEffect(() => {
    const fetchEventDetails = async (eventId) => {
      try {
        const result = await apiClient.getEvent(eventId);
        setisLoading(false);
        ctx.setEvent(result);
      } catch (e) {
        console.log(e);
      }
    };

    if (!ctx.event) {
      fetchEventDetails(eventId);
    }
  }, [eventId, ctx.event, ctx, apiClient]);

  if (isLoading) {
    <ReactLoading type="bubbles" color="#fff" />;
  } else if (ctx?.event) {
    return (
      <div>
        <EventCard
          name={ctx.event.name}
          link={ctx.event.event_url}
          description={ctx.event.description}
          startDate={ctx.event.start_date}
          location={ctx.event.virtual_event ? "virtual" : ctx.event.city}
          imageUrl={ctx.event.image_url}
          rating={0}
        />
        <div>
          <div className="max-w-2xl mx-auto">
            <LeaveReviewCard />
            <div className="flex my-7">
              <a className="pl-8"> Sort By: </a>
              <a className="font-bold pl-1"> Review Date </a>
            </div>
            <ReviewCard />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="text-2xl py-6">
              {`Oh no! You took a wrong a turn... We couldn't find this event.`}
            </p>
            <Link className="btn btn-primary" href="/">
              Take me back to the homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default EventPage;
