"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/input";
import clsx from "clsx";

interface OptionsProps {
  option: string;
  pros: { description: string; punt: string }[];
  cons: { description: string; punt: string }[];
}

interface formDataProps {
  decision: string;
  options: OptionsProps[];
}

const initialOptionsNumber = (count: number): OptionsProps[] => {
  const initialOptions: OptionsProps[] = [];
  for (let i = 0; i < count; i++) {
    initialOptions.push({
      option: "",
      pros: Array(3).fill({ description: "", punt: "" }),
      cons: Array(3).fill({ description: "", punt: "" }),
    });
  }
  return initialOptions;
};

export default function Home() {
  const initialOptions = initialOptionsNumber(3);
  const [currentStep, setCurrentSte] = useState<number>(1);
  const [decision, setDecision] = useState<string>("");
  const [options, setOptions] = useState<OptionsProps[]>(initialOptions);

  const handleAddOption = (e: any) => {
    if (e.key === "Enter") {
      setCurrentSte(2);
    }
  };
  return (
    <div className={"max-w-4xl mx-auto py-24"}>
      <div className="max-w-lg mx-auto mb-8 flex items-center justify-between">
        {new Array(4).fill(0).map((item, idx) => {
          return (
            <button
             onClick={() => setCurrentSte(idx + 1)}
              key={idx}
              className={clsx(
                "w-10 h-10 py-1.5 rounded-full border-2 text-center",
                idx + 1 <= currentStep
                  ? "border-white text-white"
                  : "border-gray-700 text-gray-700"
              )}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

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
            onChange={(e) => setDecision(e.target.value)}
            onKeyDown={(e) => handleAddOption(e)}
            className={clsx("py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none",
                currentStep > 1 ? "text-green-300" : "text-white"
            )}
          />
          <button onClick={() => setCurrentSte(2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(
                "icon icon-tabler icon-tabler-circle-check hover:scale-110 transition ",
                currentStep > 1 ? "stroke-green-300" : "stroke-white"
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
    </div>
  );
}
