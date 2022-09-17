import { NextPage } from "next";
import { ReviewForm } from "../components/reviewForm/form";

const Form: NextPage = () => {
  return (
    <div className="min-h-screen text-center bg-base-200">
      <div className="p-9 max-w-lg">
        <article className="prose mb-5">
          <h1>Form Test</h1>
        </article>

        <ReviewForm />
      </div>
    </div>
  );
};

export default Form;
