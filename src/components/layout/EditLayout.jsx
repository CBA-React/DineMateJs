import { EDIT_STEPS } from "/src/pages/edit/config";
import { EditCard } from "/src/components/edit/EditCard";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { ButtonCustom } from "/src/components/ui/ButtonCustom";
import { FormProvider, useForm } from "react-hook-form";
import useAuth from "/src/hooks/useAuth";
import { useMemo, useEffect } from "react";
import { Check } from "lucide-react";
import {
    setCurrentStep,
    nextStep,
    prevStep,
    updateFormData,
    setSubmitting,
  } from "/src/features/profile/profileSlice";

export const EditLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const isMobile = useIsMobile();

    const { currentStep, totalSteps, formData, isSubmitting } = useSelector(
        (s) => s.profile
      );
    
      const stepIndex = useMemo(() => {
        const i = EDIT_STEPS.findIndex((s) => pathname.endsWith(`/edit/${s.route}`));
        return i >= 0 ? i : 0;
      }, [pathname]);
    
      useEffect(() => {
        if (currentStep !== stepIndex + 1) {
          dispatch(setCurrentStep(stepIndex + 1));
        }
      }, [dispatch, stepIndex, currentStep]);
    
      const defaultValues = useMemo(() => structuredClone(formData), [formData]);
    
      const methods = useForm({
        defaultValues,
        mode: "onChange",
      });

      useEffect(() => {
        const sub = methods.watch((vals) =>
          dispatch(updateFormData(structuredClone(vals)))
        );
        return () => sub.unsubscribe();
      }, [methods, dispatch]);
    
      const { trigger, getValues } = methods;
      const { updateProfile } = useAuth();
    
      const validRoute = EDIT_STEPS.some((s) => pathname.endsWith(`/edit/${s.route}`));
      if (!validRoute && pathname.endsWith("/profile/edit")) {
        return <Navigate to="/profile/edit/general" replace />;
      }
    
      const isLast = currentStep === totalSteps;
      const step = EDIT_STEPS[currentStep - 1];
    
      const goto = (idx) => {
        navigate(`/edit/${EDIT_STEPS[idx].route}`);
      };
    
      const handleNext = async () => {
        const ok = await trigger(step.fields, { shouldFocus: true });
        if (!ok) return;
    
        if (!isLast) {
          dispatch(nextStep());
          goto(currentStep); 
          return;
        }
    
        const all = getValues();
        try {
          dispatch(setSubmitting(true));
          await updateProfile(all); 
          navigate("/profile/me", { replace: true });
        } finally {
          dispatch(setSubmitting(false));
        }
      };
    
      const handlePrev = () => {
        if (currentStep > 1) {
          dispatch(prevStep());
          goto(currentStep - 2);
        }
      };

    return (
        <div className="relative w-full">
            <div  className="pt-[135px] md:pt-[180px] pb-[60px] md:pb-[100px] relative px-5"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="max-w-7xl md:mx-auto flex flex-col items-center">
                    <EditCard>
                        <FormProvider {...methods}>
                            <div className="mx-auto max-w-[720px]">
                                
                                <EditStepper current={currentStep - 1} />
                                <div className="mt-8">
                                <Outlet />
                                </div>
                                <div className="mt-10 flex flex-col gap-5">
                                <SubmitButton onClick={updateProfile} withIcon text="Save" disabled={isSubmitting} className="w-full" />
                                {isMobile && <ButtonCustom className="text-secondary font-medium border-secondary border py-2.5 justify-center rounded-full" onClick={() => navigate("/profile")}>Cancel</ButtonCustom>}
                                  {currentStep === 1 && (
                                    <div className="flex w-full justify-center">
                                      <ButtonCustom
                                        onClick={handleNext}
                                        className="inline-flex w-full max-w-[320px] !justify-center text-fade-text underline"
                                      >
                                        Next Step
                                      </ButtonCustom>
                                    </div>
                                  )}

                                  {currentStep > 1 && currentStep < totalSteps && (
                                    <div className="flex w-full items-center justify-between">
                                      <ButtonCustom className="text-fade-text underline" onClick={handlePrev}>
                                        Previous Step
                                      </ButtonCustom>
                                      <ButtonCustom className="text-fade-text underline place-content-end" onClick={handleNext}>
                                        Next Step
                                      </ButtonCustom>
                                    </div>
                                  )}

                                  {currentStep === totalSteps && (
                                    <div className="flex w-full justify-center">
                                      <ButtonCustom
                                        onClick={handlePrev}
                                        className="inline-flex w-full max-w-[320px] !justify-center text-fade-text underline"
                                      >
                                        Previous Step
                                      </ButtonCustom>
                                    </div>
                                  )}
                                </div>
                            </div>
                        </FormProvider>
                    </EditCard>
                </div>
            </div>
        </div>
    )
}

function EditStepper({ current }) {
    return (
      <>
      <div className="sm:hidden text-left mt-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm text-primary font-medium">{EDIT_STEPS[current].label}</p>
            <p className="text-sm text-fade-text">Step {current + 1} of {EDIT_STEPS.length}</p>
          </div>

          <div
                className={`w-8 h-8 rounded-full border-1 flex items-center justify-center border-primary bg-white"
                }`}
          >
            <div className="w-[7px] h-[7px] rounded-full bg-primary" />
          </div>
        </div>
      </div>

      <div className="hidden sm:block mb-6 lg:min-w-[500px]">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute top-3.5 h-0.5 bg-primary-text/15"
            style={{
              left: `${100 / (EDIT_STEPS.length * 2)}%`,
              right: `${100 / (EDIT_STEPS.length * 2)}%`,
            }}
          />
          {current > 0 && (
            <div
              className="absolute top-3.5 h-0.5 bg-primary"
              style={{
                left: `${100 / (EDIT_STEPS.length * 2)}%`,
                width: `${(current / (EDIT_STEPS.length - 1)) * (100 - 100 / EDIT_STEPS.length)}%`,
              }}
            />
          )}
  
          {EDIT_STEPS.map((s, i) => (
            <div key={s.key} className="relative z-10 flex flex-1 flex-col items-center">
              <div
                className={`border-1 flex h-8 w-8 items-center justify-center rounded-full ${
                  i < current
                    ? "border-primary bg-primary"
                    : i === current
                    ? "border-primary bg-white"
                    : "border-fade-text bg-white"
                }`}
              >
                {i < current ? (
                  <Check className="h-3 w-3 text-white" />
                ) : i === current ? (
                  <div className="h-[7px] w-[7px] rounded-full bg-primary" />
                ) : (
                  <div className="h-2 w-2 rounded-full" />
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${i <= current ? "text-primary" : "text-fade-text"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
    );
  }
