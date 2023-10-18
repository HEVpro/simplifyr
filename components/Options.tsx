import clsx from "clsx";
import {CircleArrowRight, CircleCheck, CircleMinus, CirclePlus} from "@/components/Icons";
import {Message} from "@/components/Message";
import {useState} from "react";
import {StepChildrenProps} from "@/components/Decision";

interface ReasonProps {
    description: string,
    punt: string;
}

interface OptionsProps {
    id: number;
    label: string;
    pros: ReasonProps[];
    cons: ReasonProps[];
    average: number
}

interface ProsAndConsProps extends StepChildrenProps {
    showMessage: boolean;
    options: OptionsProps[];
    setOptions: (value: any) => void;
    selectedOption?: OptionsProps;
    setSelectedOption: (value: any) => void;
    showMessageError: (value: number) => void;
    indexMessage: number;
}

let nextId = 0
export const Options = ({currentStep, setCurrentStep}: StepChildrenProps) => {
    const [options, setOptions] = useState<OptionsProps[]>([]);
    const [nameOption, setNameOption] = useState("");
    const [selectedOption, setSelectedOption] = useState<OptionsProps>();
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
                {id: nextId++, label: nameOption, pros: [], cons: [], average: 0},
            ]);
            setNameOption("");
        } else if (options.length === 3 && nameOption.length === 0) {
            setNameOption("");
        } else {
            showMessageError(1);
            setNameOption("");
        }
    }

    const showMessageError = (index: number) => {
        setShowMessage(true)
        setIndexMessage(index)
        setNameOption("")
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
                        value={nameOption}
                        onChange={(e) => setNameOption(e.target.value)}
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
                                key={option.id}
                                className={clsx("w-full bg-gray-700 rounded-md shadow-sm shadow-gray-700 py-1.5 flex items-center justify-between px-2",
                                    currentStep > 2 && "cursor-pointer",
                                    currentStep > 2 && selectedOption?.id === option.id ? " border-2 " : "")}
                                onClick={() => setSelectedOption(option)}>
                                <span>{option.label}</span>
                                <button
                                    disabled={currentStep > 2}
                                    onClick={() => {
                                        setOptions((prev) => {
                                            return prev.filter((element) => (element.id !== option.id));
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
            {currentStep > 2 && <ProsAndCons options={options} setOptions={setOptions}
                                             currentStep={currentStep} setCurrentStep={setCurrentStep}
                                             indexMessage={indexMessage} showMessageError={showMessageError}
                                             showMessage={showMessage} selectedOption={selectedOption}
                                             setSelectedOption={setSelectedOption}/>}
        </>
    )
}


const ProsAndCons = ({
                         currentStep,
                         setCurrentStep,
                         showMessage,
                         setOptions,
                         options,
                         selectedOption,
                         setSelectedOption,
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


    const addReason = (type: "pros" | "cons", optionId?: number) => {
        const copyArrOptions = [...options]
        const newOptions = copyArrOptions.map((option) => {
            if (option.id === optionId) {
                if (option[type].length < 2) {
                    if (Object.values(currentReason).every((value) => value !== "")) {
                        option[type].push(currentReason)
                        setCurrentReason({description: "", punt: ""})
                        calculateAverage(option)
                        return option
                    } else {
                        showMessageError(2);
                        setCurrentReason({description: "", punt: ""})
                    }
                } else {
                    showMessageError(type === "pros" ? 3 : 4)
                }
            }
            return option;
        });
        setOptions(newOptions)
    };

    const calculateAverage = (option: OptionsProps) => {
        let sumCons = 0;
        let sumPros = 0;

        selectedOption?.pros.forEach((num) => {
            sumPros += parseFloat(num.punt);
        });

        selectedOption?.cons.forEach((num) => {
            sumCons += parseFloat(num.punt);
        });

        option.average = sumPros + sumCons;
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <div className="flex text-3xl gap-2 justify-around">
                <button
                    className={clsx("py-1 px-4 rounded-lg hover:scale-110 hover:border-2 transition",
                        showSection === 1 ? "border-2 rounded-lg bg-white text-black scale-110 " : "")}
                    onClick={() => {
                        setShowSection(1);
                    }}
                >
                    Pros
                </button>
                <button
                    className={clsx("py-1 px-4 rounded-lg hover:scale-110 hover:border-2 transition",
                        showSection === 2 ? "border-2 rounded-lg bg-white text-black scale-110 " : "")}
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
                                            <option key={idx} value={idx}
                                                    className={clsx("bg-black disabled:text-gray-600 checked:bg-gray-700")}>
                                                {idx}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button onClick={() => addReason("pros", selectedOption?.id)}>
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
                            {selectedOption?.pros.map((pro, i) => {
                                return (
                                    <div
                                        key={i}
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
                                                    const copyOption = selectedOption;
                                                    copyOption?.pros.splice(i, 1);
                                                    selectedOption = copyOption;
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
                                            <option key={idx} value={idx * -1}
                                                    className={clsx("bg-black disabled:text-gray-600 checked:bg-gray-700")}>
                                                {idx * -1}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button onClick={() => addReason("cons", selectedOption?.id)}>
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
                            className={"w-full flex flex-col justify-around gap-2"}>
                            {selectedOption?.cons.map((cons, i) => {
                                return (
                                    <div
                                        key={i}
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
                                                    const copyOption = selectedOption;
                                                    copyOption?.cons.splice(i, 1);
                                                    selectedOption = copyOption;
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
