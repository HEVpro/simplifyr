import clsx from "clsx";
import {CircleArrowRight, CircleCheck, CircleMinus, CirclePlus} from "@/components/Icons";
import {Message} from "@/components/Message";
import {useState} from "react";
import {StepChildrenProps} from "@/components/Decision";

interface ReasonProps {
    description: string,
    punt: string
}

interface OptionsProps {
    label: string;
    pros: { description: string; punt: string }[];
    cons: { description: string; punt: string }[];
}

interface ProsAndConsProps extends StepChildrenProps {
    showMessage: boolean;
    options: OptionsProps[];
    setOptions: (value: any) => void;
    currentOption: string;
    selectedOption: number;
    showMessageError: (value: number) => void;
    indexMessage: number;
}


export const Options = ({currentStep, setCurrentStep}: StepChildrenProps) => {
    const [options, setOptions] = useState<OptionsProps[]>([]);
    const [currentOption, setCurrentOption] = useState("");
    const [selectedOption, setSelectedOption] = useState(0);
    const [showMessage, setShowMessage] = useState(false)
    const [indexMessage, setIndexMessage] = useState(0)

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
        } else {
            showMessageError(1);
            setCurrentOption("");
        }
    }

    const showMessageError = (index: number) => {
        setShowMessage(true)
        setIndexMessage(index)
        setCurrentOption("")
        setTimeout(() => setShowMessage(false), 3000)

    }


    return (
        <>
            <div className="max-w-2xl mx-auto mt-8">
                <label htmlFor="option" className="text-4xl">
                    ¿Qué opciones tienes?
                </label>
                <div
                    className={clsx("flex items-center justify-between border-b-2  mb-1 transition-colors duration-300",
                        options.length == 3 ? "border-gray-600" : "border-white",
                        showMessage && indexMessage === 1 ? "border-b-red-500" : "")}>
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
                            showMessage ? "text-red-600" : ""
                        )}
                    />
                    <button onClick={() => addOption()}>
                        {currentStep > 2 ? (
                            <CircleCheck className={"stroke-green-300"}/>
                        ) : (
                            <CirclePlus
                                className={clsx(
                                    "icon icon-tabler icon-tabler-circle-plus transition-colors duration-300",
                                    options.length == 3 ? "stroke-gray-600 cursor-default" : "stroke-white",
                                    showMessage ? "stroke-red-500" : "")}
                            />
                        )}
                    </button>
                </div>
                {showMessage && indexMessage === 1 && (
                    <Message
                        message={"Has alcanzado el límite de opciones, si quieres añadir otra, debes eliminar una primero"}
                        className="text-red-500"/>
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
                                    disabled={currentStep > 2}
                                    onClick={() => {
                                        setOptions((prev) => {
                                            const newOptions = [...prev];
                                            newOptions.splice(idx, 1);
                                            return newOptions;
                                        });
                                    }}
                                >
                                    <CircleMinus className={clsx("stroke-red-500 w-7 h-7 fill-gray-700")}/>
                                </button>

                            </div>

                        );
                    })}
                </div>
                {options.length >= 2 && (
                    <div className={"flex justify-between items-center mt-4"}>
                        <Message
                            message={"Si tienes entre dos o tres opciones, pulsa la flecha para ir al siguiente paso"}/>
                        <button onClick={() => setCurrentStep(3)}>
                            <CircleArrowRight className={"w-8 h-8 stroke-white"}/>
                        </button>

                    </div>
                )}
            </div>
            {currentStep > 2 && <ProsAndCons currentOption={currentOption} options={options} setOptions={setOptions}
                                             currentStep={currentStep} setCurrentStep={setCurrentStep}
                                             indexMessage={indexMessage} showMessageError={showMessageError}
                                             showMessage={showMessage} selectedOption={selectedOption}/>}
        </>
    )
}


const ProsAndCons = ({
                         currentStep,
                         setCurrentStep,
                         showMessage,
                         currentOption,
                         setOptions,
                         options,
                         selectedOption,
                         showMessageError,
                         indexMessage
                     }: ProsAndConsProps) => {
    const [showSection, setShowSection] = useState(1);
    const [currentReason, setCurrentReason] = useState<ReasonProps>({description: "", punt: ""});


    const handleChangeReasons = (e: any) => {

        const {value, name} = e.target
        setCurrentReason((prevReason) => ({
            ...prevReason,
            [name]: value,
        }))
    }

    const addReason = (type: "pros" | "cons") => {
        if (options[selectedOption][type].length < 2 && (type === "pros" || type === "cons")) {
            if (Object.values(currentReason).every((value) => value !== "")) {
                setOptions((prevOptions: any) => {
                    const newOptions = [...prevOptions];
                    const optionSelected = newOptions[selectedOption];
                    optionSelected[type].push(currentReason);
                    newOptions[selectedOption] = optionSelected;
                    return newOptions;
                });
                setCurrentReason({description: "", punt: ""});
            } else {
                showMessageError(2);
            }
        } else {
            type === "pros" ? showMessageError(3) : showMessageError(4);
        }
    };
    const handleTabInput = (e: any, type: "pros" | "cons") => {
        if (e.key === "Enter") {
            addReason(type)
        }
    };


    return (
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
                            <div className={clsx("w-4/6 border-b-2 border-white mb-1",
                                showMessage && indexMessage >= 2 ? "border-b-red-500" : "")}>
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
                            <div className={clsx("w-2/6 border-b-2  flex flex-row mb-1",
                                showMessage && indexMessage >= 2 ? "border-b-red-500" : "border-white")}>
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
                                <button onClick={() => addReason("pros")}>
                                    <CirclePlus className={clsx("stroke-white")}/>
                                </button>
                            </div>
                        </div>
                        {showMessage && indexMessage === 2 && (
                            <Message message={"Debes rellenar los campos"} className={"text-red-500"}/>
                        )}
                        {showMessage && indexMessage === 3 && (
                            <Message message={"Has alcanzado el límite de pros"} className={"text-red-500"}/>
                        )}
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
                                                setOptions((prevOptions: any) => {
                                                    const newOptions = [...prevOptions];
                                                    const optionSelected = newOptions[selectedOption];
                                                    optionSelected.pros.splice(i, 1);
                                                    newOptions[selectedOption] = optionSelected;
                                                    return newOptions;
                                                });
                                            }}
                                        >
                                            <CircleMinus
                                                className={clsx("stroke-red-500 w-7 h-7 fill-gray-700")}/>
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
                            <div className={clsx("w-4/6 border-b-2 mb-1",
                                showMessage && indexMessage >= 2 ? "border-b-red-500" : "border-white")}>
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
                            <div className={clsx("w-2/6 border-b-2 flex flex-row mb-1",
                                showMessage && indexMessage >= 2 ? "border-b-red-500" : "border-white")}>
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
                                    <CirclePlus className={clsx("stroke-white")}/>
                                </button>
                            </div>
                        </div>
                        {showMessage && indexMessage === 2 && (
                            <Message message={"Debes rellenar los campos"} className={"text-red-500"}/>
                        )}

                        {showMessage && indexMessage === 4 && (
                            <Message message={"Has alcanzado el límite de contras"}
                                     className={"text-red-500"}/>)}
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
                                                setOptions((prevOptions: any) => {
                                                    const newOptions = [...prevOptions];
                                                    const optionSelected = newOptions[selectedOption];
                                                    optionSelected.cons.splice(i, 1);
                                                    newOptions[selectedOption] = optionSelected;
                                                    return newOptions;
                                                });
                                            }}
                                        >
                                            <CircleMinus
                                                className={clsx("stroke-red-500 w-7 h-7 fill-gray-700")}/>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

            </div>
        </div>

    )
}
