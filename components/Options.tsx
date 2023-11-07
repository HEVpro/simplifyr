import clsx from "clsx";
import {CircleArrowRight, CircleCheck, CircleMinus, CirclePlus} from "@/components/Icons";
import {Message} from "@/components/Message";
import {useEffect, useState} from "react";
import {StepChildrenProps} from "@/components/Decision";


interface ReasonProps {
    description: string;
    punt: number;
}

interface IOptions {
    id: number;
    label: string;
    pros: ReasonProps[];
    cons: ReasonProps[];
    average: number;
}

interface ProsAndConsProps extends StepChildrenProps {
    options: IOptions[];
    setOptions: (value: any) => void;
    selectedOption?: IOptions;
}


export const Options = ({
                            currentStep,
                            setCurrentStep,
                            messageError,
                            setMessageError,
                            showMessageError
                        }: StepChildrenProps) => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const [optionId, setOptionId] = useState(1);
    const [nameOption, setNameOption] = useState("");
    const [selectedOption, setSelectedOption] = useState<IOptions>();


    const handleAddOption = (e: any) => {
        if (e.key === "Enter") {
            addOption();
        }
    };

    const addOption = () => {
        if (options.length < 3) {
            if (nameOption.length > 0) {
                setOptions((prev) => [
                    ...prev,
                    {id: optionId, label: nameOption, pros: [], cons: [], average: 0},
                ]);
                setOptionId(optionId + 1)
                setNameOption("");
            } else {
                showMessageError("empty", "option")
            }
        } else if (options.length === 3 && nameOption.length === 0) {
            setNameOption("");
        } else {
            showMessageError("limit", "option");
            setNameOption("");
        }
    }

    useEffect(() => {
        if (currentStep === 3 && options.length > 1) {
            const defaultOption = options.filter((option) => option.id === 1)[0]
            setSelectedOption(defaultOption)
        }
    }, [currentStep])



    return (
        <>
            <div className="mx-auto mt-8">
                <label htmlFor="option" className="text-4xl">
                    ¿Qué opciones tienes?
                </label>
                <div
                    className={clsx("flex items-center justify-between border-b-2  mb-1 transition-colors duration-300",
                        options.length == 3 ? "border-gray-600" : "border-white",
                        messageError.group === "option" ? "border-b-red-500" : "")}>
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
                            messageError.active ? "text-red-600" : ""
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
                                    messageError.group === "option" && messageError.type === "limit" ? "stroke-red-500" : "")}
                            />
                        )}
                    </button>
                </div>
                {messageError.group === "option" &&  (
                    <Message
                        message={messageError.type === "limit" ? "Has alcanzado el número máximo de opciones. Borra una para añadir otra." : "El campo no puede estar vacío"}
                        variant="alert"/>
                )}
                <div className="mt-4 flex flex-col gap-y-2">
                    {options.map((option) => {
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
                                >{currentStep === 2 &&
                                    <CircleMinus className={clsx("stroke-red-500 w-7 h-7 fill-gray-700")}/>}
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
                                             showMessageError={showMessageError}
                                             selectedOption={selectedOption}
                                             messageError={messageError} setMessageError={setMessageError}/>}
        </>
    )
}


const ProsAndCons = ({
                         currentStep,
                         setCurrentStep,
                         setOptions,
                         options,
                         selectedOption,
                         setMessageError,
                         showMessageError,
                         messageError
                     }: ProsAndConsProps) => {
    const [showSection, setShowSection] = useState(1);
    const [currentReason, setCurrentReason] = useState<ReasonProps>({description: "", punt: 0});


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
                        setCurrentReason({description: "", punt: 0})
                        calculateAverage(option)
                        return option
                    } else {
                        showMessageError("empty", type);
                        setCurrentReason({description: "", punt: 0})
                    }
                } else {
                    showMessageError("limit", type)
                }
            }
            return option;
        });
        setOptions(newOptions)
    };

    const calculateAverage = (option: IOptions) => {
        let sumCons = 0;
        let sumPros = 0;

        selectedOption?.pros.forEach((num) => {
            sumPros += Number(num.punt);
        });

        selectedOption?.cons.forEach((num) => {
            sumCons += Number(num.punt);
        });

        option.average = sumPros + sumCons;
    };

    const degree = [
        {value: 1, label: "Insignificante"},
        {value: 2, label: "Relevante"},
        {value: 3, label: "Significativo"},
        {value: 4, label: "Valioso"},
        {value: 5, label: "Fundamental"},
        {value: 6, label: "Crucial"},
        {value: 7, label: "Transcendental"},
        {value: 8, label: "Indispensable"},
        {value: 9, label: "Vital"},
    ]


    return (
        <div className="mx-auto mt-8">
            <div className="flex text-3xl justify-between items-center gap-4">
                <button
                    className={clsx("w-1/2 py-2 rounded-lg transition",
                        showSection === 1 ? "bg-white text-black" : "bg-gray-600 hover:bg-white text-gray-300 hover:text-black")}
                    onClick={() => {
                        setShowSection(1);
                    }}
                >
                    Pros
                </button>
                <button
                    className={clsx("w-1/2 py-2 rounded-lg transition",
                        showSection === 2 ? "bg-white text-black" : " bg-gray-600 hover:bg-white text-gray-300 hover:text-black")}
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
                                messageError.group === "pros" ? "border-b-red-500" : "")}>
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

                            <div className={clsx("w-2/6 border-b-2 flex flex-row mb-1",
                                messageError.group === "pros" ? "border-b-red-500" : "border-white")}>
                                <select id="punt"
                                        name="punt"
                                        value={currentReason?.punt}
                                        onChange={(e) => handleChangeReasons(e)}
                                        className={clsx(
                                            "w-full py-4 border-0 bg-transparent text-xl placeholder:pl-2 focus:outline-none focus:border-none ",
                                            currentReason.punt === 0 ? "text-gray-400" : "text-white")}>
                                    <option value="" disabled={true} hidden>Del 1 al 9</option>
                                    {degree.map((item, idx) => {
                                        return (
                                            <option key={idx} value={item.value}
                                                    className={clsx("bg-black disabled:text-gray-600 checked:bg-gray-700")}>
                                                {item.label}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button onClick={() => addReason("pros", selectedOption?.id)}>
                                    <CirclePlus className={clsx("stroke-white")}/>
                                </button>
                            </div>
                        </div>
                        {messageError.group === "pros" && (
                            <Message message={messageError.type === "empty" ? "Debes rellenar los campos" : "Has alcanzado el límite de pros"} variant="alert"/>
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
                                messageError.group === "cons" ? "border-b-red-500" : "border-white")}>
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
                                messageError.group === "cons" ? "border-b-red-500" : "border-white")}>
                                <select id="punt"
                                        name="punt"
                                        value={currentReason?.punt}
                                        onChange={(e) => handleChangeReasons(e)}
                                        className={clsx(
                                            "w-full py-4 border-0 bg-transparent text-2xl placeholder:pl-2 focus:outline-none focus:border-none ",
                                            currentReason.punt === 0 ? "text-gray-400" : "text-white")}>
                                    <option value="" disabled={true} hidden>Del 1 al 9</option>
                                    {degree.map((item, idx) => {
                                        return (
                                            <option key={idx} value={item.value}
                                                    className={clsx("bg-black disabled:text-gray-600 checked:bg-gray-700")}>
                                                {item.label}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button onClick={() => addReason("cons", selectedOption?.id)}>
                                    <CirclePlus className={clsx("stroke-white")}/>
                                </button>
                            </div>
                        </div>
                        {messageError.group === "cons" &&  (
                            <Message message={messageError.type === "empty" ? "Debes rellenar los campos" : "Has alcanzado el límite de contras"} variant="alert"/>
                        )}
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
