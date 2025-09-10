import { useForm } from "react-hook-form";
import { EmailInput } from "/src/components/auth/EmailInput";
import { PasswordInput } from "/src/components/auth/PasswordInput";
import { RememberMe } from "/src/components//auth/RememberMe";
import { ForgotPassword } from "/src/components/auth/ForgotPassword";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { useAuth } from "/src/hooks/useAuth"
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { loginUser, isLoading, isError, message, resetAuthState } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/discover";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", remember: false },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      await loginUser(values); 
      if (values.remember) localStorage.setItem("remember_me", "1");
      else localStorage.removeItem("remember_me");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    resetAuthState();
  }, []);

  return (
    <>
        <h1 className="text-center text-5xl font-medium font-serif mb-3">Welcome Back</h1>
        <h2 className="text-center text-[20px] font-normal tracking-[1px] mb-10">Sign in to continue your dating journey</h2>
     
        {isError && !!message && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-600">{message}</div>
        )}

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
            <SubmitButton
              text={isLoading ? "Signing in..." : "Sign In"}
              withIcon
              type="submit"
              disabled={isLoading}
            />
        </form>
        <span className="justify-center w-full flex gap-1 font-family-sans-serif text-fade-text">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-primary cursor-pointer">Sign up</Link>
      </span>
      </>
  );
};

export default Login;
