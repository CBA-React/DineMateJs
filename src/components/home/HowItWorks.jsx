import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Link } from 'react-router-dom';
import { STEPS_INFO } from "/src/constants";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';

const HowItWorksIntro = () => {
    const INTRO_TEXT = {
        sectionName: "How it works",
        title1: "Simple Steps to",
        title2: "Your Next Dinner",
        paragraphText: "Find your perfect dinner companions in 3 simple steps."
    }

    return (
        <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col gap-1.5 md:gap-3">
                <span className="text-sm uppercase text-fade-text">{INTRO_TEXT.sectionName}</span>
                <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                    <span className="text-transparent">{INTRO_TEXT.title1}</span><br/>
                    <span className="text-transparent">{INTRO_TEXT.title2}</span>
                </h2>
                <p className="md:text-[20px] pt-1.5">{INTRO_TEXT.paragraphText}</p>
            </div>
            <Link className="self-end hidden md:block" to="/register">
                <SubmitButton className="lg:max-w-[154px] h-fit px-5 py-2.5" text="Get Started" withIcon />
            </Link>
        </div>
    )
}

const HowItWorksSteps = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null)

    const onSwiper = (swiper) => {
        setSwiperInstance(swiper)
    
        setTimeout(() => {
          if (swiper.navigation) {
            swiper.navigation.prevEl = prevRef.current
            swiper.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }
    
          if (swiper.pagination && paginationRef.current) {
            swiper.pagination.el = paginationRef.current
            swiper.pagination.init()
            swiper.pagination.render()
            swiper.pagination.update()
          }
        }, 100)
    }

    const handlePrevClick = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };

    return (
        <>
            <div className="block md:hidden">
                <div className="relative w-full">
                    <Swiper
                        className="overflow-hidden restaurant-swiper"
                        modules={[Navigation, Pagination, A11y]}
                        onSwiper={onSwiper}
                        navigation={false}
                        loop={false}
                        speed={1000}
                        pagination={{
                            el: paginationRef.current,
                            clickable: true,
                            bulletClass: "swiper-pagination-bullet-custom",
                            bulletActiveClass: "swiper-pagination-bullet-active-custom",
                        }}
                        spaceBetween={24}
                        slidesPerView={1}
                        centeredSlides={true}
                        breakpoints={{
                            640: { slidesPerView: 1, centeredSlides: true, spaceBetween: 16 },
                        }}
                        a11y={{ enabled: true }}
                    >
                        {STEPS_INFO.map((step) => (
                            <SwiperSlide key={step.cardNumber} className="!h-auto">
                                <StepCard 
                                    cardNumber={step.cardNumber}
                                    cardName={step.cardName}
                                    cardDescription={step.cardDescription}
                                    cardImage={step.cardImage}
                                    cardImageAlt={step.cardImageAlt}
                                    isMobile={true}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-6 md:mt-12 flex items-center justify-between gap-4">
                        <button
                            ref={prevRef}
                            className="swiper-button-prev-custom min-h-11 min-w-11 md:min-h-8 md:min-w-8 cursor-pointer rounded-full bg-gray-900/5 shadow-sm hover:bg-gray-900/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            aria-label="Previous slide"
                            onClick={handlePrevClick}
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-900" />
                        </button>

                        <div ref={paginationRef} className="swiper-pagination-custom max-w-min min-h-11 md:min-h-auto flex items-center px-5 py-4 rounded-full gap-2 bg-gray-900/5" />

                        <button
                            ref={nextRef}
                            className="swiper-button-next-custom min-h-11 min-w-11 md:min-h-8 md:min-w-8 cursor-pointer rounded-full bg-gray-900/5 shadow-sm hover:bg-gray-900/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            aria-label="Next slide"
                            onClick={handleNextClick}
                        >
                            <ChevronRight className="h-4 w-4 text-gray-900" />
                        </button>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <SubmitButton className="w-full max-w-xs px-6 py-3" text="Get Started" withIcon />
                    </div>
                </div>
            </div>

            <div className="hidden md:grid grid-cols-3 gap-6">
                {STEPS_INFO.map((step) => 
                    <StepCard 
                        key={step.cardName} 
                        cardNumber={step.cardNumber} 
                        cardName={step.cardName} 
                        cardDescription={step.cardDescription} 
                        cardImage={step.cardImage} 
                        cardImageAlt={step.cardImageAlt}
                        isMobile={false}
                    />
                )}
            </div>
        </>
    )
}

const StepCard = ({cardNumber, cardName, cardDescription, cardImage, cardImageAlt=""}) => {
    return (
        <div className="flex flex-col text-primary-text">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-3 mb-1 md:mb-0">
                <span className="text-sm text-fade-text">{`(${cardNumber})`}</span>
                <h3 className="lg:mb-1.5 text-[22px]  lg:text-[28px]">{cardName}</h3>
            </div>
            <p className="mb-4 lg:mb-6">{cardDescription}</p>
            <img className="rounded-[10px]" src={cardImage} alt={cardImageAlt} />
        </div>
    )
}

export const HowItWorks = () => {
    return (
        <div id="how-it-works" className="flex flex-col gap-7 md:gap-16 px-5 mx-auto max-w-7xl my-15 md:my-[120px]">
            <HowItWorksIntro />
            <HowItWorksSteps />
        </div>
    )
}