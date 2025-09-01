import { useForm } from "react-hook-form";
import { EmailInput } from "/src/components/auth/EmailInput";
import { PasswordInput } from "/src/components/auth/PasswordInput";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import useAuth from "../../hooks/useAuth";
import { Input } from "/src/components/ui/Input";
import { Checkbox } from "/src/components/ui/Checkbox";
import { AgeSelect } from "/src/components/auth/AgeSelect";
import { LocationSelect } from "/src/components/auth/LocationSelect";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const {
    isLoading,
    isError,
    message,
  } = useAuth();

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = () => {
    // if register OK:
    navigate("/onboarding/photos");
  }

  return (
    <>
      <h1 className="text-center text-5xl font-medium font-serif mb-3">Create Account</h1>
      <h2 className="text-center text-[20px] font-normal tracking-[1px] mb-10">
        Join our community of food-loving singles
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="space-y-6 mb-10">
          <Input
            label="FULL NAME"
            placeholder="Enter your full name"
            inputProps={register("name", {
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            error={errors.name?.message}
          />

          <EmailInput 
            inputProps={register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" },
            })}
            error={errors.email?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <AgeSelect 
              inputProps={register("age", {
                required: "Age is required"
              })}
              error={errors.age?.message}
            />
            
            <LocationSelect 
              inputProps={register("location", {
                required: "Location is required"
              })}
              error={errors.location?.message}
            />
          </div>
          
          <PasswordInput 
            inputProps={register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
            })}
            label="PASSWORD"
            placeholder="Create a password"
            error={errors.password?.message}
          />

          <PasswordInput 
            inputProps={register("confirmPassword", {
              required: "Confirm password is required",
              validate: value => value === password || "Passwords do not match"
            })}
            label="CONFIRM PASSWORD"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
          />

          <Checkbox
            inputProps={register("agreeToPolicy", {
              required: "You must agree to the terms and conditions",
              validate: value => value === true || "You must agree to the terms and conditions"
            })}
            label={
              <span>
                I agree to the{" "}
                <a 
                  href="/terms-of-service" 
                  className="text-primary hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
                {" "}and{" "}
                <a 
                  href="/privacy-policy" 
                  className="text-primary hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </span>
            }
            required={true}
            error={errors.agreeToPolicy?.message}
          />
        </div>

        {isError && <p className="text-sm text-red-600 mb-4">{message}</p>}

        <SubmitButton 
          text={isLoading ? "Creating Account..." : "Create Account"} 
          withIcon 
          disabled={isLoading}
        />
      </form>

      <span className="justify-center w-full flex gap-1 font-family-sans-serif text-fade-text">
        Already have an account?{" "}
        <a href="/login" className="text-primary cursor-pointer">Sign in</a>
      </span>
    </>
  );
};

export default Register;