import { useState } from "react";
import { SendHorizonal, Smile } from "lucide-react";
import { Button } from "/src/components/ui/Button";
import { EmojiPicker } from "/src/components/ui/EmojiPicker";
import { useIsMobile } from "/src/hooks/useIsMobile";

export const MessageInput = ({ onSend }) => {
    const [value, setValue] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const isMobile = useIsMobile();
    const submit = () => {
      const v = value.trim();
      if (!v) return;
      onSend(v);
      setValue("");
    };
  
    return (
      <div className="px-6 pb-6 relative">
        <div className="flex items-center gap-4 bg-white rounded-[10px] p-4 relative">
          <Button 
          className="max-w-min text-fade-text"
            onClick={() => setShowEmoji((s) => !s)}
            aria-label="Emoji picker"
            >
            <Smile size={24} />
          </Button>
           {showEmoji && <EmojiPicker className={`${ !isMobile ? "bottom-14" : "top-full"} left-0`} onPick={(emoji) => setValue(value + emoji)} />}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Message"
            className="flex-1 outline-none text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <Button
            onClick={submit}
            className="inline-flex absolute right-4 items-center rounded-lg p-1 text-primary max-w-min active:translate-y-[1px]"
          >
            <SendHorizonal strokeWidth={0.8} color="white" fill="#E52421" size={24} />
          </Button>
        </div>
      </div>
    );
  }