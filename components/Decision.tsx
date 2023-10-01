import clsx from "clsx";
import { useState } from "react";

type DecisionProps = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};
const Decision = ({ currentStep, setCurrentStep }: DecisionProps) => {
  const [decision, setDecision] = useState("");

  const handleDecision = (e: any) => {
    if (e.key === "Enter") {
      setCurrentStep(2);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <label htmlFor="decision" className="text-4xl">
        ¿Qué decisión quieres tomar?
      </label>
      <div className="flex items-center justify-between border-b-2 border-white mb-1">
        <input
          disabled={currentStep > 1}
          type="text"
          id="decision"
          name="decision"
          placeholder="Por ejemplo...Comprar un coche"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          onKeyDown={(e) => handleDecision(e)}
          className={clsx(
            "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none",
            currentStep > 1 ? "text-green-300" : "text-white"
          )}
        />
        <button onClick={() => setCurrentStep(2)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "icon icon-tabler icon-tabler-circle-check  transition ",
              currentStep > 1 ? "stroke-green-300 cursor-default " : "hover:scale-110 stroke-white"
            )}
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
        </button>
      </div>
      <span className="italic text-sm">
        Cuando termines y quieras pasar al siguiente paso, pulsa el check o
        presiona 'Enter'
      </span>
    </div>
  );
};
export default Decision;
