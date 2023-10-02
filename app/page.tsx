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
    const [selectedOption, setSelectedOption] = useState(0);
    const [showSection, setShowSection] = useState(1);
    const [currentReason, setCurrentReason] = useState<ReasonProps>({description: "", punt: ""});

    const handleAddOption = (e: any) => {
        if (e.key === "Enter") {
            addOption();
        }
    };

    const addOption = () => {
        if (options.length < 3) {
            setOptions((prev) => [
                ...prev,
                {label: currentOption, pros: [], cons: []},
            ]);
            setCurrentOption("");
        } else if (options.length === 3 && currentOption.length === 0) {
            setCurrentOption("");
            setCurrentStep(3);
        } else {
            showMessageError();
            setCurrentOption("");
            setCurrentStep(3);
        }
    }

    const showMessageError = () => {
        setErrorMessage(true)
        setCurrentOption("")
        setTimeout(() => setErrorMessage(false), 3000)
    }

    const handleTabInput = (e: any, type:"pros" | "cons") => {
        if (e.key === "Enter") {
            addReason(type)
        }
    };

    const handleChangeReasons = (e: any) => {

        const {value, name} = e.target
        setCurrentReason((prevReason) => ({
            ...prevReason,
            [name]: value,
        }))
    }

    const addReason = (type: "pros" | "cons") => {
        if (options[selectedOption][type].length < 10 && (type === "pros" || type === "cons")) {
            if (Object.values(currentReason).every((value) => value !== "")) {
                setOptions((prevOptions) => {
                    const newOptions = [...prevOptions];
                    const optionSelected = newOptions[selectedOption];
                    optionSelected[type].push(currentReason);
                    newOptions[selectedOption] = optionSelected;
                    return newOptions;
                });
                setCurrentReason({description: "", punt: ""});
            } else {
                /*TODO: añadir mensaje de error y quitar console.log*/
                console.log("Faltan campos por rellenar")
            }
        } else {
            /*TODO: añadir mensaje de error y quitar console.log*/
            console.log(`Has alcanzado el numero maximo de ${type}`)
        }
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
                    <div
                        className={clsx("flex items-center justify-between border-b-2  mb-1 transition-colors duration-300",
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
                            onKeyDown={(e) => handleAddOption(e)}
                            className={clsx(
                                "w-2/3 py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white",
                                errorMessage ? "text-red-600" : ""
                            )}
                        />
                        <button onClick={() => addOption()}>
                            {options.length === 3 && currentStep === 2 ? (
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
                                        options.length == 3 ? "stroke-gray-600 cursor-default" : "stroke-white",
                                        errorMessage ? "stroke-red-500" : ""
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
                                        currentStep > 2 && selectedOption == idx ? " border-2 " : "")}
                                    onClick={() => setSelectedOption(idx)}>
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
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                            <path d="M9 12l6 0"/>
                                        </svg>
                                    </button>

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
                            className={clsx("py-1 px-4 rounded-lg hover:scale-110 hover:border-2 transition", showSection === 1 ? "border-2 rounded-lg bg-white text-black scale-110 " : "")}
                            onClick={() => {
                                setShowSection(1);
                            }}
                        >
                            Pros
                        </button>
                        <button
                            className={clsx("py-1 px-4 rounded-lg hover:scale-110 hover:border-2 transition", showSection === 2 ? "border-2 rounded-lg bg-white text-black scale-110 " : "")}
                            onClick={() => {
                                setShowSection(2)
                            }}
                        >
                            Cons
                        </button>
                    </div>
                    <div className="mt-2">
                        {showSection === 1 && (
                            <div className={"flex flex-col gap-3"}>
                                <div className={"flex flex-row gap-3"}>
                                    <div className="w-4/6 border-b-2 border-white mb-1">
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Por ejemplo...Es económico"
                                            value={currentReason?.description}
                                            onChange={(e) => handleChangeReasons(e)}
                                            onKeyDown={(e) => handleTabInput(e, "pros")}
                                            className={clsx(
                                                "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white"
                                            )}
                                        />
                                    </div>
                                    <div className="w-2/6 border-b-2 border-white flex flex-row mb-1">
                                        <select id="punt"
                                                name="punt"
                                                value={currentReason?.punt}
                                                onChange={(e) => handleChangeReasons(e)}
                                                className={clsx(
                                                    "w-full py-4 border-0 bg-transparent text-2xl placeholder:pl-2 focus:outline-none focus:border-none ",
                                                    currentReason.punt === "" ? "text-gray-400" : "text-white")}>
                                            <option value="" disabled={true} hidden>Del 1 al 9</option>
                                            {new Array(10).fill(1,1,10).map((item, idx) => {
                                                return (
                                                    <option value={idx}
                                                            className={clsx("bg-black disabled:text-gray-600 checked:bg-gray-700")}>
                                                        {idx}
                                                    </option>
                                                );
                                            })}
                                        </select>
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
                                    {options[selectedOption]?.pros.map((pro, i) => {
                                        return (
                                            <div
                                                className={"w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between gap-2 px-2"}>
                                                <div className={"w-5/6"}>
                                                    <span>{pro.description}</span>
                                                </div>
                                                <div className={"w-1/6"}>
                                                    <span>{pro.punt}</span>
                                                </div>
                                                <button
                                                    className={"w-8"}
                                                    onClick={() => {
                                                        setOptions((prevOptions) => {
                                                            const newOptions = [...prevOptions];
                                                            const optionSelected = newOptions[selectedOption];
                                                            optionSelected.pros.splice(i, 1);
                                                            newOptions[selectedOption] = optionSelected;
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
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                                        <path d="M9 12l6 0"/>
                                                    </svg>
                                                </button>

                                            </div>

                                        )
                                    })}
                                </div>
                            </div>

                        )}
                        {showSection === 2 && (
                            <div className={"flex flex-col gap-3"}>
                                <div className={"flex flex-row gap-3"}>
                                    <div className="w-4/6 border-b-2 border-white mb-1">
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Por ejemplo...Es caro"
                                            value={currentReason?.description}
                                            onChange={(e) => handleChangeReasons(e)}
                                            onKeyDown={(e) => handleTabInput(e, "cons")}
                                            className={clsx(
                                                "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none text-white"
                                            )}
                                        />
                                    </div>
                                    <div className="w-2/6 border-b-2 border-white flex flex-row mb-1">
                                        <select id="punt"
                                                name="punt"
                                                value={currentReason?.punt}
                                                onChange={(e) => handleChangeReasons(e)}
                                                className={clsx(
                                                    "w-full py-4 border-0 bg-transparent text-2xl placeholder:pl-2 focus:outline-none focus:border-none ",
                                                    currentReason.punt === "" ? "text-gray-400" : "text-white")}>
                                            <option value="" disabled={true} hidden>Del 1 al 9</option>
                                            {new Array(10).fill(1, 1, 10).map((item, idx) => {
                                                return (
                                                    <option value={idx}
                                                            className={clsx("bg-black disabled:text-gray-600 checked:bg-gray-700")}>
                                                        {idx}
                                                    </option>
                                                );
                                            })}
                                        </select>
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
                                    {options[selectedOption]?.cons.map((cons, i) => {
                                        return (
                                            <div
                                                className={"w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between gap-2 px-2"}>
                                                <div className={"w-5/6"}>
                                                    <span>{cons.description}</span>
                                                </div>
                                                <div className={"w-1/6"}>
                                                    <span>{cons.punt}</span>
                                                </div>
                                                <button
                                                    className={"w-8"}
                                                    onClick={() => {
                                                        setOptions((prevOptions) => {
                                                            const newOptions = [...prevOptions];
                                                            const optionSelected = newOptions[selectedOption];
                                                            optionSelected.cons.splice(i, 1);
                                                            newOptions[selectedOption] = optionSelected;
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
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                                        <path d="M9 12l6 0"/>
                                                    </svg>
                                                </button>
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
