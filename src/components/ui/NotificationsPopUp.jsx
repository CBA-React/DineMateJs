import clsx from "clsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { NOTIFICATIONS } from "@/constants";
import { Link } from "react-router-dom";
import { Calendar, Heart } from "lucide-react";

export const NotificationsPopUp = ({
  open,
  onOpenChange,
  onMarkAllRead,
  children,
}) => {
  const items = NOTIFICATIONS;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="md:w-[360px] p-0 rounded-[10px] shadow-xl border border-black/5 z-50 bg-white mt-4"
      >
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px]">My Notifications</h3>
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-sm underline text-primary-text hover:opacity-80 cursor-pointer"
            >
              Mark all as read
            </button>
          </div>
          <div className="mt-4 h-px bg-primary-text/10" />
        </div>

        <ul className="px-5 pb-5 space-y-6">
          {items.map((n) => (
            <li
              key={n.id}
              className="grid grid-cols-[auto_1fr] items-start gap-3"
            >
              <div className="flex flex-row items-center gap-3">
                {n.unread && (
                  <span
                    className={clsx(
                      "mt-3 h-2.5 w-2.5 rounded-full",
                      n.unread ? "bg-primary" : "bg-transparent"
                    )}
                  />
                )}

                <div className="mt-1">
                  {n.kind === "event" ? (
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                  ) : (
                    <img
                      src={n.avatar}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div>
                <p className="text-primary-text">
                  {n.kind === "message" && (
                    <>
                      You received a new message from{" "}
                      <Link
                        to={n.profileTo}
                        className="text-secondary font-semibold hover:underline"
                      >
                        {n.name}
                      </Link>
                    </>
                  )}

                  {n.kind === "event" && (
                    <>
                      <Link
                        to={n.eventTo}
                        className="text-secondary font-semibold hover:underline"
                      >
                        {n.title}
                      </Link>{" "}
                      {n.suffix}
                    </>
                  )}

                  {n.kind === "match" && (
                    <>
                      <Link
                        to={n.profileTo}
                        className="text-secondary font-semibold hover:underline"
                      >
                        {n.name}
                      </Link>{" "}
                      matched you!{" "}
                      <Heart className="inline-block h-4 w-4 text-red-500 fill-red-500 align-middle" />
                    </>
                  )}
                </p>
                <p className="text-sm text-fade-text mt-1">{n.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
