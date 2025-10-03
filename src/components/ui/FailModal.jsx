import Modal from "/src/components/ui/Modal";
import { X } from "lucide-react";
import { ButtonCustom } from "/src/components/ui/ButtonCustom";
import { SubmitButton } from "./SubmitButton";

export const FailModal = ({
  open,
  onClose,
  title = "Something went wrong",
  description = "Please try again later.",
  primaryAction,   
  secondaryAction, 
  ariaLabel = "Error dialog",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnBackdrop
      closeOnEsc
      ariaLabel={ariaLabel}
      className="p-5 md:p-10 relative max-w-[335px] md:max-w-[609px] text-center text-primary-text justify-items-center"
    >
      <ButtonCustom
        className="absolute right-2.5 md:right-5 top-2.5 md:top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={28} />
      </ButtonCustom>

      <div className="h-[54px] w-[54px] rounded-full bg-primary flex items-center justify-center mb-4">
        <X className="h-10 w-10 text-white" />
      </div>

      <h2 className="font-serif font-medium text-4xl md:text-5xl mb-3">{title}</h2>
      <h4 className="md:text-[22px] mb-5">{description}</h4>

      <div className="flex flex-col-reverse md:flex-row gap-3 justify-center w-full">
        {secondaryAction && (
          <ButtonCustom
            className={`border border-secondary text-secondary rounded-full justify-center py-2.5 flex-1 font-medium ${secondaryAction.className || ""}`}
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.text}
          </ButtonCustom>
        )}

        {primaryAction && (
          <SubmitButton 
                text={primaryAction.text}
                withIcon
                onClick={primaryAction.onClick}
                className="flex-1"
            />
        )}
      </div>
    </Modal>
  );
};
