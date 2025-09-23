import { useForm } from "react-hook-form";
import { PasswordInput } from "/src/components/auth/PasswordInput";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import SuccessWindow from "./SuccessWindow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePasswordReset from "/src/hooks/usePasswordReset";

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const {updatePassword} = usePasswordReset();

  const onSubmit = async ({ password1, password2 }) => {
    await updatePassword(password1, password2);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <SuccessWindow 
        title="Your password has been updated!"
        subtitle="You can now sign in with your new password"
        successButtonText="Back to Sign In"
        onContinue={() => navigate("/login")}
      />
    );
  }

  return (
    <>
        <h1 className="text-center text-4xl md:text-5xl font-medium font-serif mb-3">Reset Password</h1>
        <h2 className="text-center md:text-[20px] font-normal tracking-[1px] mb-5 md:mb-10 block max-w-[500px]">Please enter your new password below. Make sure it’s strong and haven’t used before</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 mb-5 md:mb-10">
                <PasswordInput 
                    inputProps={register("password1", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
                    })}
                    label="NEW PASSWORD"
                error={errors.password?.message}
                />
                <PasswordInput 
                    inputProps={register("password2", {
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
  );
};

export default ResetPassword;
