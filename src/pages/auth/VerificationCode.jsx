import { useForm } from "react-hook-form";
import { VerificationCodeInput } from "/src/components/auth/CodeInput";
import { SubmitButton } from "../../components/ui/SubmitButton";
import { useNavigate } from "react-router-dom";
import usePasswordReset from "/src/hooks/usePasswordReset";

export const VerificationCode = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { verificationCode: "" },
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const { verifyCode } = usePasswordReset();

  const onSubmit = async ({ verificationCode }) => {
    await verifyCode(verificationCode);
    navigate("/reset-password");
  };

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl font-medium font-serif mb-3">Verification Code</h1>
      <h2 className="text-center md:text-[20px] font-normal font-family-sans-serif tracking-[1] mb-5 md:mb-10">
        We sent a reset link to <span className="text-primary">contact@gmail.com</span> enter 6 digit code that mentioned in the email
      </h2>

      <form className="mb-3 md:mb-5" onSubmit={handleSubmit(onSubmit)}>
        <VerificationCodeInput
          inputProps={register("verificationCode", {
            required: "Verification code is required",
            pattern: { value: /^\d{6}$/, message: "Code must be 6 digits" },
          })}
          error={errors.verificationCode?.message}
          length={6}
        />

        <SubmitButton type="submit" text="Continue" withIcon />
      </form>

      <span className="flex flex-col md:flex-row items-center text-sm md:text-base justify-center gap-1 text-fade-text">
        Haven’t got the email yet? <a href="#" className="text-primary">Resend email</a>
      </span>
    </>
  );
};
