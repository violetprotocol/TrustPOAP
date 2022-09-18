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
  rating: number;
};

export const EventCard = ({
  name,
  imageUrl,
  description,
  location,
  startDate,
  link,
  numberOfReviews = 0,
  rating = 0,
}: EventCardProps) => {
  return (
    <div className="hero lg:place-items-start">
      <div className="mx-auto">
        <div className="hero-content flex-col lg:flex-row lg:justify-start">
          <Image
            src={imageUrl}
            className="max-w-sm rounded-full"
            alt="event image"
            width="300px"
            height="300px"
          />
          <div className="ml-6 text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-4">{name}</h1>
            <div className="lg:flex">
              <div className="flex flex-col items-center lg:flex-row">
                <RatingStars rating={rating} />
                <p className="mt-3 lg:mt-1 lg:ml-3">
                  {numberOfReviews} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-2 px-2 mb-8 container max-w-6xl lg:mb-0 lg:max-w-6xl lg:px-10 lg:py-4 lg:pb-8 self-start text-center lg:text-left">
          <h3 className="text-xl mb-4 font-bold">
            {startDate} • {location == "virtual" ? `🌐 ` : `📍 `}
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
    </div>
  );
};

export default EventCard;
