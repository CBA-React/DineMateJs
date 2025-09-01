import { Button } from "./Button";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

export const SubmitButton = ({text, withIcon, onClick, className}) => {
    return (
        <Button className={clsx("justify-center bg-primary p-2.5 rounded-full text-white items-center transition-all hover:-translate-y-0.5 hover:shadow-md duration-300", className)} onClick={onClick}>
            <span className="font-family-sans-serif font-medium">{text}</span>
            {withIcon && <ChevronRight strokeWidth={4} size={16}/>}
        </Button>
    )
}