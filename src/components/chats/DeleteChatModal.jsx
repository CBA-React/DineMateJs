import Modal from "/src/components/ui/Modal";
import { Button } from "/src/components/ui/Button";
import { X } from "lucide-react";
import { SubmitButton } from '/src/components/ui/SubmitButton';
import { useDeleteChat } from "/src/hooks/useDeleteChat";

const TEXT = {
    title: "Delete chat",
    subtitle: "Are you sure you want to delete this chat? This action can’t be undone.",
}

export const DeleteChatModal = () => {
    const { deleteChatOpen, closeDeleteChatModal, confirmDeleteChat } = useDeleteChat();

  return (
    <Modal
      open={deleteChatOpen}
      onClose={closeDeleteChatModal}
      closeOnBackdrop
      closeOnEsc
      ariaLabel="Delete chat"
      className="p-5 md:p-10 relative max-w-[335px] md:max-w-[544px] text-center text-primary-text justify-items-center"
    >
      <Button
          className="absolute right-5 top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
          onClick={closeDeleteChatModal}
          aria-label="Close"
        >
          <X size={28} />
        </Button>

      <h2 className="font-serif font-medium text-4xl md:text-5xl mb-3">
        {TEXT.title}
      </h2>

      <h4 className="md:text-[22px] mb-5">
        {TEXT.subtitle}
      </h4>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-3">
        <Button onClick={closeDeleteChatModal} className="underline text-fade-text justify-center md:justify-start">
          Cancel
        </Button>
        <SubmitButton
            text="Delete"
            withIcon
            className="bg-primary px-[38px] py-2.5 rounded-full font-medium md:max-w-fit"
            onClick={confirmDeleteChat}
        />
      </div>
    </Modal>
  );
}
