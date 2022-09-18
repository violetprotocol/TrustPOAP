import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserTokensContext } from "../context/userTokens";

export const Home = () => {
  const ctx = useContext(UserTokensContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventToSearch, setEventToSearch] = useState<string>("");

  const handleEventSubmit = () => {
    router.push(`/event/${eventToSearch}`);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <img
            className="rounded-full mx-auto pb-10"
            src="/TrustPOAP-logo-v2.svg"
            alt=""
          />
          <h1 className="text-5xl font-bold">Verified POAP Reviews</h1>
          <h3 className="py-8 text-lg">Trusted reviews from POAP recipients</h3>
          <div className="pt-5">
            <input
              type="text"
              placeholder="Enter a POAP event Id"
              className="input w-full max-w-xs"
              onChange={(input) => {
                setEventToSearch(input.target.value);
              }}
            />
          </div>
          <div className="pt-5">
            {isLoading ? (
              <button className="btn loading">loading</button>
            ) : (
              <button
                className="btn gap-2 hover:btn-secondary"
                onClick={() => {
                  setIsLoading(true);
                  handleEventSubmit();
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  stroke="currentColor"
                  height="10px"
                  width="10px"
                >
                  <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                </svg>
                Search
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
