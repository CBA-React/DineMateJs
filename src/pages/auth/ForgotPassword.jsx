import { useForm } from "react-hook-form";
import { EmailInput } from "/src/components/auth/EmailInput";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        navigate("/verification-code")
      }

    return (
        <>
        <h1 className="text-center text-5xl font-medium font-serif mb-3">Forgot Password?</h1>
        <h2 className="text-center text-[20px] font-normal font-family-sans-serif tracking-[1px] mb-10">
        Enter the email address associated with your account and we will send you a link to reset your password.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                <EmailInput 
                    className="mb-10"
                    inputProps={register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" },
                })}
                error={errors.email?.message}/>
                <SubmitButton onClick={(handleSubmit(onSubmit))} text="Continue" withIcon/>
        </form>
        <a href="/login" className="justify-center w-full flex gap-1 font-family-sans-serif text-fade-text">
            Back to Sign In
        </a>
        </>
    )
}