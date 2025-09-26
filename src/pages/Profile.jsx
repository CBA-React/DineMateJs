import { PROFILE_MOCK } from "/src/constants";
import { useState, useRef } from "react";
import { Badge } from "/src/components/ui/Badge";
import { ChevronRight, ChevronLeft, Shield, MapPin, Circle, Heart, MessageCircle } from "lucide-react";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { ButtonCustom } from "/src/components/ui/ButtonCustom";
import { GENDERS_ICONS } from "/src/constants";
import { useIsMobile } from "/src/hooks/useIsMobile";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import clsx from "clsx";

const Profile = ({person = PROFILE_MOCK, isSelf=false}) => {
    const p = person;

    return (
        <div className="relative w-full">
            <div  className="pt-[112px] md:pt-[180px] pb-[60px] md:pb-[100px] relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-[450px_1fr] items-start">
                        <GalleryCard person={person} isSelf={isSelf} className="md:w-full w-[335px] md:max-w-[450px] mx-auto lg:mx-0"/>
                        <RightColumn person={person} isSelf={isSelf} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const GalleryCard = ({person, isSelf, className}) => {
    const [idx, setIdx] = useState(0);
    const next = () => setIdx((i) => (i + 1) % person.photos.length);
    const prev = () =>
    setIdx((i) => (i - 1 + person.photos.length) % person.photos.length);
    const isMobile = useIsMobile();
    const paginationRef = useRef(null);

    if (isMobile) {
      return (
        <section className={clsx("select-none relative events-swiper", className)}>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: paginationRef.current,            
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.pagination.el = paginationRef.current;
          }}
          onSwiper={(swiper) => {
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }}
          className="relative overflow-hidden rounded-[20px] shadow-xl aspect-[2/3]"
        >
          {person.photos.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`${person.name} photo ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {!isSelf && (
                  <div className="absolute left-4 top-4 right-4 flex justify-between">
                    <Badge className="rounded-full bg-white px-5 py-[5.5px] shadow">
                      {person.match}% Match
                    </Badge>
                    <Badge className="rounded-full border-0 bg-linear-to-r from-primary to-accent px-5 py-[5.5px] text-white shadow">
                      NEW
                    </Badge>
                  </div>
                )}
                <div className="absolute flex flex-col bottom-1/4 left-1/2 -translate-x-1/2 text-center text-nowrap text-white">
                  <h3 className="text-[28px] font-medium flex justify-center items-center gap-2">
                    {person.name} {person.age}{" "}
                    {person.verified && <Shield size={20} />}
                  </h3>
                  <div className="mt-0.5 flex justify-center items-center gap-1 text-sm text-white/50">
                    <MapPin size={16} className="opacity-90" />
                    <span>{person.location}</span>
                    <span>• {person.distance} mi</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          <div
            ref={paginationRef}
            className="swiper-pagination-custom"
            aria-label="carousel pagination"
          />
        </div>
      </section>
      );
    }

    return (
        <section className={clsx("select-none", className)}>
            <div className="relative overflow-hidden rounded-[20px] shadow-xl">
                <div className="relative aspect-[2/3] md:aspect-[3/4] w-full bg-black">
                <img
                    src={person.photos[idx]}
                    alt={`${person.name} photo ${idx + 1}`}
                    className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {!isSelf && <div className="absolute left-4 top-4 flex justify-between right-4">
                    <Badge className="rounded-full bg-white px-5 py-[5.5px] shadow" tone='default' variant='solid' size="md" >
                      {person.match}% Match
                    </Badge>
                    <Badge className="rounded-full border-0 bg-linear-to-r from-primary to-accent px-5 py-[5.5px] text-white shadow">
                        NEW
                    </Badge>
                </div>}

                {!isMobile && 
                <>
                <ButtonCustom
                    aria-label="Previous photo"
                    onClick={prev}
                    className="absolute left-3 top-1/2 w-min text-white -translate-y-1/2 grid place-items-center rounded-full p-2 hover:text-white/70"
                >
                    <ChevronLeft size={28} />
                </ButtonCustom>
                <ButtonCustom
                    aria-label="Next photo"
                    onClick={next}
                    className="absolute right-3 top-1/2 w-min text-white -translate-y-1/2 grid place-items-center rounded-full p-2 hover:text-white/70"
                >
                    <ChevronRight size={28} />
                </ButtonCustom>
                </>
                }

                <div className="absolute w-[243px] md:w-auto inset-x-0 left-1/2 md:left-0 bottom-1/6 md:bottom-0 md:translate-x-0 -translate-x-1/2 md:p-4 sm:p-5">
                    <div className="text-white">
                        <h3 className="text-[28px] font-medium flex items-center gap-2">
                        {person.name} {person.age} {person.verified && <Shield size={20} />}
                        </h3>
                        <div className="mt-0.5 flex items-center justify-center md:justify-start gap-1 text-sm text-white/50">
                            <MapPin size={16} className="opacity-90" />
                            <span>{person.location}</span>
                            <span>• {person.distance} mi</span>
                        </div>
                    </div>
                </div>
            </div>

          {!isMobile && <div className="mt-3 w-full flex gap-3">
              {person.photos.slice(0, person.photos.length > 4 ? 3 : 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={[
                    "relative overflow-hidden ring-1 ring-black/10 bg-white",
                    "w-[105px] aspect-square rounded-xl",
                    i === idx ? "outline outline-2 outline-primary outline-offset-2" : ""
                  ].join(" ")}
                  aria-label={`Open photo ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`thumb ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              ))}

            {person.photos.length > 4 && (
              <button
                onClick={() => setIdx(3)}
                className="relative w-[105px] aspect-square overflow-hidden rounded-xl ring-1 ring-black/10 bg-white"
                aria-label={`Open photo 4; plus ${person.photos.length - 3} more`}
              >
                <img
                  src={person.photos[3]}
                  alt="more photos"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/45">
                  <span className="text-white text-base font-semibold">
                    +{person.photos.length - 3}
                  </span>
                </div>
              </button>
            )}
          </div>}
        </section>
    )
}

export const RightColumn = ({ person, isSelf }) => {
    const key = person.gender?.toLowerCase?.() ?? "";
    const GenderIcon = GENDERS_ICONS.get(key) ?? Circle;
    const isMobile = useIsMobile();

    return (
      <section className="flex flex-col gap-5 md:gap-6">
        <div>
          <div className="mb-0.5 flex items-center justify-between gap-3">
            <h1 className="font-sans flex items-center gap-2 text-[28px] sm:text-[30px] text-primary-text">
              {person.name} {person.age} {person.verified && <Shield size={20} className="inline" />}
            </h1>
            {person.online && !isMobile && (
              <span className="inline-flex items-center gap-2 text-[#00743D]">
                <Circle className="fill-[#00743D] text-[#00743D]" size={10} />
                Online
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-fade-text">
            <MapPin size={16} />
            <span>{person.location} • {person.distance} mi</span>
          </div>
        </div>
  
        <div className="space-y-1 text-primary-text">
          <div className="flex flex-row items-center gap-2"><GenderIcon size={20} />{person.gender}</div>
          <div className="flex flex-row items-center gap-2"><Heart size={20} />  I’m looking for: {person.lookingFor}</div>
        </div>
  
        {/* TODO badges after merge */}
        <div className="flex flex-wrap gap-2">
          {person.interests.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full px-5 py-[5.5px] border border-primary text-primary-text"
            >
              {t}
            </span>
          ))}
        </div>

        <hr className="text-black/10" />
  
        <p className="leading-relaxed text-primary-text">
          {person.bio}
        </p>
  
        <div className="space-y-3">
          {person.qa.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-4"
            >
              <div className="flex flex-row gap-2 text-[20px] items-center text-primary-text">{item.icon && !isMobile ? <item.icon size={24} /> : null} {item.q}</div>
              <div className="mt-2 uppercase text-sm tracking-wide text-primary">
                {item.a}
              </div>
            </div>
          ))}
        </div>

        {isSelf ? (
          <div className="mt-2.5">
            <SubmitButton
              text="Edit"
              withIcon
              className="rounded-full font-medium text-base px-[74px] py-2.5 md:max-w-min"
              onClick={() => (window.location.href = "/edit")}
            />
          </div>
        ) : (
          <div className="md:mt-2.5 flex flex-col md:flex-row gap-3">
            <SubmitButton
              withIcon
              className="rounded-full px-[47px] justify-center py-2.5 bg-primary text-white text-nowrap md:w-min"
              text="Plan Date"
            />
            <ButtonCustom className="rounded-full justify-center border md:w-min flex flex-row gap-1.5 items-center border-primary px-[47px] py-2.5 text-primary hover:bg-accent/10">
              Message
              <MessageCircle size={20} />
            </ButtonCustom>
          </div>
        )}
      </section>
    );
}

export default Profile;