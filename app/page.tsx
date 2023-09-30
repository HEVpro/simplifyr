"use client";
import { useState } from "react";
import clsx from "clsx";
import Decision from "../components/Decision";

interface OptionsProps {
  label: string;
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
      label: "",
      pros: Array(3).fill({ description: "", punt: "" }),
      cons: Array(3).fill({ description: "", punt: "" }),
    });
  }
  return initialOptions;
};

export default function Home() {
  const initialOptions = initialOptionsNumber(3);
  const [currentStep, setCurrentSte] = useState(1);
  const [currentOption, setCurrentOption] = useState("");
  const [options, setOptions] = useState<OptionsProps[]>([]);

  const handleAddOption = (e: any) => {
    if (e.key === "Enter") {
      addOption();
      // TODO: ADD ERROR MESSAGE MAX 3 OPTIONS
    }
  };
  function addOption() {
    if (options.length < 3) {
      setOptions((prev) => [
        ...prev,
        { label: currentOption, pros: [], cons: [] },
      ]);
      setCurrentOption("");
    }
  }

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
      <Decision currentStep={currentStep} setCurrentSte={setCurrentSte} />
      {currentStep > 1 && (
        <div className="max-w-2xl mx-auto mt-8">
          <label htmlFor="decision" className="text-4xl">
            ¿Qué opciones tienes?
          </label>
          <div className={clsx("flex items-center justify-between border-b-2  mb-1",
          options.length == 3 ? "border-gray-600" : "border-white")}>
            {/* TODO: ADD STYLE WHEN DISABLED */}
            <input
              disabled={options.length >= 3}
              type="text"
              id="decision"
              name="decision"
              placeholder={options.length == 3 ? "Máximo 3 opciones" : "Por ejemplo...Renault megane"}
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              onKeyDown={(e) => handleAddOption(e)}
              className={clsx(
                "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white"
              )}
            />
            {/* <svg
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
            </svg> */}
            <button onClick={() => addOption()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(
                  "icon icon-tabler icon-tabler-circle-plus ",
                  options.length == 3 ? "stroke-gray-600 cursor-default":"stroke-white"
                )}
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-y-2">
            {options.map((option, idx) => {
              return (
                <div className="w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between px-2">
                  <span>{option.label}</span>
                  <button
                    onClick={() => {
                      setOptions((prev) => {
                        const newOptions = [...prev];
                        newOptions.splice(idx, 1);
                        return newOptions;
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={clsx(
                        "icon icon-tabler icon-tabler-circle-plus stroke-red-500 w-7 h-7 fill-gray-700"
                      )}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M9 12l6 0" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
