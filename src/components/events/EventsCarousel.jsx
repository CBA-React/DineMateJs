import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { EventCard } from "./EventCard";

export const EventsCarousel = ({events, onRegister}) => {
    return (
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop
        className="w-full"
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            <EventCard ev={ev} onRegister={onRegister} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }