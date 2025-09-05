import { PROFILE_MOCK } from "/src/constants";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Shield, MapPin, Circle, Heart, MessageCircle } from "lucide-react";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Button } from "/src/components/ui/Button";
import { GENDERS_ICONS } from "/src/constants";
import clsx from "clsx";

const Profile = () => {
    const p = PROFILE_MOCK;
    return (
        <div className="relative w-full">
            <div  className="pt-[180px] pb-[100px] relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid gap-8 lg:gap-12 lg:grid-cols-[450px_1fr] items-start">
                        <GalleryCard person={p} className="w-full max-w-[520px] mx-auto lg:mx-0"/>
                        <RightColumn person={p} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const GalleryCard = ({person, className}) => {
    const [idx, setIdx] = useState(0);
    const next = () => setIdx((i) => (i + 1) % person.photos.length);
    const prev = () =>
    setIdx((i) => (i - 1 + person.photos.length) % person.photos.length);

    return (
        <section className={clsx("select-none", className)}>
            <div className="relative overflow-hidden rounded-[20px] shadow-xl">
                <div className="relative aspect-[3/4] w-full bg-black">
                <img
                    src={person.photos[idx]}
                    alt={`${person.name} photo ${idx + 1}`}
                    className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                {/* To do badges after merge */}
                <div className="absolute left-4 top-4 flex justify-between right-4">
                    <span className="rounded-full bg-white px-5 py-[5.5px] font-semibold text-gray-800 shadow">
                        {person.match}% Match
                    </span>
                    <span className="rounded-full bg-linear-to-r from-primary to-accent px-5 py-[5.5px] font-semibold text-white shadow">
                        NEW
                    </span>
                </div>

                <Button
                    aria-label="Previous photo"
                    onClick={prev}
                    className="absolute left-3 top-1/2 w-min text-white -translate-y-1/2 grid place-items-center rounded-full p-2 hover:text-white/70"
                >
                    <ChevronLeft size={28} />
                </Button>
                <Button
                    aria-label="Next photo"
                    onClick={next}
                    className="absolute right-3 top-1/2 w-min text-white -translate-y-1/2 grid place-items-center rounded-full p-2 hover:text-white/70"
                >
                    <ChevronRight size={28} />
                </Button>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="text-white">
                        <h3 className="sm:text-[24px] md:text-[28px] font-medium flex items-center gap-2">
                        {person.name} {person.age} {person.verified && <Shield size={20} />}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-1 text-sm text-white/50">
                            <MapPin size={16} className="opacity-90" />
                            <span>{person.location}</span>
                            <span>• {person.distance} mi</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 w-full flex gap-3">
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
          </div>
        </section>
    )
}

const RightColumn = ({ person }) => {
    const key = person.gender?.toLowerCase?.() ?? "";
    const GenderIcon = GENDERS_ICONS.get(key);

    return (
      <section className="flex flex-col gap-6">
        <div>
          <div className="mb-0.5 flex items-center justify-between gap-3">
            <h1 className="font-sans flex items-center gap-2 text-[28px] sm:text-[30px] text-primary-text">
              {person.name} {person.age} {person.verified && <Shield size={20} className="inline" />}
            </h1>
            {person.online && (
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
              <div className="flex flex-row gap-2 text-[20px] items-center text-primary-text">{item.icon ? <item.icon size={24} /> : null} {item.q}</div>
              <div className="mt-2 uppercase text-sm tracking-wide text-primary">
                {item.a}
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-6 flex flex-row gap-3">
          <SubmitButton
            withIcon
            className="rounded-full px-[47px] py-2.5 bg-primary text-white text-nowrap w-min"
            text="Plan Date"
          />
          <Button className="rounded-full border w-min flex flex-row gap-1.5 items-center border-primary px-[47px] py-2.5 text-primary hover:bg-accent/10">
            Message
            <MessageCircle size={20} />
          </Button>
        </div>
      </section>
    );
  }

export default Profile;