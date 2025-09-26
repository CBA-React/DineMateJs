import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const ButtonCustom = ({className, children, onClick, type = "button", ...props}) => {
    return (
        <button 
            type={type}
            className={clsx("cursor-pointer w-full gap-1.5 flex flex-row", className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export const MessageButton = ({
    to = "/chats",
    unread = 0,
    className = "",
  }) => {
    return (
      <Link
        to={to}
        aria-label={unread ? `${unread} unread messages` : "Messages"}
        className={clsx(`relative inline-flex h-6 w-6 items-center justify-center 
                    rounded-full text-gray-900 hover:bg-gray-100 transition-colors`, className)}
      >
        <MessageCircle size={24} strokeWidth={2} />
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-0.5 min-w-4 h-4 px-1 rounded-full
                       bg-primary text-white text-xs font-semibold leading-none
                       flex items-center justify-center shadow"
          >
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </Link>
    );
  }