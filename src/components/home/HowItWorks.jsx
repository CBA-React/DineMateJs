import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Link } from 'react-router-dom';
import { STEPS_INFO } from "/src/constants";

const HowItWorksIntro = () => {
    const INTRO_TEXT = {
        sectionName: "How it works",
        title1: "Simple Steps to",
        title2: "Your Next Dinner",
        paragraphText: "Find your perfect dinner companions in 3 simple steps."
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-3">
                <span className="text-sm uppercase text-fade-text">{INTRO_TEXT.sectionName}</span>
                <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                    <span className="text-transparent">{INTRO_TEXT.title1}</span><br/>
                    <span className="text-transparent">{INTRO_TEXT.title2}</span>
                </h2>
                <p className="text-[20px]">{INTRO_TEXT.paragraphText}</p>
            </div>
            <Link className="self-end" to="/register">
                <SubmitButton className="lg:max-w-[154px] h-fit px-5 py-2.5" text="Get Started" withIcon />
            </Link>
        </div>
    )
}

const HowItWorksSteps = () => {
    return (
        <div className="grid grid-cols-3 gap-6">
            {STEPS_INFO.map((step) => 
                <StepCard key={step.cardName} cardNumber={step.cardNumber} cardName={step.cardName} cardDescription={step.cardDescription} cardImage={step.cardImage} cardImageAlt={step.cardImageAlt}/>
            )}
        </div>
    )
}

const StepCard = ({cardNumber, cardName, cardDescription, cardImage, cardImageAlt=""}) => {
    return (
        <div className="flex flex-col text-primary-text">
            <span className="lg:mb-3 text-fade-text">{`(${cardNumber})`}</span>
            <h3 className="lg:mb-1.5 lg:text-[28px]">{cardName}</h3>
            <p className="lg:mb-6">{cardDescription}</p>
            <img className="rounded-[10px]" src={cardImage} alt={cardImageAlt} />
        </div>
    )
}

export const HowItWorks = () => {
    return (
        <div id="how-it-works" className="flex flex-col gap-16 mx-auto max-w-7xl my-[120px]">
            <HowItWorksIntro />
            <HowItWorksSteps />
        </div>
    )
}