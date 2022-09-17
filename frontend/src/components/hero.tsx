import { useAccount } from "wagmi";

export const Hero = () => {
const { address } = useAccount();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Review Web3 Events</h1>
          <p className="py-8 text-lg">
            {"Humanbound Token + POAP => 1 Review allowed"}
          </p>
          <button className="btn mt-5 btn-lg"
          disabled={!address}
          >Search Reviews</button>
        </div>
      </div>
    </div>
  );
};
