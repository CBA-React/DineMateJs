import clsx from "clsx";
import { Logo } from "/src/components/branding/Logo";
import { BrandName } from "/src/components/branding/BrandName";

export const AuthCard = ({ children, className }) => {
    return (
        <div className={clsx("mx-auto md:w-[650px] md:my-20 max-w-full rounded-2xl bg-white md:px-[75px] p-7 md:py-10 drop-shadow-box", className)}>
            <div className="flex flex-row items-center w-full justify-center mb-5 md:mb-10">
                <Logo/>
                <BrandName/>
            </div>
            {children}
        </div>
    )
}