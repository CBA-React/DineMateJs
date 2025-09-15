import Modal from "/src/components/ui/Modal";
import { Button } from "/src/components/ui/Button";
import { X } from "lucide-react";
import { useBooking } from "/src/hooks/useBooking";
import { SubmitButton } from '/src/components/ui/SubmitButton';
import { formatDateTime } from "/src/utils/dateUtils";


export const BookingConfirmationModal = () => {
  const { confirmationOpen, confirmation, closeConfirmationModal } = useBooking();

  const { dateStr, timeStr } = confirmation
    ? formatDateTime(confirmation.date, confirmation.time)
    : { dateStr: "", timeStr: "" };

  return (
    <Modal
      open={confirmationOpen}
      onClose={closeConfirmationModal}
      closeOnBackdrop
      closeOnEsc
      ariaLabel="Booking confirmed"
      className="p-10 relative max-w-[544px] text-center text-primary-text justify-items-center"
    >
      <Button
          className="absolute right-5 top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
          onClick={closeConfirmationModal}
          aria-label="Close"
        >
          <X size={28} />
        </Button>

      <h2 className="font-serif text-5xl mb-3">
        Booking Confirmed!
      </h2>

      <h4 className="text-[22px]">
        Your table at <span className="font-semibold">{confirmation?.restaurantName}</span> is reserved for
      </h4>
      <h4 className="text-[22px] mb-5">
        {dateStr} at {timeStr}
      </h4>

      <p className="text-fade-text mb-5">
        Confirmation details sent to your email
      </p>

        <SubmitButton
            text="Great"
            withIcon
            className="bg-primary px-14 py-2.5 rounded-full font-medium max-w-fit"
            onClick={closeConfirmationModal}
        />
    </Modal>
  );
}
