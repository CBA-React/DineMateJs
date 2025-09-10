import { NavLink, Link } from "react-router-dom";
import { Logo } from "@/components/branding/Logo";
import { BrandName } from "@/components/branding/BrandName";
import ProfileMenu from "/src/components/ui/ProfileMenu";
import { MessageButton } from "/src/components/ui/Button";
import clsx from "clsx";
import { useAuth } from '/src/hooks/useAuth';

export const AuthedHeader = ({ links }) => {
  const {logoutUser} = useAuth();

  const navItem = ({ isActive }) =>
    clsx("rounded-full py-2 font-medium", isActive ? `text-primary relative inline-block
         after:content-[''] after:block after:w-1/2 after:h-[1px]
         after:bg-current` : "text-primary-text");
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent py-2.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-full backdrop-blur-[10px] bg-white shadow ring-1 ring-black/5">
          <nav className="h-16 px-4 sm:px-6 lg:px-8 lg:pr-2.5 grid grid-cols-3 place-items-center">
            <ul className="hidden md:flex items-center gap-2 lg:gap-6">
              {links.map(l => (
                <li key={l.to}><NavLink to={l.to} className={navItem}>{l.text}</NavLink></li>
              ))}
            </ul>
            <Link to="/" className="flex items-center gap-2 shrink-0"><Logo /><BrandName /></Link>
            <div className="flex items-center justify-self-end lg:pr-5">
              <MessageButton unread={2} />
              <span
                role="separator"
                aria-orientation="vertical"
                className={`h-8 w-px bg-black/10 mx-5`}
                />
              <ProfileMenu onLogout={logoutUser}  />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
