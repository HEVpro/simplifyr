"use client";
import { useState } from "react";
import clsx from "clsx";
import Decision from "./Decision";
import { Options } from "@/components/Options";
import LanguageSelector from "@/components/LangSelector";
import { MessageError, errorMessageGroup, errorMessageType } from "@/types/messageError";


export default function Test() {

    const [currentStep, setCurrentStep] = useState(1);
    const [messageError, setMessageError] = useState<MessageError>({
        active: false,
        type: null,
        group: null,
    })

    const showMessageError = (type: errorMessageType, group: errorMessageGroup) => {

        setMessageError({
            active: true,
            type: type,
            group: group,
        })
        setTimeout(() => setMessageError({ active: false, type: null, group: null }), 3500)

    }

    return (
        <div className={"max-w-5xl mx-auto py-24"}>
            <div><LanguageSelector /></div>
            <div className="max-w-lg mx-auto mb-8 flex items-center justify-between">
                {new Array(3).fill(0).map((item, idx) => {
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
            <Decision currentStep={currentStep} setCurrentStep={setCurrentStep} messageError={messageError}
                setMessageError={setMessageError} showMessageError={showMessageError} />
            {currentStep > 1 &&
                <Options currentStep={currentStep} setCurrentStep={setCurrentStep} messageError={messageError}
                    setMessageError={setMessageError} showMessageError={showMessageError} />}
        </div>);
}
