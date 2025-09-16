import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import clsx from "clsx";

export const EmojiPicker = ({ onPick, onClose, className }) => {
  return (
    <div className={clsx("absolute bottom-0 z-50", className)}>
      <Picker onClickOutside={(e) => onClose?.()} data={data} onEmojiSelect={(e) => { onPick(e.native); onClose?.(); }} />
    </div>
  );
}
