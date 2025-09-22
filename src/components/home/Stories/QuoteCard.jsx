import { Verified } from "lucide-react";

export const QuoteCard = ({
    avatar,
    name,
    meta,        
    text,
  }) => {
    return (
      <article className="break-inside-avoid rounded-3xl bg-feature-card-bg p-5 sm:p-6 mb-3 md:mb-6">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={`${name} avatar`} className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
              <span className="truncate">{name}</span>
              <Verified fill="#42A5F5" size={15} className="text-white" />
            </div>
            <p className="text-xs text-[#52525B] truncate">{meta}</p>
          </div>
        </div>
  
        <p className="mt-4 text-[#71717A] text-sm leading-relaxed">
          {text}
        </p>
      </article>
    );
  }