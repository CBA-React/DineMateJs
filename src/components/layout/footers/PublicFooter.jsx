import { FootLink } from "/src/components/ui/FootLink";
import { Link } from "react-router-dom";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { FOOTER_SECTIONS } from "/src/constants";

const PublicFooter = () => {
    return (
        <footer className="py-6">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-14 pb-10">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[137px] gap-y-8">
          {FOOTER_SECTIONS.map((section) => (
            <ul key={section.id} className="flex flex-col gap-3 w-max">
              {section.items.map((it) => (
                <li key={it.label}>
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
    )
}

export default PublicFooter;