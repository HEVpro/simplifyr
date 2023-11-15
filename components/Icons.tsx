import {ComponentProps} from "react";
import clsx from "clsx";

export interface SVGIconProps extends ComponentProps<"svg"> {
    className?: string;
}

export const CircleArrowRight = ({className}: SVGIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("icon icon-tabler icon-tabler-circle-arrow-right ", className)}
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
    )
}

export const CircleCheck = ({className}: SVGIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("icon icon-tabler icon-tabler-circle-check cursor-default", className)}
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
    )
}

export const CirclePlus = ({className}: SVGIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("icon icon-tabler icon-tabler-circle-plus transition-colors duration-300", className)}
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
    )
}

export const CircleMinus = ({className}: SVGIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("icon icon-tabler icon-tabler-circle-plus", className)}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
            <path d="M9 12l6 0"/>
        </svg>
    )
}

export const ChevronUpDownIcon = ({className}: SVGIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={clsx("icon icon-tabler icon-tabler-selector", className)}
             width="24"
             height="24"
             viewBox="0 0 24 24"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 9l4 -4l4 4"></path>
            <path d="M16 15l-4 4l-4 -4"></path>
        </svg>
    )
}
