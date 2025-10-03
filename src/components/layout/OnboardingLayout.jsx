import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STEPS } from "/src/pages/onboarding/config";
import { AuthCard } from "/src/components/auth/AuthCard";
import { AuthBackground } from "/src/components/auth/AuthBackground";
import { BG_BY_PATH } from "/src/constants";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Check } from "lucide-react";
import useAuth from "/src/hooks/useAuth";
import { upsertDraft, resetDraft } from "/src/features/auth/registrationDraftSlice";
import { useVeriff } from "/src/hooks/useVeriff";

export function OnboardingLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = useLocation();
  const bg = BG_BY_PATH.find((r) => r.test(pathname))?.src;

  const draft = useSelector(s => s.registrationDraft);
  
  const defaultValues = useMemo(() => {
    const base = draft ? structuredClone(draft) : {};
    base.quiz = {
      additionalProp1: "",
      additionalProp2: "",
      additionalProp3: "",
      ...(draft?.quiz || {}),
    };
    return base;
  }, [draft]);
  
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const sub = methods.watch(vals => 
      dispatch(upsertDraft(structuredClone(vals))));
    return () => sub.unsubscribe();
  }, [methods, dispatch]);

  const stepIndex = useMemo(
    () => Math.max(0, STEPS.findIndex(s => location.pathname.endsWith(s.route))),
    [location.pathname]
  );

  const { registerUser, isLoading } = useAuth();
  const { startVeriffSession } = useVeriff();

  if (!draft?.email || !draft?.password1 || !draft?.password2) {
    return <Navigate to="/register" replace />;
  }

  const { trigger, getValues } = methods;

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleNext = async () => {
    const valid = await trigger(step.fields, { shouldFocus: true });
    if (!valid) return;

    if (!isLast) {
      navigate(`/onboarding/${STEPS[stepIndex + 1].route}`);
      return;
    }

    const allValues = getValues();             

    try {
      await registerUser(allValues);
      try {
        const { _, verification_url } = await startVeriffSession();
        if (verification_url) {
          window.location.assign(verification_url);
          return;
        }
      } catch (e) {
        console.error("Failed to start Veriff session:", e);
      }

      dispatch(resetDraft());
      navigate("/discover", { replace: true }); 
    } catch (err) {
      console.error("Register failed:", err);
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
                    <h1 className="text-center text-4xl md:text-5xl text-primary-text font-serif my-5 md:my-10">Complete Your Profile</h1>
                    <div className="hidden md:block">
                      <h3 className="text-center text-primary-text font-normal text-[28px] mb-1.5">{step.h2}</h3>
                      <p className="text-center text-primary-text">{step.sub}</p>
                    </div>

                    <Stepper current={stepIndex} />

                    <div className="mt-5 md:mt-8">
                    <Outlet />
                    </div>

                    <div className="mt-5 md:mt-10 flex flex-col-reverse md:flex-row items-center gap-3 justify-between">
                        <button className="text-fade-text underline" onClick={handlePrev} disabled={stepIndex === 0}>
                            Previous
                        </button>
                        <SubmitButton onClick={handleNext} className="md:max-w-[120px]" withIcon text="Next" disabled={isLoading} />
                    </div>
                </div>
            </FormProvider>
        </AuthCard>
    </AuthBackground>
  );
}

function Stepper({ current }) {
  return (
    <>
      <div className="sm:hidden text-left mt-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm text-primary font-medium">{STEPS[current].label}</p>
            <p className="text-sm text-fade-text">Step {current + 1} of {STEPS.length}</p>
          </div>

          <div
                className={`w-8 h-8 rounded-full border-1 flex items-center justify-center border-primary bg-white"
                }`}
          >
            <div className="w-[7px] h-[7px] rounded-full bg-primary" />
          </div>
        </div>

        <div>
          <h3 className="text-left text-primary-text font-normal text-[28px] mb-1.5">{STEPS[current].h2}</h3>
          <p className="text-left text-primary-text">{STEPS[current].sub}</p>
        </div>
      </div>

      <div className="hidden sm:block my-6">
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
    </>
  );
}
