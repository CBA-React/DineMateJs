import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useMemo } from "react";
import { STEPS } from "/src/pages/onboarding/config";
import { AuthCard } from "../auth/AuthCard";
import { AuthBackground } from "../auth/AuthBackground";
import { BG_BY_PATH } from "../../constants";
import { SubmitButton } from "../ui/SubmitButton";
import { Check } from "lucide-react";

const DEFAULTS = {
    photos: [],
    gender: "",
    type: "",
    distance: 80,
    about: "",
    interests: [],
    traits: [],
    q1: undefined,
    q2: undefined,
    q3: undefined
  };

export function OnboardingLayout() {
  const methods = useForm({ defaultValues: DEFAULTS, mode: "onChange" });
  const { trigger, getValues } = methods;

  const { pathname } = useLocation();

  const bg = BG_BY_PATH.find((r) => r.test(pathname))?.src;

  const location = useLocation();
  const navigate = useNavigate();
  const stepIndex = useMemo(
    () => Math.max(0, STEPS.findIndex(s => location.pathname.endsWith(s.route))),
    [location.pathname]
  );
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const saveStep = async () => {
    const data = getValues();
    localStorage.setItem("onboarding", JSON.stringify(data));
  };

  const handleNext = async () => {
    const valid = await trigger(step.fields, { shouldFocus: true });
    if (!valid) return;

    await saveStep();
    if (isLast) {
      navigate("/home");
    } else {
      navigate(`/onboarding/${STEPS[stepIndex + 1].route}`);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      navigate(`/onboarding/${STEPS[stepIndex - 1].route}`);
    }
  };

  return (
    <AuthBackground src={bg}>
        <AuthCard>
            <FormProvider {...methods}>
                <div className="mx-auto max-w-[720px]">
                    <h1 className="text-center text-5xl text-primary-text font-serif my-10">Complete Your Profile</h1>
                    <h3 className="text-center text-primary-text font-normal text-[28px] mb-1.5">{step.h2}</h3>
                    <p className="text-center text-primary-text">{step.sub}</p>

                    <Stepper current={stepIndex} />

                    <div className="mt-8">
                    <Outlet />
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <button className="text-fade-text underline" onClick={handlePrev} disabled={stepIndex === 0}>
                            Previous
                        </button>
                        <SubmitButton onClick={handleNext} className="max-w-[120px]" withIcon text="Next" />
                    </div>
                </div>
            </FormProvider>
        </AuthCard>
    </AuthBackground>
  );
}

function Stepper({ current }) {
  return (
    <div className="my-6">
      <div className="flex items-center justify-center relative">
        <div
          className="absolute top-3.5 h-0.5 bg-primary-text/15"
          style={{
            left: `${100 / (STEPS.length * 2)}%`,
            right: `${100 / (STEPS.length * 2)}%`,
          }}
        />

        {current > 0 && (
          <div
            className="absolute top-3.5 h-0.5 bg-red-500"
            style={{
              left: `${100 / (STEPS.length * 2)}%`,
              width: `${(current / (STEPS.length - 1)) * (100 - 100 / STEPS.length)}%`,
            }}
          />
        )}

        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
            <div
              className={`w-8 h-8 rounded-full border-1 flex items-center justify-center ${
                index < current
                  ? "border-primary bg-primary"
                  : index === current
                    ? "border-primary bg-white"
                    : "border-fade-text bg-white"
              }`}
            >
              {index < current ? (
                <Check className="w-3 h-3 text-white" />
              ) : index === current ? (
                <div className="w-[7px] h-[7px] rounded-full bg-primary" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-transparent" />
              )}
            </div>
            <span className={`mt-2 text-sm font-medium ${index <= current ? "text-red-500" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
