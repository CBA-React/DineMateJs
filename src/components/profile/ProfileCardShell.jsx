import { MapPin, Shield } from "lucide-react";
import clsx from "clsx";

const ProfileCardShell = ({ person, footer, className }) => {
  return (
    <div className={clsx("relative z-10 w-full rounded-[20px] font-sans", className)}>
      <div className="relative overflow-hidden rounded-[20px] shadow-xl">

        <div className="relative aspect-[2/3] md:aspect-[4/5] w-full">
          {/* <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover pointer-events-none"
            loading="eager"
          /> */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-primary-text/100" />
        </div>

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-[20px] py-[6px] text-primary-text">
            {person.similarity}% Match
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="text-white/90">
            <div className="text-[28px] flex items-center gap-2">
              {person.full_name} {person.age} {person.is_verified && <Shield />}
            </div>

            <div className="mt-0.5 flex items-center gap-1 text-sm text-white/70">
              <MapPin size={16} className="opacity-80" />
              <span>{person.city}</span>
              <span>• {person.distance} mi</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {person.interests?.slice(0,2).map(tag => (
                <span
                  key={tag}
                  className="pointer-events-auto inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur"
                >
                  {tag}
                </span>
              ))}
              {!!person.interests && person.interests.length > 2 && (
                <span className="pointer-events-auto inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
                  +{person.interests.length - 2}
                </span>
              )}
            </div>
          </div>

          {footer}
        </div>
      </div>
    </div>
  );
}

export default ProfileCardShell;
