import clsx from "clsx";
import { CheckCheck, Check } from "lucide-react";

export const Message = ({ me, msg }) => {
    const isMine = msg.authorId === "me";
    return (
      <div className={clsx("flex", isMine ? "justify-end" : "justify-start")}> 
        <div
          className={clsx(
            "max-w-[70%] rounded-[10px] px-3 py-1",
            isMine
              ? "bg-[#FFEDEE] text-[#011627] rounded-br-md"
              : "bg-white text-[#011627]"
          )}
        >
          <div>{msg.text}</div>
          <div className="justify-end w-full flex gap-1">
              <p className="text-xs">{msg.ts}</p>
              {isMine && (
                msg.status === "seen" ? (
                <CheckCheck className="text-primary" size={14} />
                ) : (
                <Check size={14} />
                )
            )}
          </div>
        </div>
      </div>
    );
  }