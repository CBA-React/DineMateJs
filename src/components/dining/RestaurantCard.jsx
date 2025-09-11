import {StatusBadge, RatingBadge, TagBadge} from "/src/components/ui/Badge";
import { MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export const RestaurantCard = ({r}) => {
    return (
        <Link to={`/restaurant/${r.id}`} className="block">
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
        </Link>
    );
  }