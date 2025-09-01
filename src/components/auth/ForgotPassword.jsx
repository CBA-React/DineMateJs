import clsx from "clsx";

export const ForgotPassword = ({className}) => {
    return(
        <a href="/forgot-password" className={clsx("text-primary font-poppins font-normal text-base", className)}>Forgot password?</a>
    )
}