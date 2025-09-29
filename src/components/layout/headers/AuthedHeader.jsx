import { NavLink, Link } from "react-router-dom";
import { Logo } from "@/components/branding/Logo";
import { BrandName } from "@/components/branding/BrandName";
import ProfileMenu from "/src/components/ui/ProfileMenu";
import { MessageButton } from "/src/components/ui/ButtonCustom";
import clsx from "clsx";
import { useUI } from "/src/hooks/useUI";
import { useState } from "react";
import { X, LogOut } from "lucide-react";
import { NotificationsPopUp } from "/src/components/ui/NotificationsPopUp";
import { NOTIFICATIONS } from "@/constants";
import { Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MOBILE_LINKS = [
  { to: "/chats", text: "Messages" },
  { to: "/profile/me", text: "My Profile" },
  { to: "/settings", text: "Settings" },
];

export const AuthedHeader = ({ links }) => {
  const {
    openLogOut,
    openNotifications,
    isNotificationsPopUpOpen,
    closeNotifications,
  } = useUI();
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);

  const navItem = ({ isActive }) =>
    clsx(
      "rounded-full py-2 font-medium",
      isActive
        ? `text-primary relative inline-block
         after:content-[''] after:block after:w-1/2 after:h-[1px]
         after:bg-current`
        : "text-primary-text"
    );
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent md:py-2.5">
      <div className="md:mx-auto max-w-7xl md:px-4 sm:px-6">
        <div className="md:rounded-full backdrop-blur-[10px] bg-white shadow ring-1 ring-black/5">
          <nav className="h-18 md:h-16 px-4 sm:px-6 lg:px-8 lg:pr-2.5 flex flex-row md:grid grid-cols-3 place-items-center justify-between">
            <ul className="hidden md:flex items-center gap-2 lg:gap-6">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={navItem}>
                    {l.text}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Logo />
              <BrandName />
            </Link>
            <div className="hidden md:flex items-center justify-self-end lg:pr-5">
              <NotificationsPopUp
                open={isNotificationsPopUpOpen}
                onOpenChange={(o) =>
                  o ? openNotifications() : closeNotifications()
                }
              >
                <MessageButton
                  unread={2}
                  aria-haspopup="dialog"
                  className="w-min"
                />
              </NotificationsPopUp>
              <span
                role="separator"
                aria-orientation="vertical"
                className={`h-8 w-px bg-black/10 mx-5`}
              />
              <ProfileMenu onLogout={openLogOut} />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-primary-text"
            >
              {isOpen ? (
                <X size={32} />
              ) : (
                <svg
                  width="32"
                  height="9"
                  viewBox="0 0 32 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="1.25"
                    x2="32"
                    y2="1.25"
                    stroke="#121212"
                    stroke-width="1.5"
                  />
                  <line
                    y1="8.25"
                    x2="32"
                    y2="8.25"
                    stroke="#121212"
                    stroke-width="1.5"
                  />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col">
          {showMobileNotifications ? (
            <AnimatePresence>
              <motion.div
                key="mobile-notifs"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "slide", stiffness: 300, damping: 28 }}
                className="fixed inset-0 bg-white flex flex-col"
              >
                <div className="flex items-center justify-between p-5 border-b border-primary-text/10">
                  <h2 className="text-[28px]">My Notifications</h2>
                  <button onClick={() => setShowMobileNotifications(false)}>
                    <X size={28} />
                  </button>
                </div>

                <div className="px-5 py-6 overflow-y-auto">
                  <ul className="space-y-6">
                    {NOTIFICATIONS.map((n) => (
                      <li
                        key={n.id}
                        className="grid grid-cols-[auto_1fr] items-start gap-3"
                      >
                        <div className="flex flex-row gap-3 items-center">
                          {n.unread && (
                            <span
                              className={clsx(
                                "h-2.5 w-2.5 rounded-full bg-primary"
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
                                <span className="text-red-500">❤️</span>
                              </>
                            )}
                          </p>
                          <p className="text-sm text-fade-text">{n.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="py-6">
                    <button className="block mx-auto text-primary-text underline">
                      Mark all as read
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <div className="flex items-center justify-between px-4 py-5 border-b border-primary-text/10">
                <Link to="/" className="flex items-center gap-2">
                  <Logo />
                  <BrandName />
                </Link>
                <button onClick={() => setIsOpen(false)}>
                  <X size={32} />
                </button>
              </div>

              <ul className="flex flex-col gap-6 flex-1 px-5 py-6">
                {[...links, ...MOBILE_LINKS].map((nl) => (
                  <li key={nl.to}>
                    {nl.to === "/chats" ? (
                      <button
                        onClick={() => setShowMobileNotifications(true)}
                        className="inline-block text-[22px] font-medium text-primary-text"
                      >
                        {nl.text}
                      </button>
                    ) : (
                      <NavLink
                        to={nl.to}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          clsx(
                            "inline-block text-[22px] font-medium shrink-0",
                            isActive
                              ? "text-primary relative after:block after:w-1/2 after:h-[1px] after:bg-primary after:mt-1"
                              : "text-primary-text"
                          )
                        }
                      >
                        {nl.text}
                      </NavLink>
                    )}
                  </li>
                ))}
                <li>
                  <button
                    onClick={openLogOut}
                    className="flex items-center gap-1 text-[22px] text-primary font-medium"
                  >
                    <LogOut size={24} />
                    Log Out
                  </button>
                </li>
              </ul>

              <div className="border-t border-black/10 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={"/pictures/avatar.jpg"}
                    alt={"Peter Parker"}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-[22px] text-primary-text">
                      Peter Parker
                    </p>
                    <p className="text-primary-text">27 y.o</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
