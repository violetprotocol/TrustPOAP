import { useRouter } from "next/router";
import { useContext } from "react";
import { UserTokensContext } from "../context/userTokens";

export const Hero = () => {
  const ctx = useContext(UserTokensContext);
  const router = useRouter();

  const routeToSearch = () => {
    router.push("/search");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Review Web3 Events</h1>
          <p className="py-8 text-lg">
            {"Humanbound Token + POAP => 1 Review per Human"}
          </p>
          <button
            className="btn mt-5 btn-lg"
            disabled={!ctx?.address}
            onClick={routeToSearch}
          >
            Search Reviews
          </button>
          <p>{JSON.stringify(ctx)}</p>
        </div>
      </div>
    </div>
  );
};
