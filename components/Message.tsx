import clsx from "clsx";

interface MessageProps {
    className?:string;
    message?:string;
}


export const Message = ({message, className}: MessageProps) => {
return (
    <span className={clsx("italic text-sm", className)}>
        {message}
      </span>
)

}