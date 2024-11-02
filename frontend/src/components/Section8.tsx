import React, { useId } from "react";

const Section8: React.FC = () => {
  const id = useId();

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-5">useId Hook Example</h2>
      <div className="mb-4">
        <label htmlFor={id} className="block text-lg font-medium">
          Enter your name:
        </label>
        <input
          type="text"
          id={id}
          className="input input-bordered w-full max-w-xs mt-2"
          placeholder="Your name"
        />
      </div>
    </div>
  );
};

export default Section8;
