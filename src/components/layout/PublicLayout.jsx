import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppShell from "./AppShell";
import { PublicHeader } from "./headers/PublicHeader";
import PublicFooter from "./footers/PublicFooter";

const OFFSET = 88; 

const PUBLIC_LINKS = [
  { to: "/#why-us", text: "Why Us" },
  { to: "/#how-it-works", text: "How it works" },
  { to: "/#restaurants", text: "Restaurants" },
  { to: "/#stories", text: "Stories" },
];

function ScrollToHash({ offset = OFFSET }) {
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

export default function PublicLayout() {
  return (
    <>
      <ScrollToHash offset={OFFSET} />
      <AppShell header={<PublicHeader links={PUBLIC_LINKS} />} footer={<PublicFooter />}>
        <Outlet />
      </AppShell>
    </>
  );
}
