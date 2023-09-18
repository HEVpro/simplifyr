"use client";
import {ChangeEvent} from "react";
import classNames from "classnames";

interface InputProps {
    type: "text" | "password" | "email" | "number";
    position?: "left" | "center" | "right";
    label?: string;
    name: string;
    placeholder: string;
    classname?: string;
    labelClassname?: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: InputProps) {


    return (
        <div className={classNames("py-4",
            props.position === "center" ? "flex flex-col justify-center items-center" :
                props.position === "left" ? "flex flex-col justify-center items-start" :
                    props.position === "right" && "flex flex-col justify-center items-end")}>
            {props.label && (
                <label
                    htmlFor={props.name}
                    className={props.labelClassname}
                >
                    {props.label}
                </label>
            )}
            <input
                type={props.type ? props.type : "text"}
                name={props.name ? props.name : "input"}
                id={props.name}
                className={classNames(
                    "block disabled:bg-gray-200",
                    props.classname,
                )}
                placeholder={props.placeholder ? props.placeholder : ""}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}
