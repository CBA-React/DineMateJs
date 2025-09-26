import { Link } from "react-router-dom";
import { SubmitButton } from '/src/components/ui/SubmitButton';
import { ButtonCustom } from "/src/components/ui/ButtonCustom"

const HERO_TEXT = {
  title: "Meet. Dine. Connect.",
  subtitle: "The easiest way to meet new people over great food."
}

export const HeroSection = ({
  image = "/pictures/couple-drinking.jpg",  
  alt = "couple-happy-drinking",
}) => {
  return (
    <section className="relative">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-primary-text/35 z-10" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 mt-18 md:mt-0">
        <div className="min-h-[647px] md:min-h-[75svh] lg:min-h-[850px] flex items-end justify-center pb-[100px]">
          <div className="max-w-4xl text-white">
            <h1 className="font-serif font-medium tracking-tight leading-tight text-[65px] md:text-[88px] text-center max-w-[335px] md:max-w-none">
              <span className="block">{HERO_TEXT.title}</span>
            </h1>

            <p className="mt-2 text-[20px] text-white max-w-[1000px] text-center">
              {HERO_TEXT.subtitle}
            </p>

            <div className="mt-6 px-[42px] md:px-0 flex-col md:flex-row flex flex-wrap justify-center items-stretch md:items-center gap-3">
              <Link
                to="/register"
              >
                <SubmitButton text="Join now" withIcon className="px-5 py-2.5 text-base font-medium w-full" />
              </Link>

              <Link
                to="/#how-it-works"
              >
                <ButtonCustom>
                  <span className="border-white border-[1px] px-5 py-2.5 w-full md:w-auto rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-md duration-300">See how it works</span>
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
