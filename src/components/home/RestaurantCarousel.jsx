"use client"

import {StatusBadge, RatingBadge, TagBadge} from "/src/components/ui/Badge";
import { useRef } from "react";
import { MapPin, DollarSign } from "lucide-react";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

  export function RestaurantCarousel({ items }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);
  
    const onBeforeInit = (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.pagination.el = paginationRef.current;
    };
    const onSwiper = (swiper) => {
      setTimeout(() => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.params.pagination.el = paginationRef.current;
        swiper.navigation.init(); swiper.navigation.update();
        swiper.pagination.init(); swiper.pagination.render(); swiper.pagination.update();
      });
    };
  
    return (
      <div className="relative w-full">
        <Swiper
        className="overflow-hidden restaurant-swiper"
        modules={[Navigation, Pagination, A11y, Autoplay]}
        onBeforeInit={onBeforeInit}
        onSwiper={onSwiper}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{ 
          el: '.swiper-pagination-custom',
          clickable: true,
          bulletClass: 'w-3 h-3 bg-gray-300 rounded-full cursor-pointer transition-colors',
          bulletActiveClass: '!bg-gray-800'
        }}
        loop
        speed={600}
        spaceBetween={24}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        slidesPerView={1.05}     
        centeredSlides
        breakpoints={{
          640: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 16 },
          768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
          1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 24 },
        }}
        a11y={{ enabled: true }}
      >
          {items.map((r) => (
            <SwiperSlide key={r.id} className="!h-auto">
              <RestaurantCard r={r} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/*TODO: fix buttons*/}
        {/* <div className="mt-6 flex items-center justify-center gap-4">
        <button
          className="swiper-button-prev-custom h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div className="swiper-pagination-custom flex items-center gap-2" />

        <button
          className="swiper-button-next-custom h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div> */}
      </div>
    );
  }

export const RestaurantCard = ({r}) => {
        return (
          <article className="flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <img
                src={r.image}
                alt={`${r.name} interior`}
                className="h-[240px] w-full object-cover"
                loading="lazy"
              />

              <div className="absolute left-3 top-3 flex items-center gap-2">
                <StatusBadge open={r.isOpen} />
              </div>
              <div className="absolute right-3 top-3">
                <RatingBadge rating={r.rating} />
              </div>
            </div>
      

            <div className="flex items-start justify-between">
              <div className="w-full">
                <div className="flex flex-row justify-between w-full items-center">
                  <h5 className="text-[22px] font-semibold text-primary-text">{r.name}</h5>
                  <p>{'$'.repeat(Math.max(1, Math.min(4, r.priceLevel || 1)))}</p>
                </div>
                <p>{r.cuisine}</p>
              </div>
            </div>

            <hr className="text-primary-text/10"/>
      
            <div className="flex items-center gap-3 text-sm text-fade-text">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden />
                <span>{r.area}</span> <span className="text-gray-400">·</span>
                <span>{r.distanceMiles} mi</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" aria-hidden />
                <span>${r.pricePerPerson}/person</span>
              </div>
            </div>
      
            <p className="text-primary-text line-clamp-1">
              {r.description}
            </p>
      
            <div className="flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <TagBadge key={t}><span className="text-sm">{t}</span></TagBadge>
              ))}
            </div>
          </article>
        );
}