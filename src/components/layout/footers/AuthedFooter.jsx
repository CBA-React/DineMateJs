import { FootLink } from "/src/components/ui/FootLink";
import { FOOTER_SECTIONS_EXTENDED, FOOTER_SECTIONS } from "/src/constants";
import { useIsMobile } from "/src/hooks/useIsMobile";

const AuthedFooter = () => {
    const isMobile = useIsMobile();

    return (
        <footer className="py-6">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6 md:pt-14 md:pb-10">
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-x-[7px] md:gap-x-[137px] gap-y-7 md:gap-y-8">
          {!isMobile ? (
          FOOTER_SECTIONS_EXTENDED.map((section) => (
            <ul key={section.id} className="flex flex-col gap-3 w-max">
              {section.items.map((it) => (
                <li key={it.label}>
                  <FootLink href={it.href} external={it.external}>
                    {it.label}
                  </FootLink>
                </li>
              ))}
            </ul>
          )) ) : (
            FOOTER_SECTIONS.map((section) => (
              <ul key={section.id} className="flex flex-col gap-3 w-max">
                {section.items.map((it) => (
                  <li key={it.label}>
                    <FootLink href={it.href} external={it.external}>
                      {it.label}
                    </FootLink>
                  </li>
                ))}
              </ul>
            ))
          )}
        </div>

        <div className="mt-6 md:mt-14 flex items-center justify-between gap-6">
          <div>
            <h4 className="text-[22px] text-primary-text">Connect. Dine. Enjoy.</h4>
            <p className="text-sm text-[#71717A] mt-1.5">2025 DINEMITE, Inc. All Rights Reserved</p>
          </div>
        </div>
        </div>
      </footer>
    )
}

export default AuthedFooter;