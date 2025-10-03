import { FailModal } from "@/components/ui/FailModal";
import { useBooking } from "@/hooks/useBooking";

export const BookingFailedModal = () => {

    const {failOpen, closeBookingFailModal} = useBooking();

    return (
        <FailModal 
            open={failOpen}
            onClose={closeBookingFailModal}
            title="Booking Failed"
            description="Unfortunately, your reservation could not be confirmed. The selected time may already be booked, or a technical error occurred."
            secondaryAction={{
                text: "Choose Another Time",
                onClick: () => {}
            }}
            primaryAction={{
                text: "Try Again",
                onClick: () => {}
            }}
        />
    )
}