import { useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X } from "lucide-react";

import Modal from "/src/components/ui/Modal";
import { Button } from "/src/components/ui/Button";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { useBooking } from "/src/hooks/useBooking";
import { Select } from "/src/components/ui/Select";
import { DateSelect } from "/src/components/ui/DateSelect";
import { PaymentTile } from "/src/components/dining/PaymentTile";
import { TextArea } from "/src/components/ui/TextArea";
import clsx from "clsx";

export const BookTableModal = () => {
  const { isOpen, restaurant, status, error, closeBookingModal, confirmBookingAction } = useBooking();

  const dateRef = useRef(null);
  const [step, setStep] = useState(1);

  const {
    watch,
    control,
    handleSubmit,
    reset,
    trigger,
  } = useForm({
    defaultValues: { 
        date: "", 
        time: "", 
        partySize: 2, 
        payment: "",
        specialRequests: "", 
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const partySize = watch("partySize") || 2;
  const perPerson = restaurant?.pricePerPerson ?? 0;

  const nf = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });
    const estTotal = nf.format(perPerson * partySize);

  const payTitle = partySize === 1
        ? "I'll Pay for Myself"
        : partySize === 2
        ? "I'll Pay for Both"
        : `I'll Pay for ${partySize} People`;
    
  const paySubtitle = `Cover all meals (est. ${estTotal})`;
  const payNote = "* Your date will need to confirm the reservation before any charges are applied";


  const handleClose = () => {
    reset();
    setStep(1);
    closeBookingModal();
  };

  const goNext = async () => {
    const step1Valid = await trigger(["date", "time", "partySize"]);
    if (step1Valid) {
      setStep(2);
    }
  };

  const goPrevious = () => {
    setStep(1);
  };

  const times = useMemo(() => {
    const out = [];
    for (let h = 17; h <= 22; h++) {
      for (let m of [0, 30]) {
        out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    out.push("22:30");
    return out;
  }, []);

  const timeOptions = times.map((t) => ({ label: t, value: t }));
  const partyOptions = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    return { label: `${n} ${n === 1 ? "Person" : "Persons"}`, value: n };
  });

  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = handleSubmit((vals) => {
    confirmBookingAction({
      ...vals,
      restaurantId: restaurant?.id,
      restaurantName: restaurant?.name,
    });
  });

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeOnBackdrop
      closeOnEsc
      initialFocusRef={dateRef}
      ariaLabel="Book a table dialog"
      className="relative gap-5 flex flex-col w-screen max-w-none h-[100svh] overflow-y-auto p-4 rounded-none md:max-w-[544px] md:h-auto md:overflow-visible md:p-10 md:rounded-2xl"
    >
      <div className="relative text-primary-text">
        <h2 className=" text-4xl md:text-5xl font-medium font-serif text-center mb-3">Book Your Date</h2>
        <h4 className="text-center md:text-[22px]">{restaurant?.name}</h4>
      </div>

      <Button
          className="absolute right-2.5 top-2.5 md:right-5 md:top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={28} />
        </Button>

      <form onSubmit={onSubmit}>
        <div className={clsx(step === 1 ? "block" : "hidden", "space-y-5")}>
          <Controller
              shouldUnregister={false}
              name="date"
              control={control}
              rules={{ required: "Please select a date" }}
              render={({ field, fieldState }) => (
              <DateSelect
                  label="DATE"
                  placeholder="Select a date"
                  required
                  min={today}
                  value={field.value}
                  onChange={(iso) => field.onChange(iso)}
                  inputProps={{
                  name: field.name,
                  onBlur: field.onBlur,
                  onFocus: field.onFocus,
                  }}
                  className=""
                  error={fieldState.error?.message || ""}
                  ref={dateRef}
              />
              )}
          />

          <Controller
            name="time"
            control={control}
            rules={{ required: "Please select a time" }}
            render={({ field, fieldState }) => (
              <Select
                label="TIME"
                placeholder="Select a time"
                required
                options={timeOptions}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                inputProps={{
                  name: field.name,
                  onBlur: field.onBlur,
                  onFocus: field.onFocus,
                }}
                error={fieldState.error?.message || ""}
              />
            )}
          />

          <Controller
            name="partySize"
            control={control}
            rules={{ required: "Please select party size" }}
            render={({ field, fieldState }) => (
              <Select
                label="PARTY SIZE"
                placeholder="Select party size"
                required
                options={partyOptions}
                value={field.value}
                onChange={(val) => field.onChange(Number(val))}
                inputProps={{
                  name: field.name,
                  onBlur: field.onBlur,
                  onFocus: field.onFocus,
                }}
                error={fieldState.error?.message || ""}
              />
            )}
          />

          {error ? <p className="text-sm text-primary">{error}</p> : null}

          <div className="flex flex-col-reverse md:flex-row items-center justify-between pt-2 gap-3">
            <Button className="underline px-0 text-fade-text justify-center md:justify-start" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton
              type="button"
              text={status === "loading" ? "Processing…" : "Continue"}
              withIcon
              disabled={status === "loading"}
              onClick={goNext}
              className="bg-primary rounded-full px-[42px] py-2.5 md:max-w-fit"
            />
          </div>
        </div>

        <div className={clsx(step === 2 ? "block" : "hidden", "space-y-5")}>
          <Controller
              shouldUnregister={false}
              name="payment"
              control={control}
              rules={{ required: "Choose a payment option" }}
              render={({ field, fieldState }) => (
                  <div className="space-y-3">
                  <PaymentTile
                      title="Split the Bill"
                      subtitle="Each person pays for their own meal"
                      checked={field.value === "split"}
                      onChange={() => field.onChange("split")}
                  />
                  <PaymentTile
                      title={payTitle}
                      subtitle={paySubtitle}
                      note={payNote}
                      checked={field.value === "host"}
                      onChange={() => field.onChange("host")}
                  />
                  
                  {fieldState.error?.message && (
                      <p className="mt-2 text-sm text-primary flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {fieldState.error.message}
                      </p>
                      )}
                  </div>
              )}
          />

          <TextArea
              control={control}
              name="specialRequests"
              label="SPECIAL REQUESTS"
              placeholder="Dietary restrictions, table preferences, etc."
              required={false}
              minLength={0}
              maxLength={500}
          />

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3">
              <Button
                  className="underline px-0 text-fade-text justify-center md:justify-start"
                  type="button"
                  onClick={goPrevious}
              >
                  Previous Step
              </Button>
              <SubmitButton
                  type="submit"
                  text={status === "loading" ? "Processing…" : "Book Table"}
                  withIcon
                  disabled={status === "loading"}
                  className="bg-primary rounded-full px-[42px] py-2.5 md:max-w-fit"
                  onClick={handleSubmit(onSubmit)}
              />
          </div>
        </div>
      </form>
    </Modal>
  );
}