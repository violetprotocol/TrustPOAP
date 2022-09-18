import { NextPage } from "next";
import { ReviewForm } from "../../components/reviewForm/form";

const Form: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <div className="max-w-lg">
            <article className="prose mb-5">
              <h1>Submit a review for this event</h1>
            </article>

            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
