"use client";
import {ChangeEvent, useEffect, useState} from "react";
import clsx from "clsx";
import Decision from "../components/Decision";


interface ReasonProps {
    description: string,
    punt: string
}

interface OptionsProps {
    label: string;
    pros: { description: string; punt: string }[];
    cons: { description: string; punt: string }[];
}

interface formDataProps {
    decision: string;
    options: OptionsProps[];
}


export default function Home() {

  const [currentStep, setCurrentStep] = useState(1);
  const [currentOption, setCurrentOption] = useState("");
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [errorMessage, setErrorMessage] = useState(false)
    const [editingIndex, setEditingIndex] = useState(-1);
    const [selectedOption, setSelectedOption] = useState<OptionsProps>();
    const [showPros, setShowPros] = useState(false);
    const [Pros, setPros] = useState<ReasonProps[]>([]);
    const [showCons, setShowCons] = useState(false);
    const [Cons, setCons] = useState<ReasonProps[]>([]);
    const [currentReason, setCurrentReason] = useState<ReasonProps>({description: "", punt: ""});  
    
  const handleAddOption = (e: any) => {
    if (e.key === "Enter") {
      addOption();
      // TODO: ADD ERROR MESSAGE MAX 3 OPTIONS
      if (options.length == 3) {
        showMessageError()
      }
    }
  };
  function addOption() {
    if (options.length < 3) {
      setOptions((prev) => [
        ...prev,
        { label: currentOption, pros: [], cons: [] },
      ]);
      setCurrentOption("");
    } else {
        showMessageError()
    }
  }
  const showMessageError = ()=> {
    setErrorMessage(true)
    setCurrentOption("")
    setTimeout(()=> setErrorMessage(false), 3000)
  }


    const handleOption = (e: any) => {
        if (e.key === "Enter") {
            setCurrentStep(3);
        }
    };

    const handleEditOption = (e: any, idx: number) => {
        const newOptions = [...options];
        newOptions[idx].label = e.target.value;
        setOptions(newOptions);
    };

    const handleShowPros = (idx: number) => {
        setSelectedOption(options[idx]);
        setShowPros(true);
        setShowCons(false);
    };

    const handleShowCons = (idx: number) => {
        setSelectedOption(options[idx]);
        setShowPros(false);
        setShowCons(true);
    };

    const handleChangeReasons = (e: any) => {
        const {value, name} = e.target
        setCurrentReason((prevReason) => ({
            ...prevReason,
            [name]: value,
        }))
    }

    const addReason = (type: string) => {
        console.log(Object.keys(currentReason))
        if (selectedOption !== undefined) {
            if (Object.keys(currentReason).length !== 0) {
                if (type === "pros") {
                    const copyOption = {...selectedOption};
                    if (!Array.isArray(copyOption.pros)) {
                        copyOption.pros = [];
                    }
                    copyOption.pros.push(currentReason);
                    setSelectedOption(copyOption);

                }
                if (type === "cons") {
                    const copyOption = {...selectedOption};
                    if (!Array.isArray(copyOption.cons)) {
                        copyOption.cons = [];
                    }
                    copyOption.cons.push(currentReason);
                    setSelectedOption(copyOption);

                }
            } else {
                console.log("objeto vacío")
            }
        } else {
            console.log("selecciona una opción")
        }
        setCurrentReason({description: "", punt: ""});

    };


    return (
        <div className={"max-w-4xl mx-auto py-24"}>
            <div className="max-w-lg mx-auto mb-8 flex items-center justify-between">
                {new Array(4).fill(0).map((item, idx) => {
                    return (
                        <button
                            onClick={() => setCurrentStep(idx + 1)}
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
            <Decision currentStep={currentStep} setCurrentStep={setCurrentStep}/>
            {currentStep > 1 && (
                <div className="max-w-2xl mx-auto mt-8">
                    <label htmlFor="option" className="text-4xl">
                        ¿Qué opciones tienes?
                    </label>
                    <div className={clsx("flex items-center justify-between border-b-2  mb-1 transition-colors duration-300",
                        options.length == 3 ? "border-gray-600" : "border-white",
                        errorMessage ? "border-b-red-500" : "")}>
                        {/* TODO: ADD STYLE WHEN DISABLED */}
                        <input
                            disabled={currentStep > 2}
                            type="text"
                            id="option"
                            name="option"
                            placeholder="Por ejemplo...Renault megane"
                            value={currentOption}
                            onChange={(e) => setCurrentOption(e.target.value)}
                            onKeyDown={options.length == 3 ? (e) => handleOption(e) : (e) => handleAddOption(e)}
                            className={clsx(
                                "w-2/3 py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white",
                                errorMessage ? "text-red-600" : ""
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
           <button onClick={options.length == 3 ? () => setCurrentStep(3) : () => addOption()}>
               {options.length == 3 && currentStep == 2 ? (
                   <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="icon icon-tabler icon-tabler-circle-arrow-right stroke-white"
                       width="44"
                       height="44"
                       viewBox="0 0 24 24"
                       strokeWidth="1.5"
                       strokeLinecap="round"
                       strokeLinejoin="round">
                       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                       <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>
                       <path d="M16 12l-4 -4"></path>
                       <path d="M16 12h-8"></path>
                       <path d="M12 16l4 -4"></path>
                   </svg>
               ) : currentStep > 2 ? (
                   <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className={clsx(
                           "icon icon-tabler icon-tabler-circle-check cursor-default stroke-green-300"
                       )}
                       width="44"
                       height="44"
                       viewBox="0 0 24 24"
                       strokeWidth="1.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                   >
                       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                       <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                       <path d="M9 12l2 2l4 -4"/>
                   </svg>
               ) : (
               <svg
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(
                    "icon icon-tabler icon-tabler-circle-plus transition-colors duration-300",
                    options.length == 3 ? "stroke-gray-600 cursor-default":"stroke-white",
                    errorMessage ? "stroke-red-500" : ""
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
               )}
            </button>
          </div>
                    {errorMessage && (
                        <span className="italic text-sm text-red-500">
                  Has alcanzado el límite de opciones, si quieres añadir otra, debes eliminar una primero
              </span>
                    )}
          <div className="mt-4 flex flex-col gap-y-2">
            {options.map((option, idx) => {
              return (
                  <div
                      className={clsx("w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between px-2",
                          currentStep > 2 && "cursor-pointer",
                          currentStep > 2 && selectedOption == option ? " border-2 " : "")}
                      onClick={() => setSelectedOption(option)}>
                      {editingIndex === idx ? (
                          <input
                              type="text"
                              id={`option_${idx}`}
                              name="option"
                              value={option.label}
                              onChange={(e) => handleEditOption(e, idx)}
                              onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                      setEditingIndex(-1);
                                  }
                              }}
                              className="border-0 bg-transparent text-2xl pl-2 focus:outline-none focus:border-none text-white"
                          />
                      ) : (
                          <span>{option.label}</span>)
                      }
                      <div className={"flex gap-2"}>
                          <button
                              onClick={() => {
                                  if (editingIndex === idx) {
                                      setEditingIndex(-1);
                                  } else {
                                      setEditingIndex(idx);
                                  }
                              }}
                          >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-7 h-7 icon icon-tabler icon-tabler-edit-circle stroke-white fill-gray-700"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round">

                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                  <path
                                      d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z"></path>
                                  <path d="M16 5l3 3"></path>
                                  <path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6"></path>
                              </svg>
                          </button>
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
          </div>

              );
            })}
          </div>
                </div>
            )}

            {currentStep > 2 && (
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="flex text-3xl gap-2 justify-around">
                        <button
                            className={clsx("py-1 px-4 rounded-lg hover:scale-110 hover:border-2 transition", showPros ? "border-2 rounded-lg bg-white text-black scale-110 " : "")}
                            onClick={() => {
                                setShowPros(true);
                                setShowCons(false);
                            }}
                        >
                            Pros
                        </button>
                        <button
                            className={clsx("py-1 px-4 rounded-lg hover:scale-110 hover:border-2 transition", showCons ? "border-2 rounded-lg bg-white text-black scale-110 " : "")}
                            onClick={() => {
                                setShowPros(false);
                                setShowCons(true);
                            }}
                        >
                            Cons
                        </button>
                    </div>
                    <div className="mt-2">
                        {showPros && (
                            <div className={"flex flex-col gap-3"}>
                                <div className={"flex flex-row gap-3"}>
                                    <div className="w-4/6 border-b-2 border-white mb-1">
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Por ejemplo...Es flama"
                                            value={currentReason?.description}
                                            onChange={(e) => handleChangeReasons(e)}
                                            className={clsx(
                                                "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white"
                                            )}
                                        />
                                    </div>
                                    <div className="w-2/6 border-b-2 border-white flex flex-row mb-1">
                                        <input
                                            type="text"
                                            id="punt"
                                            name="punt"
                                            placeholder="IMPORTANTE"
                                            value={currentReason?.punt}
                                            onChange={(e) => handleChangeReasons(e)}
                                            className={clsx(
                                                " w-full py-4 border-0 bg-transparent text-2xl placeholder:pl-2 focus:outline-none focus:border-none text-white"
                                            )}
                                        />
                                        <button onClick={() => addReason("pros")}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={clsx(
                                                    "icon icon-tabler icon-tabler-circle-plus stroke-white"
                                                )}
                                                width="44"
                                                height="44"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
                                                <path d="M9 12h6"/>
                                                <path d="M12 9v6"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={"w-full flex flex-col justify-around gap-2"}>
                                    {selectedOption?.pros.map((pro, i) => {
                                        return (
                                            <div
                                                className={"w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between px-2"}>
                                                <div>
                                                    <span>{pro.description}</span>
                                                </div>
                                                <div>
                                                    <span>{pro.punt}</span>
                                                </div>

                                            </div>

                                        )
                                    })}
                                </div>
                            </div>

                        )}
                        {showCons && (
                            <div className={"flex flex-col gap-3"}>
                                <div className={"flex flex-row gap-3"}>
                                    <div className="w-4/6 border-b-2 border-white mb-1">
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Por ejemplo...Es flama"
                                            value={currentReason?.description}
                                            onChange={(e) => handleChangeReasons(e)}
                                            className={clsx(
                                                "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white"
                                            )}
                                        />
                                    </div>
                                    <div className="w-2/6 border-b-2 border-white flex flex-row mb-1">
                                        <input
                                            type="text"
                                            id="punt"
                                            name="punt"
                                            placeholder="IMPORTANTE"
                                            value={currentReason?.punt}
                                            onChange={(e) => handleChangeReasons(e)}
                                            className={clsx(
                                                " w-full py-4 border-0 bg-transparent text-2xl placeholder:pl-2 focus:outline-none focus:border-none text-white"
                                            )}
                                        />
                                        <button onClick={() => addReason("cons")}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={clsx(
                                                    "icon icon-tabler icon-tabler-circle-plus stroke-white"
                                                )}
                                                width="44"
                                                height="44"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
                                                <path d="M9 12h6"/>
                                                <path d="M12 9v6"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={"w-full flex flex-col justify-around"}>
                                    {selectedOption?.cons.map((cons, i) => {
                                        return (
                                            <div
                                                className={"w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between px-2"}>
                                                <div>
                                                    <span>{cons.description}</span>
                                                </div>
                                                <div>
                                                    <span>{cons.punt}</span>
                                                </div>

                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
        ;
}
