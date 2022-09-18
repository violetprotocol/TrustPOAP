import { NextPage } from "next";

import { ReviewForm } from "../../components/reviewForm/form";
import { FormChecks } from "../../components/reviewForm/formChecks";

const Form: NextPage = () => {
  return (
    <div className="min-h-screen pt-5">
      <div className="hero-content text-center mx-auto">
        <div className="max-w-lg">
          <article className="prose mb-5">
            <h1>Submit a review for this event</h1>
          </article>

          <FormChecks />
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

export default Form;
