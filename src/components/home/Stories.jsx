import {SubmitButton } from "/src/components/ui/SubmitButton";
import {SOCIAL_CARDS} from "/src/constants";
import { PhotoCard } from "./Stories/PhotoCard";
import { QuoteCard } from "./Stories/QuoteCard";

export const Stories = () => {
    const INTRO_TEXT = {
        sectionName: "Stories",
        title: "Loved by Our Community",
        paragraphText: "Real experiences from people who found new friends and great dinners with us."
    }

    return (
        <div className="mx-auto max-w-7xl my-[120px]" id="stories">
            <div className="flex flex-row justify-between mb-16">
                <div className="flex flex-col gap-3 lg:max-w-[560px]">
                    <span className="text-sm uppercase text-fade-text">{INTRO_TEXT.sectionName}</span>
                    <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                        <span className="text-transparent">{INTRO_TEXT.title}</span>
                    </h2>
                    <p className="text-[20px]">{INTRO_TEXT.paragraphText}</p>
                </div>
                <SubmitButton className="lg:max-w-[205px] h-fit self-end bg-secondary" text="See more reviews" withIcon />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {SOCIAL_CARDS.map((it, i) => (
                <div key={i} className="mb-6 break-inside-avoid">
                    {it.type === 'photo' ? <PhotoCard {...it} /> : <QuoteCard {...it} />}
                </div>
                ))}
            </div>
        </div>
    )
}

