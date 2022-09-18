import Link from "next/link";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import EventCard from "../../components/EventCard/eventCard";
import LeaveReviewCard from "../../components/leaveReviewCard";
import ReviewCard from "../../components/reviewCard";
import { UserTokensContext } from "../../context/userTokens";
import { GitPoapApiClient } from "../../services/gitPoapApiClient";
import { useReviews } from "../../context/useReviews";

export const EventPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [queriedEventId, setQueriedEventId] = useState(null);
  const ctx = useContext(UserTokensContext);
  const router = useRouter();
  const apiClient = useMemo(() => new GitPoapApiClient(), []);
  const { eventId } = router.query;
  const reviews = useReviews(parseInt(eventId?.toString()));

  const reviewCards = reviews.map((review, index) => (
    <ReviewCard
      key={index}
      reviewerId={
        ctx.userPOAP
          ? `${review.reviewer.slice(5)}...${review.reviewer.slice(-4, -1)}`
          : "anon"
      }
      reviewScore={review.rating}
      reviewTitle={review.title}
      reviewBody={review.content}
      reviewDate={review.creationTime}
      reviewRating={review.rating}
    />
  ));

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

  useEffect(() => {
    if (!queriedEventId && queriedEventId !== eventId) {
      setQueriedEventId(eventId);
    }
  }, [eventId, queriedEventId]);

  const fetchEventDetails = useCallback(
    async (eventId: string) => {
      if (!eventId) return;
      try {
        setIsLoading(true);
        const result = await apiClient.getEvent(eventId);
        setIsLoading(false);
        if (result?.id !== eventId) ctx.setEvent(result);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    },
    [apiClient, ctx]
  );

  useEffect(() => {
    if (!ctx.event) {
      fetchEventDetails(queriedEventId);
    }
  }, [fetchEventDetails, ctx.event, queriedEventId]);

  if (isLoading) {
    return (
      <div className="absolute inset-1/2">
        <ReactLoading
          type="bubbles"
          color="#e3598c"
          height="100px"
          width="100px"
        />
      </div>
    );
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
          rating={averageRating}
          numberOfReviews={reviews.length}
        />
        <div>
          <div className="max-w-2xl mx-auto">
            <LeaveReviewCard firstReview={reviews.length == 0} />
            {reviews.length > 0 && (
              <div className="flex my-7">
                <a className="pl-8"> Sort By: </a>
                <a className="font-bold pl-1"> Review Date </a>
              </div>
            )}
            {reviewCards}
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
