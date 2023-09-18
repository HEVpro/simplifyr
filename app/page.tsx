"use client"
import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "@/components/input";


interface OptionsProps {
    option: string
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
            option: '',
            pros: Array(3).fill({description: '', punt: ''}),
            cons: Array(3).fill({description: '', punt: ''}),
        });
    }
    return initialOptions;
}

export default function Home() {
    const initialOptions = initialOptionsNumber(3)
    const [formData, setFormData] = useState<formDataProps>({
        decision: '',
        options: initialOptions
    })

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        optionIndex: number,
        lineIndex?: number,
        type?: string
    ) => {
        const {value, name} = e.target
        console.log(optionIndex, name, value, type)
        let copyArrOptions = formData.options.map((option, index) => {
            if (optionIndex === index) {
                return {
                    ...option,
                    cons: option.cons.map((consElement, consIdx) => {
                        if (type === "cons" && lineIndex === consIdx) {
                            return {
                                ...consElement, [name]: value
                            }
                        }
                        return consElement
                    }),
                    pros: option.pros.map((proElement, proIdx) => {
                        if (type === "pros" && lineIndex === proIdx) {
                            return {
                                ...proElement, [name]: value
                            }
                        }
                        return proElement
                    }),
                }
            }
            return option
        })
        if (name === "option") {
            copyArrOptions[optionIndex].option = value;
        }
        setFormData({...formData, options: copyArrOptions})
    };

    /*      const handleAddOption = (e: any) => {
              e.preventDefault()
              const addOption = {option: '', pros: [], cons: []}
              setFormData({
                  ...formData,
                  options: [...formData.options, addOption],
              });
          };*/

    useEffect(() => {
        console.log(formData)
    }, [formData]);


    return (
        <div className={' max-w-4xl mx-auto py-24 text-6xl'}>

            <form>
                <Input
                    classname={"w-full py-4 border-0 border-b-2 bg-transparent text-3xl"}
                    value={formData.decision}
                    label={"¿Qué decisión quieres tomar?"} type={"text"} name={"decision"}
                    placeholder={"Comprar un coche"}
                    onChange={(e) => setFormData({...formData, decision: e.target.value})}/>

                {formData.decision !== "" &&
                    <div>
                        {/*<div className={"float-right cursor-pointer"} onClick={(e)=> handleAddOption(e)}>+</div>*/}
                        <label>¿Qué opciones tienes?</label>
                        {formData.options.map((option: OptionsProps, idx: number) => {
                            return <Input
                                classname={"w-full py-4 border-0 border-b-2 bg-transparent text-3xl"}
                                type={"text"}
                                name={"option"}
                                placeholder={`Opción ${idx + 1}`}
                                onChange={(e) => handleChange(e, idx)}/>
                        })}
                    </div>}
                <div>
                    {formData.options.map((option, idx) => {
                        return option.option !== "" && (
                            <>
                                <h5 className={"pb-2"}>{option.option}</h5>
                                <div className={"flex flex-row"}>

                                    <div>
                                        <label>Pros:</label>
                                        {option.pros.map((pro, i) => {
                                            return (
                                                <div className={"flex flex-row"}>
                                                    <Input
                                                        classname={"w-full py-4 border-0 border-b-2 bg-transparent text-3xl"}
                                                        type={"text"} name={"description"} placeholder={`pro ${i + 1}`}
                                                        onChange={(e) => handleChange(e, idx, i, "pros")}/>
                                    {/*                <Input
                                                        classname={"w-full py-4 border-0 border-b-2 bg-transparent text-3xl"}
                                                        type={"text"} name={"pros-val"}
                                                        placeholder={`puntuacion ${i + 1}`}
                                                        onChange={(e) => handleChange(e, idx, i)}/>*/}
                                                </div>)
                                        })}
                                    </div>
                                    <div>
                                        <label>Contras:</label>
                                        {option.cons.map((pro, i) => {
                                            return (
                                                <div className={"flex flex-row"}>
                                                    <Input
                                                        classname={"w-full py-4 mx-2 border-0 border-b-2 bg-transparent text-3xl"}
                                                        type={"text"} name={"description"} placeholder={`cons ${i + 1}`}
                                                        onChange={(e) => handleChange(e, idx, i, "cons")}/>
                                           {/*         <Input
                                                        classname={"w-full py-4 border-0 border-b-2 bg-transparent text-3xl"}
                                                        type={"text"} name={"const-val"}
                                                        placeholder={`puntuacion ${i + 1}`}
                                                        onChange={(e) => handleChange(e, idx, i)}/>*/}
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            </>

                        )
                    })}
                </div>
                {/*<div className={"flex flex-col justify-center items-center"}>
                    <button
                        className={"text-xl border-0 p-4 rounded-lg bg-amber-400 text-black hover:bg-amber-600 transition"}
                        onClick={(e) => handleAddOption(e)}>Añadir
                        opciones
                    </button>
                </div>*/}
            </form>
        </div>
    )
}
