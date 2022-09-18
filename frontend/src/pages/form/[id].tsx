import { NextPage } from "next";
import { useContext } from "react";
import { ReviewForm } from "../../components/reviewForm/form";
import { UserTokensContext } from "../../context/userTokens";

const ErrorCard = ({ children }) => {
  return (
    <div className="rounded-lg my-5 p-5 alert-error shadow-lg flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {children}
    </div>
  );
};

const EnrollHBT = () => {
  return (
    <ErrorCard>
      <p className="text-lg">
        Holding a Humanbound token is a proof of your unique humanhood and
        ensures that you review this event only once. To submit a review, please
        visit{" "}
        <a
          href="http://humanbound.xyz"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          humanbound.xyz
        </a>{" "}
        to get your Humanbound token.
      </p>
    </ErrorCard>
  );
};

const YouWereNotThere = () => {
  return (
    <ErrorCard>
      <p className="text-lg">
        Since you were not present at this event, you cannot review it.
      </p>
    </ErrorCard>
  );
};

const Form: NextPage = () => {
  const ctx = useContext(UserTokensContext);
  const { hasHBT, userPOAP } = ctx;
  const hasPOAP = userPOAP?.tokenId !== undefined;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <div className="max-w-lg">
            <article className="prose mb-5">
              <h1>Submit a review for this event</h1>
            </article>

            {!hasHBT && <EnrollHBT />}
            {hasHBT && (
              <p className="break-words rounded-xl px-5 py-3 text-sm font-mono text-green-400">
                You hold a Humanbound Token ✔️
              </p>
            )}
            {!hasPOAP && <YouWereNotThere />}
            {hasPOAP && (
              <p className="break-words rounded-xl px-5 text-sm font-mono text-green-400">
                You attended this event ✔️
              </p>
            )}
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
