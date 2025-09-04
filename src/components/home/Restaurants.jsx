import { RestaurantCarousel } from "./RestaurantCarousel";
import { RESTAURANTS } from "/src/constants";

export const Restaurants = () => {
    const INTRO_TEXT = {
        sectionName: "Restaurants",
        title1: "Discover Our",
        title2: "Partner Restaurants",
        paragraphText: "Explore a curated selection of top dining spots that bring flavor and atmosphere to your evening."
    }

    return (
        <div className="relative w-full py-[120px]" id="restaurants">
        <div 
                className="absolute inset-0 w-full h-full -z-1"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 68%, 50% 50%, 0 68%)'
                }}
            />

        <div className="flex flex-col gap-16 mx-auto max-w-7xl items-center">
            <div className="flex flex-col gap-3 items-center lg:max-w-[560px]">
                <span className="text-sm uppercase text-fade-text">{INTRO_TEXT.sectionName}</span>
                <h2 className="font-serif font-medium text-center text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                    <span className="text-transparent">{INTRO_TEXT.title1}</span><br/>
                    <span className="text-transparent">{INTRO_TEXT.title2}</span>
                </h2>
                <p className="text-[20px] text-center">{INTRO_TEXT.paragraphText}</p>
            </div>
            <RestaurantCarousel items={RESTAURANTS} />
        </div>
        </div>
    )
}