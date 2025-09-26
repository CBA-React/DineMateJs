import { ButtonCustom as ButtonCustom } from "/src/components/ui/ButtonCustom";
import { X, Heart } from "lucide-react";

export const DiscoverCardFooter = ({ onPass = () => {}, onLike = () => {} }) => {
  return (
    <div className="pointer-events-auto mt-4 flex items-center justify-between">
      <ButtonCustom
        aria-label="Pass"
        onClick={onPass}
        className="grid h-14 max-h-14 max-w-14 place-items-center rounded-full bg-white text-gray-900 shadow hover:bg-white"
      >
        <X size={28} />
      </ButtonCustom>

      <p className="select-none text-center text-sm text-white/50">Like or swipe</p>

      <ButtonCustom
        aria-label="Like"
        onClick={onLike}
        className="grid h-14 max-h-14 max-w-14 place-items-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
      >
        <Heart size={28} />
      </ButtonCustom>
    </div>
  );
}
