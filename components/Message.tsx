import clsx from "clsx";

interface MessageProps {
    className?: string;
    message: string;
    variant?: "primary" | "alert" | "warning"
}


export const Message = ({message, className, variant = "primary"}: MessageProps) => {
    return (
        <span
            className={clsx("italic text-sm", className, variant === "alert" ? "text-red-500" : variant === "warning" ? "text-yellow-500" : "text-white")}>
        {message}
      </span>
    )

}