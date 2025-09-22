import { useForm } from "react-hook-form";
import { EmailInput } from "/src/components/auth/EmailInput";
import { PasswordInput } from "/src/components/auth/PasswordInput";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Input } from "/src/components/ui/Input";
import { Checkbox } from "/src/components/ui/Checkbox";
import { AgeSelect } from "/src/components/auth/AgeSelect";
import { LocationSelect } from "/src/components/auth/LocationSelect";
import { useNavigate } from "react-router-dom";
import { upsertDraft } from "/src/features/auth/registrationDraftSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password1: "",
      password2: "",
      fullName: "",
      age: 18,
      gender: "",
      city: "",
      location: [0, 0],
      quiz: { additionalProp1: "", additionalProp2: "", additionalProp3: "" },
    },
    mode: "onChange",
  });

  const password1 = watch("password1");

  const [_, setLocStatus] = useState("idle"); // idle | requesting | granted | denied | unsupported
  const requestedRef = useRef(false); 

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    if (!("geolocation" in navigator)) {
      setLocStatus("unsupported");
      setError("location", { type: "manual", message: "Geolocation is not supported by this browser" });
      return;
    }

    const attempt = () => {
      setLocStatus("requesting");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(6));
          const lng = Number(pos.coords.longitude.toFixed(6));
          setValue("location", [lat, lng], { shouldValidate: true, shouldDirty: true });
          clearErrors("location");
          setLocStatus("granted");
        },
        (err) => {
          setLocStatus("denied");
          console.log(`Access denied ${err}`)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    };

    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((p) => {
          if (p.state === "granted" || p.state === "prompt") attempt();
          p.onchange = () => {
            if (p.state === "granted") attempt();
          };
        })
        .catch(() => attempt());
    } else {
      attempt();
    }
  }, [setValue, setError, clearErrors]);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(
      upsertDraft({
        email: data.email,
        password1: data.password1,
        password2: data.password2,
        fullName: data.fullName,
        age: Number(data.age),
        gender: data.gender,
        city: data.city,
        location: data.location
      })
    );
    navigate("/onboarding", { replace: true });
  };

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl font-medium font-serif mb-3">Create Account</h1>
      <h2 className="text-center md:text-[20px] font-normal tracking-[1px] mb-5 md:mb-10">
        Join our community of food-loving singles
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3 md:mb-5">
        <div className="space-y-6 mb-5 md:mb-10">
          <Input
            label="FULL NAME"
            placeholder="Enter your full name"
            inputProps={register("fullName", {
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            error={errors.fullName?.message}
          />

          <EmailInput 
            inputProps={register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" },
            })}
            error={errors.email?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AgeSelect 
              inputProps={register("age", {
                required: "Age is required"
              })}
              error={errors.age?.message}
            />
            
            <LocationSelect 
              inputProps={register("city", {
                required: "Location is required"
              })}
              error={errors.city?.message}
            />

              <input
                type="hidden"
                {...register("location", {
                  validate: (val) =>
                    (Array.isArray(val) &&
                      val.length === 2 &&
                      val.every((n) => Number.isFinite(Number(n))) &&
                      Math.abs(Number(val[0])) <= 90 &&
                      Math.abs(Number(val[1])) <= 180) ||
                    "Invalid location",
                })}
              />
              {errors.location?.message && (
                <p className="text-sm text-primary">{errors.location.message}</p>
              )}
          </div>
          
          <PasswordInput 
            inputProps={register("password1", {
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
            })}
            label="PASSWORD"
            placeholder="Create a password"
            error={errors.password1?.message}
          />

          <PasswordInput 
            inputProps={register("password2", {
              required: "Confirm password is required",
              validate: value => value === password1 || "Passwords do not match"
            })}
            label="CONFIRM PASSWORD"
            placeholder="Confirm your password"
            error={errors.password2?.message}
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

        <SubmitButton 
          text="Create Account"
          withIcon 
          type="submit"
        />
      </form>

      <span className="justify-center w-full flex gap-1 text-sm md:text-base font-family-sans-serif text-fade-text">
        Already have an account?{" "}
        <a href="/login" className="text-primary cursor-pointer">Sign in</a>
      </span>
    </>
  );
};

export default Register;