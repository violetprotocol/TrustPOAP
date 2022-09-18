import { useContext } from "react";
import ReactLoading from "react-loading";

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

export const FormChecks = () => {
  const ctx = useContext(UserTokensContext);
  const { hasHBT, userPOAP, isLoading } = ctx;
  const hasPOAP = userPOAP?.tokenId !== undefined;

  if (isLoading)
    return (
      <div className="w-full mt-9">
        <ReactLoading
          type="bubbles"
          color="#e3598c"
          height="90px"
          width="90px"
          className="mx-auto"
        />
      </div>
    );

  return (
    <>
      {!hasHBT && <EnrollHBT />}
      {hasHBT && (
        <p className="break-words text-lg rounded-xl px-5 py-3 font-mono text-success font-bold">
          ✔️ You hold a Humanbound Token
        </p>
      )}
      {!hasPOAP && <YouWereNotThere />}
      {hasPOAP && (
        <p className="break-words text-lg rounded-xl px-5 font-mono text-success font-bold">
          ✔️ You attended this event
        </p>
      )}
    </>
  );
};
