import Modal from "/src/components/ui/Modal";
import { ChevronRight } from "lucide-react";
import { Button } from "/src/components/ui/Button";

const TEXT = {
  modalTitle1: "You’ve met everyone",
  modalTitle2: "in your area!",
  h4: "Come back later — new food lovers are joining every day.",
  expandArea: "Expand Search Area",
  discoverEvents: "Discover Events" 
}

export default function EndOfPeopleModal({
  open,
  onClose,
  onExpandArea = () => {},
  onDiscoverEvents = () => {},
}) {
  return (
    <Modal open={open} onClose={onClose} className="p-6 sm:p-8 md:p-10 font-serif lg:max-w-[560px]">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-primary-text lg:mb-3">
          {TEXT.modalTitle1}<br />{TEXT.modalTitle2}
        </h2>

        <h4 className="font-sans text-base sm:text-lg md:text-[22px] text-primary-text lg:mb-6">
          {TEXT.h4}
        </h4>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-sans">
          <Button
            onClick={onExpandArea}
            className="w-full sm:w-auto rounded-full px-[31px] py-2.5 border-2 border-secondary text-secondary hover:bg-secondary/5 transition"
          >
            {TEXT.expandArea}
          </Button>

          <Button
            onClick={onDiscoverEvents}
            className="w-full sm:w-auto rounded-full px-[31px] py-2.5 bg-primary text-white hover:bg-primary transition inline-flex items-center gap-2"
          >
            {TEXT.discoverEvents} <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
