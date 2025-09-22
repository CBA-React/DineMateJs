import {SubmitButton } from "/src/components/ui/SubmitButton";
import {SOCIAL_CARDS} from "/src/constants";
import { PhotoCard } from "./Stories/PhotoCard";
import { QuoteCard } from "./Stories/QuoteCard";
import { useIsMobile } from "/src/hooks/useIsMobile";

const SOCIAL_CARDS_MOBILE = [
    { type: 'photo', image: 'pictures/happy-woman-eating.jpg'},
    {
      type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=200&auto=format&fit=crop',
      name: 'Anna K, 32',
      meta: '2.4M followers on Youtube',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!',
    },
    { type: 'photo', image: 'pictures/two-gay-love.jpg' },
    { type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      name: '@mytechceo',
      meta: '254k followers',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!',
    },
    {
      type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop',
      name: 'Anna K, 32',
      meta: '2.4M followers on Youtube',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!',
    },
    { type: 'photo', image: 'pictures/front-view-smiley-people-with-drinks.jpg' },
    {
      type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      name: 'Anna K, 32',
      meta: '2.4M followers on YouTube',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!'
    },
    { type: 'photo', image: 'pictures/group-of-old-people-talking.jpg' },
]


export const Stories = () => {
    const INTRO_TEXT = {
        sectionName: "Stories",
        title: "Loved by Our Community",
        paragraphText: "Real experiences from people who found new friends and great dinners with us."
    }

    const isMobile = useIsMobile();

    return (
        <div className="mx-auto max-w-7xl px-5 my-[60px] md:my-[120px] rounded-b-[30px]" id="stories">
            <div className="flex flex-col md:flex-row justify-between mb-12 md:mb-16 gap-5">
                <div className="flex flex-col gap-3 lg:max-w-[560px]">
                    <span className="text-sm uppercase text-fade-text">{INTRO_TEXT.sectionName}</span>
                    <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                        <span className="text-transparent">{INTRO_TEXT.title}</span>
                    </h2>
                    <p className="md:text-[20px]">{INTRO_TEXT.paragraphText}</p>
                </div>
                <SubmitButton className="lg:max-w-[205px] h-fit self-end bg-secondary" text="See more reviews" withIcon />
            </div>

            <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-6">
                {isMobile ? (
                    SOCIAL_CARDS_MOBILE.map((it, i) => (
                <div key={i} className="mb-3 md:mb-6 break-inside-avoid">
                    {it.type === 'photo' ? <PhotoCard {...it} /> : <QuoteCard {...it} />}
                </div>
                )) ) : (
                    SOCIAL_CARDS.map((it, i) => (
                        <div key={i} className="mb-3 md:mb-6 break-inside-avoid">
                            {it.type === 'photo' ? <PhotoCard {...it} /> : <QuoteCard {...it} />}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

