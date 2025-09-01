import clsx from "clsx";

export const Button = ({className, children, onClick, ...props}) => {
    return (
        <button 
            className={clsx("cursor-pointer w-full gap-1.5 flex flex-row", className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}