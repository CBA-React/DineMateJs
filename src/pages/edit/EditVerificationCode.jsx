import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { EditCard } from "/src/components/edit/EditCard";
import { VerificationCodeInput } from "/src/components/auth/CodeInput";

export const EditVerificationCode = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        navigate("/settings/reset-password");
      }

    return (
        <div className="relative w-full">
        <div  className="pt-[180px] pb-[100px] relative"
            style={{
                background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                minHeight: '600px'
              }}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <EditCard>
                <div className="mx-auto w-[500px]">
                        <h1 className="text-center text-5xl font-medium font-serif mb-3">Reset Password</h1>
                              <h2 className="text-center text-[20px] font-normal font-family-sans-serif tracking-[1] mb-10">
                                We sent a reset link to <span className="text-primary">contact@gmail.com</span> enter 6 digit code that mentioned in the email
                              </h2>
                        
                              <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
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
                              <span className="flex justify-center gap-1 text-fade-text">
        Haven’t got the email yet? <a href="#" className="text-primary">Resend email</a>
      </span>
                    </div>
                </EditCard>
            </div>
        </div>
    </div>
    )
}