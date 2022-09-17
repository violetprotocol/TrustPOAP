export const LabeledInput = ({ children, text }) => {
  return (
    <div className="form-control w-full max-w-xs my-3">
      <label className="label">
        <span className="label-text text-lg">{text}</span>
      </label>
      {children}
    </div>
  );
};
