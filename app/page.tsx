"use client";
import {useState} from "react";
import clsx from "clsx";
import Decision from "../components/Decision";
import {Options} from "@/components/Options";


/*interface formDataProps {
    decision: string;
    options: OptionsProps[];
}*/


export default function Home() {

    const [currentStep, setCurrentStep] = useState(1);


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
            {currentStep > 1 && <Options currentStep={currentStep} setCurrentStep={setCurrentStep}/>}
        </div>);
}
