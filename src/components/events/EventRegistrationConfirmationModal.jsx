import Modal from "/src/components/ui/Modal";
import { ButtonCustom } from "/src/components/ui/ButtonCustom";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { X } from "lucide-react";
import { useEventRegistration } from "/src/hooks/useEventRegistration";
import { formatDateTime } from "/src/utils/dateUtils";

export const EventRegistrationConfirmationModal = () => {
  const { confirmationOpen, confirmation, closeConfirmationModal } =
    useEventRegistration();

  const { dateStr, timeStr } = confirmation
    ? formatDateTime(confirmation.date, confirmation.time)
    : { dateStr: "", timeStr: "" };

  const locationLine = confirmation
    ? [confirmation.venueName, confirmation.venueArea].filter(Boolean).join(", ")
    : "";

  return (
    <Modal
      open={confirmationOpen}
      onClose={closeConfirmationModal}
      closeOnBackdrop
      closeOnEsc
      ariaLabel="Registration confirmed"
      className="p-5 md:p-10 relative max-w-[335px] md:max-w-[609px] text-center text-primary-text justify-items-center"
    >
      <ButtonCustom
        className="absolute right-2.5 md:right-5 top-2.5 md:top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
        onClick={closeConfirmationModal}
        aria-label="Close"
      >
        <X size={28} />
      </ButtonCustom>

      <h2 className="font-serif text-4xl md:text-5xl mb-3">
        Registration Confirmed!
      </h2>

      <h4 className="md:text-[22px]">
        <span className="font-semibold"> You’re registered for {confirmation?.eventTitle}</span>.
      </h4>

      <h4 className="md:text-[22px] mb-5">
        {locationLine && <>{locationLine} — </>}
        {dateStr} at {timeStr}
      </h4>

      <p className="text-fade-text mb-5">
        Confirmation details sent to your email
      </p>

      <SubmitButton
        text="Great"
        withIcon
        className="bg-primary px-14 py-2.5 rounded-full font-medium md:max-w-fit"
        onClick={closeConfirmationModal}
      />
    </Modal>
  );
};
