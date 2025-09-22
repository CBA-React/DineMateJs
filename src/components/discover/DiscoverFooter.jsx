import { Button } from "/src/components/ui/Button";
import { X, Heart } from "lucide-react";

export const DiscoverCardFooter = ({ onPass = () => {}, onLike = () => {} }) => {
  return (
    <div className="pointer-events-auto mt-4 flex items-center justify-between">
      <Button
        aria-label="Pass"
        onClick={onPass}
        className="grid h-14 max-h-14 max-w-14 place-items-center rounded-full bg-white text-gray-900 shadow hover:bg-white"
      >
        <X size={28} />
      </Button>

      <p className="select-none text-center text-sm text-white/50">Like or swipe</p>

      <Button
        aria-label="Like"
        onClick={onLike}
        className="grid h-14 max-h-14 max-w-14 place-items-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
      >
        <Heart size={28} />
      </Button>
    </div>
  );
}
