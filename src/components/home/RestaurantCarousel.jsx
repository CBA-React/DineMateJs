"use client"

import { useRef, useState } from "react";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RestaurantCard } from "/src/components/dining/RestaurantCard";

export const RestaurantCarousel = ({ items }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)
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
      swiperInstance.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slideNext()
    }
  }

  return (
    <div className="relative w-full">
      <Swiper
        className="overflow-hidden restaurant-swiper"
        modules={[Navigation, Pagination, A11y, Autoplay]}
        onSwiper={onSwiper}
        navigation={false}
        loop={items && items.length > 3}
        speed={1000}
        pagination={{
          el: paginationRef.current,
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        spaceBetween={24}
        autoplay={items && items.length > 3 ? { delay: 4000, disableOnInteraction: true } : false}
        slidesPerView={1.05}
        centeredSlides
        breakpoints={{
          640: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 16 },
          768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
          1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 24 },
        }}
        a11y={{ enabled: true }}
      >
        {items?.map((r) => (
          <SwiperSlide key={r.id} className="!h-auto">
            <RestaurantCard r={r} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 md:mt-12 flex justify-between w-full md:w-auto items-center absolute md:flex left-1/2 -translate-x-1/2 md:justify-center gap-4">
        <button
          ref={prevRef}
          className="swiper-button-prev-custom min-h-8 min-w-8 cursor-pointer rounded-full bg-primary-text/5 shadow-sm hover:bg-primary-text/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Previous slide"
          onClick={handlePrevClick}
        >
          <ChevronLeft className="h-4 w-4 text-primary-text" />
        </button>

        <div ref={paginationRef} className="swiper-pagination-custom flex max-w-min items-center px-5 py-4 rounded-full gap-2 bg-primary-text/5" />

        <button
          ref={nextRef}
          className="swiper-button-next-custom min-h-8 min-w-8 cursor-pointer rounded-full bg-primary-text/5 shadow-sm hover:bg-primary-text/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Next slide"
          onClick={handleNextClick}
        >
          <ChevronRight className="h-4 w-4 text-primary-text" />
        </button>
      </div>
    </div>
  )
}