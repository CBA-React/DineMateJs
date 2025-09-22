import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Link } from 'react-router-dom';

export const FooterCTA = () => {
    const TEXT = {
        title: "Your next dinner date is just one click away",
        button: "Sign up for free"
    }

    return (
        <div className="relative h-[800px] md:h-screen">
            <img src="pictures/girl-group.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="pointer-events-none absolute inset-0
                  bg-[linear-gradient(180deg,#121212_0%,rgba(18,18,18,0)_100%)]" />
            <img className="absolute h-[160px] lg:h-auto object-cover lg:-bottom-10 -bottom-6 md:-bottom-0 w-full rounded-t-[30px] md:rounded-t-0" src="/footer-logo.svg" alt="footer-logo" />
            <div className="relative mx-auto max-w-7xl px-6 py-24 text-center w-full items-center flex justify-center text-white">
                <div className="absolute top-[129px] md:top-[142px] flex flex-col gap-6 items-center">
                    <h2 id="prefooter-cta" className="font-serif text-[65px] md:text-[88px] lg:mb-6 lg:max-w-[960px]">
                        {TEXT.title}
                    </h2>
                    <Link to="/register">
                        <SubmitButton className="lg:max-w-[184px] py-2.5 px-5" text={TEXT.button} withIcon />
                    </Link>
                </div>
            </div>
        </div>
    )
}