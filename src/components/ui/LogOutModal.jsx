import Modal from "/src/components/ui/Modal";
import { ButtonCustom } from "/src/components/ui/ButtonCustom";
import { X } from "lucide-react";
import { useAuth } from "/src/hooks/useAuth";
import { SubmitButton } from "./SubmitButton";
import { useUI } from "/src/hooks/useUI";

const TEXT = {
    title: "Log Out",
    subtitle: "Are you sure you want to log out? You'll need to sign in again",
}

export const LogOutModal = ({ open, onClose }) => {
    const { logoutUser } = useAuth();
    const { closeLogOut } = useUI();

    const handleClose = () => {
        closeLogOut();
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-[335px] md:max-w-[544px] text-primary-text relative">
            <div className="p-7 md:p-10 flex flex-col gap-5">
                <div className="flex items-start justify-between">
                    <div className="w-full text-center">
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">
                        {TEXT.title}
                        </h2>
                        <h4 className="mt-3 md:text-[22px]">{TEXT?.subtitle}</h4>
                    </div>
                <ButtonCustom
                    className="absolute right-5 top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
                    onClick={onClose}
                    aria-label="Close"
                    >
                        <X size={28} />
                    </ButtonCustom>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between pt-2 gap-3">
                    <ButtonCustom className="underline px-0 text-fade-text justify-center md:justify-start" type="button" onClick={handleClose}>
                        Cancel
                    </ButtonCustom>
                    <SubmitButton
                        type="button"
                        text={"Log out"}
                        withIcon
                        onClick={logoutUser}
                        className="bg-primary rounded-full px-[42px] py-2.5 max-w-fit"
                    />
                </div>
            </div>
        </Modal>
    )
};