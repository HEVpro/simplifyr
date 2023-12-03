import clsx from "clsx";
import {useState} from "react";
import {Message} from "@/components/Message";
import {errorMessageGroup, errorMessageType, MessageError} from "@/types/messageError";
import {useTranslations} from "next-intl";


export interface StepChildrenProps {
    currentStep: number;
    setCurrentStep: (value: number) => void;
    messageError: MessageError;
    setMessageError: (value: any) => void;
    showMessageError: (type: errorMessageType, group: errorMessageGroup) => void
}

const Decision = ({
                      currentStep,
                      setCurrentStep,
                      messageError,
                      showMessageError,
                      setMessageError
                  }: StepChildrenProps) => {
    const t = useTranslations("index")
    const [decision, setDecision] = useState("");

    const handleDecision = (e: any) => {
        if (e.key === "Enter") {
            if (decision.length > 0) {
                setCurrentStep(2);
            } else {
                showMessageError("empty", "decision")
            }
        }
    };

    return (
        <div className="mx-auto">
            <label htmlFor="decision" className="text-4xl">
                {t("stepOne.question")}
            </label>
            <div className={clsx("flex items-center justify-between border-b-2 mb-1",
                currentStep > 1 ? "border-gray-600" : messageError.group === "decision" ? "border-red-500" : "border-white",)}>
                <input
                    disabled={currentStep > 1}
                    type="text"
                    id="decision"
                    name="decision"
                    placeholder={t("stepOne.placeholder")}
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    onKeyDown={(e) => handleDecision(e)}
                    className={clsx(
                        "py-4 border-0 bg-transparent text-2xl placeholder:pl-2 pl-2 focus:outline-none focus:border-none",
                        currentStep > 1 ? "text-green-300" : "text-white"
                    )}
                />
                <button onClick={() => decision.length > 0 ? setCurrentStep(2) :  showMessageError("empty", "decision")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={clsx(
                            "icon icon-tabler icon-tabler-circle-check  transition ",
                            currentStep > 1 ? "stroke-green-300 cursor-default " : "hover:scale-110 stroke-white"
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
                </button>
            </div>
            <div className={"flex flex-col gap-2"}>
                {messageError.group === "decision" && messageError.type === "empty" && (
                    <Message message={t('errorMessageEmpty')} variant="alert"/>
                )}
                <Message
                    message={t("stepOne.message")}/>
            </div>
        </div>
    );
};
export default Decision;
