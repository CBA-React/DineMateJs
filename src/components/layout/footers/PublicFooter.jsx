import { FootLink } from "/src/components/ui/FootLink";
import { Link } from "react-router-dom";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { FOOTER_SECTIONS } from "/src/constants";

const PublicFooter = () => {
    return (
        <footer className="py-6">
            <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-8 md:pt-14 md:pb-10">
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-[7px] md:gap-x-[137px] grid-flow-col grid-rows-2 md:grid-rows-1 gap-y-0 md:gap-y-8">
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

        <div className="mt-6 md:mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6">
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