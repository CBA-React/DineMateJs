import { NavLink, Link } from "react-router-dom";
import { Logo } from "/src/components/branding/Logo";
import { BrandName } from "/src/components/branding/BrandName";
import { Button } from "/src/components/ui/Button";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { useState } from "react";
import { X } from "lucide-react"
import clsx from "clsx";

export const PublicHeader = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItem = () =>
    clsx("rounded-full py-2 font-medium text-primary-text");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent md:py-2.5">
      <div className="md:mx-auto max-w-7xl md:px-4 sm:px-6">
        <div className="md:rounded-full backdrop-blur-[10px] bg-white shadow ring-1 ring-black/5">
          <nav className="h-18 md:h-16 px-5 md:px-4 sm:px-6 lg:px-8 lg:pr-2.5 flex flex-row md:grid grid-cols-3 place-items-center justify-between">
            <ul className="hidden md:flex items-center gap-2 lg:gap-6">
              {links.map((nl) => (
                <li key={nl.to}>
                  <NavLink to={nl.to} className={navItem}>
                    {nl.text}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Logo />
              <BrandName />
            </Link>

            <div className="hidden md:flex items-center gap-5 sm:gap-4 justify-self-end">
              <NavLink to="/login">
                <Button className="transition-all hover:-translate-y-0.5 duration-300">
                  <span>Sign In</span>
                </Button>
              </NavLink>
              <NavLink to="/register">
                <SubmitButton
                  className="bg-secondary rounded-full lg:px-5 lg:py-2.5"
                  withIcon
                  text="Get Started"
                />
              </NavLink>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-primary-text"
            >
              {isOpen ? <X size={32} /> : <svg width="32" height="9" viewBox="0 0 32 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1.25" x2="32" y2="1.25" stroke="#121212" stroke-width="1.5"/>
                <line y1="8.25" x2="32" y2="8.25" stroke="#121212" stroke-width="1.5"/>
                </svg>
                }
            </button>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col p-5">
          <div className="flex items-center justify-between mb-5">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <BrandName />
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
          </div>

          <hr className="absolute w-full top-18 left-0 h-[1px] text-primary-text/10" />

          <ul className="flex flex-col gap-5 flex-1 py-10">
            {links.map((nl) => (
              <li key={nl.to}>
                <NavLink
                  to={nl.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-primary-text text-[22px]"
                >
                  {nl.text}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-5">
            <NavLink to="/register" onClick={() => setIsOpen(false)}>
              <SubmitButton
                className="w-full bg-secondary rounded-full py-3"
                withIcon
                text="Get Started"
              />
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-center text-primary-text font-medium"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
