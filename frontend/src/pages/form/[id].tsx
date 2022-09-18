import { NextPage } from "next";
import { useContext } from "react";
import { ReviewForm } from "../../components/reviewForm/form";
import { FormChecks } from "../../components/reviewForm/formChecks";
import { UserTokensContext } from "../../context/userTokens";

const EnrollHBT = () => {
  return (
    <div className="bg-base-300 rounded my-5 p-5">
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
    </div>
  );
};

const YouWereNotThere = () => {
  return (
    <div className="bg-base-300 rounded my-5 p-5">
      <p className="text-lg">
        Since you were not present at this event, you cannot review it.
      </p>
    </div>
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

            <FormChecks userHasHbt={hasHBT} userHasPoap={hasPOAP} />
            {hasHBT && <EnrollHBT />}
            {!hasPOAP && <YouWereNotThere />}
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
