"use client";
import {useState} from "react";
import clsx from "clsx";
import Decision from "../components/Decision";
import {Options} from "@/components/Options";


/*interface formDataProps {
    decision: string;
    options: OptionsProps[];
}*/

export interface MessageError {
    active: boolean;
    type: errorMessageType;
    group: errorMessageGroup
    message: string | undefined;
}

export type errorMessageType = "empty" | "limit" | null
export type errorMessageGroup = "decision" | "option" | "pros" | "cons" | null

export default function Home() {

    const [currentStep, setCurrentStep] = useState(1);
    const [messageError, setMessageError] = useState<MessageError>({
        active: false,
        type: null,
        group: null,
        message: ""
    })

    const showMessageError = (type: errorMessageType, group: errorMessageGroup) => {
        let message
        /*decidir si los mensajes los seteamos aqui o en su componente Message*/
        if (type === "limit") {
            message = "Has alcanzado el límite de opciones, si quieres añadir otra, debes eliminar una primero"
        } else if (type === "empty") {
            message = "Debes rellenar los campos"
        }
        setMessageError({
            active: true,
            type: type,
            group: group,
            message: message
        })
        setTimeout(() => setMessageError({active: false, type: null, group: null, message: ""}), 3500)

    }

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
            <Decision currentStep={currentStep} setCurrentStep={setCurrentStep} messageError={messageError} setMessageError={setMessageError} showMessageError={showMessageError} />
            {currentStep > 1 && <Options currentStep={currentStep} setCurrentStep={setCurrentStep} messageError={messageError} setMessageError={setMessageError} showMessageError={showMessageError} />}
        </div>);
}
