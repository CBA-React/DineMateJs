import { NavLink, Link } from "react-router-dom";
import { Logo } from "/src/components/branding/Logo";
import { BrandName } from "/src/components/branding/BrandName";
import { Button } from "/src/components/ui/Button";
import { SubmitButton } from "/src/components/ui/SubmitButton";

export const PublicHeader = ({ links }) => {
  const navItem = ({ isActive }) =>
    `rounded-full py-2 font-medium ${isActive ? "text-primary-text/15" : "text-primary-text"}`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-transparent py-2.5`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-full backdrop-blur-[10px] bg-white shadow ring-1 ring-black/5">
            <nav className="h-16 px-4 sm:px-6 lg:px-8 lg:pr-2.5 grid grid-cols-3 place-items-center">
              <ul className="hidden md:flex items-center gap-2 lg:gap-6">
                {
                  links.map((nl) => <li><NavLink to={nl.to} className={navItem}>{nl.text}</NavLink></li>)
                }
              </ul>

              <Link to="/" className="flex items-center gap-2 shrink-0">
                <Logo /><BrandName />
              </Link>

              <div className="flex items-center gap-5 sm:gap-4 justify-self-end">
                <NavLink to="/login">
                  <Button className="transition-all hover:-translate-y-0.5 duration-300">
                      <span>Sign In</span>
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <SubmitButton className="bg-secondary rounded-full lg:px-5 lg:py-2.5" withIcon text="Get Started" />
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </header>
  );
}
