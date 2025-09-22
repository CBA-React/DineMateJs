import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { EventCard } from "./EventCard";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { useRef, useState } from "react";

export const EventsCarousel = ({ events, onRegister }) => {
  const isMobile = useIsMobile();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handlePrevClick = () => swiperInstance?.slidePrev();
  const handleNextClick = () => swiperInstance?.slideNext();

  return (
    <div className="events-swiper relative w-full">
      <Swiper
        key={isMobile ? "mobile" : "desktop"}   
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation={!isMobile}
        pagination={
          isMobile
            ? {
                clickable: true,
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
                el: paginationRef.current,      
              }
            : false
        }
        autoplay={{delay: 10000, disableOnInteraction: false}}
        loop
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          if (swiper.params.pagination && isMobile) {
            swiper.params.pagination.el = paginationRef.current;
          }
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          if (isMobile && swiper.pagination) {
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }
          if (swiper.navigation) {
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        observer           
        observeParents
        className="w-full"
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            <EventCard ev={ev} onRegister={onRegister} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isMobile && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-4">
          <div
            ref={paginationRef}
            className="swiper-pagination-custom"
            aria-label="carousel pagination"
          />
        </div>
      )}
    </div>
  );
};
