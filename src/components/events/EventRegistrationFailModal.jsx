import { FailModal } from "@/components/ui/FailModal";
import { useEventRegistration } from "@/hooks/useEventRegistration";

export const EventRegistrationFailModal = () => {

    const {failOpen, closeConfirmationFailModal} = useEventRegistration();

    return (
        <FailModal 
            open={failOpen}
            onClose={closeConfirmationFailModal}
            title="Registration Failed"
            description="We couldn’t complete your registration. Please check your details and try again, or come back later."
            secondaryAction={{
                text: "Back to Events",
                onClick: () => {}
            }}
            primaryAction={{
                text: "Try Again",
                onClick: () => {}
            }}
        />
    )
}