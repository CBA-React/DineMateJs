import { useRef } from "react";
import Modal from "/src/components/ui/Modal";
import { X, Heart } from "lucide-react";
import { Button } from "/src/components/ui/Button";

const TEXT = {
  title: "You’ve just matched!",
  subtitle: "Start the conversation now and find the perfect spot for your first dinner together.",
  findRestaurantButton: "Find a Restaurant",
  sendMessageButton: "Send a message",
  keepBrowsing: "Keep Browsing"
}

export const MatchModal = ({
    open,
    onClose,
    me = { name: "You", avatar: "/pictures/avatar.jpg" },
    match = { name: "Match", avatar: "/pictures/avatar.jpg" },
    onFindRestaurant = () => {},
    onSendMessage = () => {},
    onKeepBrowsing = () => {},
}) => {
    const focusRef = useRef(null);

  return (
    <Modal open={open} onClose={onClose} initialFocusRef={focusRef} className="relative p-6 sm:p-8 md:p-10 lg:max-w-[560px]">
      <Button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 max-h-7 max-w-7 top-4 flex items-center rounded-full text-gray-500 hover:bg-gray-100"
      >
        <X size={28} />
      </Button>

      <div className="text-center">
        <div className="flex items-center justify-center gap-4">
          <img src={me.avatar} alt={me.name} className="h-12 w-12 rounded-full object-cover" />
          <Heart className="text-primary" fill="currentColor" size={24} />
          <img src={match.avatar} alt={match.name} className="h-12 w-12 rounded-full object-cover" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-5xl font-semibold leading-tight text-primary-text lg:mb-3">
          {TEXT.title}
        </h2>

        <h4 className="font-sans text-lg sm:text-xl md:text-[22px] text-primary-text max-w-3xl mx-auto lg:mb-5">
          {TEXT.subtitle}
        </h4>

        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-sans lg:mb-5">
          <Button
            ref={focusRef}
            onClick={onFindRestaurant}
            className="w-full font-medium sm:w-auto rounded-full px-6 py-3 sm:px-8 sm:py-4 md:px-[42px] md:py-2.5 border-2 border-secondary text-secondary hover:bg-secondary/5"
          >
            {TEXT.findRestaurantButton}
          </Button>

          <Button
            onClick={onSendMessage}
            className="w-full font-medium sm:w-auto rounded-full px-6 py-3 sm:px-8 sm:py-4 md:px-[42px] md:py-2.5 bg-primary text-white hover:bg-primary inline-flex items-center gap-2"
          >
            {TEXT.sendMessageButton}
            <span aria-hidden>›</span>
          </Button>
        </div>

        <button
          onClick={onKeepBrowsing}
          className="mx-auto block font-sans text-fade-text underline underline-offset-4 hover:text-gray-700"
        >
          {TEXT.keepBrowsing}
        </button>
      </div>
    </Modal>
  );
}