import Image from "next/image";
import { RatingStars } from "../ratingStars";

type EventCardProps = {
  name: string;
  description: string;
  location: string;
  startDate: string;
  imageUrl: string;
  link?: string;
  numberOfReviews?: number;
};

export const EventCard = ({
  name,
  imageUrl,
  description,
  location,
  startDate,
  link,
  numberOfReviews = 0,
}: EventCardProps) => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={imageUrl}
            className="max-w-sm rounded-full"
            alt="event image"
            width="300px"
            height="300px"
          />
          <div className="ml-6">
            <h1 className="text-5xl font-bold mb-4">{name}</h1>
            <RatingStars rating={2} />
            <p className="text-center">{numberOfReviews} reviews</p>
          </div>
        </div>
        <div className="row-start-2 container max-w-xl p-4 self-start text-center lg:text-left">
          <h3 className="text-xl mb-4 font-bold">
            {startDate} • {location == "virtual" ? `🌐` : `📍`}
            {location}
          </h3>
          {!!link && (
            <h3 className="text-xl mb-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link link-secondary mb-4"
              >
                {link}
              </a>
            </h3>
          )}
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </>
  );
};

export default EventCard;
