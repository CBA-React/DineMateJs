import { Outlet, NavLink, Link } from "react-router-dom";
import { Logo } from "/src/components/branding/Logo";
import { BrandName } from "/src/components/branding/BrandName";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Button } from "/src/components/ui/Button";
import { FootLink } from "/src/components/ui/FootLink";
import { FOOTER_SECTIONS } from "/src/constants";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NAV_LINKS = [
  {to: "/#why-us", text: "Why Us"},
  {to: "/#how-it-works", text: "How it works"},
  {to: "/#restaurants", text: "Restaurants"},
  {to: "/#stories", text: "Stories"},
]

const OFFSET = 88;

const PublicLayout = () => {
  const navItem = () =>
    `rounded-full py-2 font-medium`;

  function ScrollToHash({ offset = 88 }) { 
    const { hash, pathname } = useLocation();
  
    useEffect(() => {
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
  
      requestAnimationFrame(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    }, [hash, pathname, offset]);
  
    return null;
  }

  return (
    <>
      <ScrollToHash offset={OFFSET} />
      <header className={`fixed inset-x-0 top-0 z-50 bg-transparent py-2.5`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-full backdrop-blur-[10px] bg-white shadow ring-1 ring-black/5">
            <nav className="h-16 px-4 sm:px-6 lg:px-8 lg:pr-2.5 grid grid-cols-3 place-items-center">
              <ul className="hidden md:flex items-center gap-2 lg:gap-6">
                {
                  NAV_LINKS.map((nl) => <li key={`${nl.text}-navlivk`}><NavLink to={nl.to} className={navItem}>{nl.text}</NavLink></li>)
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

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-14 pb-10">

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          {FOOTER_SECTIONS.map((section) => (
            <ul key={`${section.id}-footer`}className="flex flex-col gap-5">
              {section.items.map((it) => (
                <li key={`${it.label}-footer-label`}>
                  <FootLink href={it.href} external={it.external}>
                    {it.label}
                  </FootLink>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between gap-6">
          <div>
            <h4 className="text-[22px] text-primary-text">Connect. Dine. Enjoy.</h4>
            <p className="text-sm text-[#71717A] mt-1.5">2025 DINEMITE, Inc. All Rights Reserved</p>
          </div>
          <Link to="register">
              <SubmitButton text="Join Now" className="bg-gradient-to-r from-primary to-accent lg:max-w-[135px] py-2.5 px-5" withIcon />
          </Link>
        </div>
      </div>
      </footer>
    </>
  );
};

export default PublicLayout;
