import { useForm } from "react-hook-form";
import { EmailInput } from "/src/components/auth/EmailInput";
import { PasswordInput } from "/src/components/auth/PasswordInput";
import { RememberMe } from "/src/components//auth/RememberMe";
import { ForgotPassword } from "/src/components/auth/ForgotPassword";
import { SubmitButton } from "/src/components/ui/SubmitButton";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(values) {
    const res = await fetch("/api/auth/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (res.ok) location.href = "/onboarding/photos";
    else alert((await res.json()).message || "Login failed");
  }

  return (
    <>
        <h1 className="text-center text-5xl font-medium font-serif mb-3">Welcome Back</h1>
        <h2 className="text-center text-[20px] font-normal tracking-[1px] mb-10">Sign in to continue your dating journey</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
            <div className="space-y-6 mb-10">
                <EmailInput 
                    inputProps={register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" },
                })}
                error={errors.email?.message}/>
                <PasswordInput 
                    inputProps={register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
                    })}
                error={errors.password?.message}
                />
                          <div className="flex items-center justify-between">
                <RememberMe/>
                <ForgotPassword/>
                          </div>
            </div>
          <SubmitButton text="Sign In" withIcon/>
        </form>
        <span className="justify-center w-full flex gap-1 font-family-sans-serif text-fade-text">
            Don't have an account? <a href="/register" className="text-primary cursor-pointer">Sign up</a>
        </span>
      </>
  );
};

export default Login;
