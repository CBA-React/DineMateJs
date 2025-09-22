import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "/src/components/auth/EmailInput";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { EditCard } from "/src/components/edit/EditCard";
import { useState } from "react";
import { PasswordInput } from "/src/components/auth/PasswordInput";
import SuccessWindow from "/src/pages/auth/SuccessWindow";
import clsx from "clsx";

export const ResetPasswordEmail = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        navigate("/settings/verification-code");
      }

    return (
        <div className="relative w-full">
        <div  className="pt-[104px] md:pt-[180px] pb-[60px] md:pb-[100px] px-5 relative"
            style={{
                background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
              }}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <EditCard>
                <div className="md:mx-auto w-auto md:w-[500px]">
                        <h1 className="text-center text-4xl md:text-5xl font-medium font-serif mb-3">Reset Password</h1>
                        <h2 className="text-center md:text-[20px] font-normal font-family-sans-serif tracking-[1px] mb-5 md:mb-10">
                        Enter the email address associated with your account and we will send you a link to reset your password.
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                                <EmailInput 
                                    className="mb-5 md:mb-10"
                                    inputProps={register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" },
                                })}
                                error={errors.email?.message}/>
                                <SubmitButton onClick={(handleSubmit(onSubmit))} text="Continue" withIcon/>
                        </form>
                    </div>
                </EditCard>
            </div>
        </div>
    </div>
    )
}

export const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    async function onSubmit() {
        setIsSuccess(true);
      }

    return(
        <div className="relative w-full">
                    <div  className={clsx("pt-[104px] md:pt-[180px] pb-[60px] md:pb-[100px] relative px-5", isSuccess && "md:pt-[207px] md:pb-[128px] min-h-[335px]")}
                        style={{
                            background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                        }}
                    >
                        <div className="max-w-7xl mx-auto flex flex-col items-center">
                            <EditCard>
                                <div className="md:mx-auto w-auto md:w-[500px]">
                                    {!isSuccess ? (
                                        <>
                                        <h1 className="text-center text-4xl md:text-5xl font-medium font-serif mb-3">Reset Password</h1>
                                        <h2 className="text-center md:text-[20px] font-normal tracking-[1px] mb-5 md:mb-10 block max-w-[500px]">Please enter your new password below. Make sure it’s strong and haven’t used before</h2>
                                        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                                            <div className="space-y-6 mb-5 md:mb-10">
                                                <PasswordInput 
                                                    inputProps={register("password", {
                                                    required: "Password is required",
                                                    minLength: { value: 8, message: "Min 8 characters" },
                                                    })}
                                                    label="NEW PASSWORD"
                                                error={errors.password?.message}
                                                />
                                                <PasswordInput 
                                                    inputProps={register("password", {
                                                    required: "Password is required",
                                                    minLength: { value: 8, message: "Min 8 characters" },
                                                    })}
                                                    label="CONFIRM PASSWORD"
                                                    placeholder="Confirm your password"
                                                error={errors.password?.message}
                                                />
                                            </div>
                                        <SubmitButton onClick={handleSubmit(onSubmit)} text="Update Password" withIcon/>
                                        </form>
                                        </>
                                ) : (
                                    <SuccessWindow 
                                        title="Your password has been updated!"
                                        subtitle="You can now sign in with your new password"
                                        successButtonText="Back to Home"
                                        onContinue={() => navigate("/")}
                                    />
                                )}
                                </div>
                            </EditCard>
                        </div>
                    </div>
            </div>
    )
}