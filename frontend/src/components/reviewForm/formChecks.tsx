import { FC } from "react";

interface FormChecksProps {
  userHasHbt?: boolean;
  userHasPoap?: boolean;
}
export const FormChecks: FC<FormChecksProps> = ({
  userHasHbt,
  userHasPoap,
}) => {
  return (
    <div>
      <div>
        {userHasHbt ? (
          <div className="flex justify start">
            <p className="text-3xl"> ✅ </p>
            <p className="pl-3 pt-1"> You hold a Humanbound Token </p>
          </div>
        ) : (
          <div className="flex justify start">
            <p className="text-3xl">❌ </p>
            <p className="pl-3 pt-1"> You dont hold a HumanBound Token</p>
          </div>
        )}
      </div>
      <div>
        {userHasPoap ? (
          <div className="flex justify start">
            <p className="text-3xl"> ✅ </p>
            <p className="pl-3 pt-1">You hold a POAP from this event</p>
          </div>
        ) : (
          <div className="flex justify start">
            <p className="text-3xl"> ❌ </p>
            <p className="pl-3 pt-1"> You dont hold a POAP from this event</p>
          </div>
        )}
      </div>
    </div>
  );
};
