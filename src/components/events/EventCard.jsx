'use client';

import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';
import clsx from 'clsx';
import { SubmitButton} from '/src/components/ui/SubmitButton';
import { Badge} from '/src/components/ui/Badge'; 
import { EventSpotsProgress } from "/src/components/events/EventSpotsProgress";
import { formatDateTime } from '/src/utils/dateUtils';

export const EventCard = ({ev, onRegister}) => {
    const hasDate = typeof ev?.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(ev.date);
    const { dateStr, timeStr } = hasDate
        ? formatDateTime(ev.date, ev.time, "en-US", {weekday: "long"})
        : { dateStr: "", timeStr: "" };

  return (
    <div
      className={clsx(
        'relative w-full h-[600px] rounded-2xl overflow-hidden shadow-xl',
        'bg-center bg-cover'
      )}
      style={{ backgroundImage: `url(${ev.image})` }}
      role="img"
      aria-label={ev.title}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />


      <div className="absolute left-6 top-6 bottom-6 w-[340px] sm:w-[380px] md:w-[420px]">
        <div className="h-full rounded-[10px] backdrop-blur-[32px] bg-white/10 p-6 sm:p-6 flex flex-col gap-3 border-1 border-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-4xl font-medium font-serif leading-tight text-white">
                {ev.title}
              </h3>
              <div className="mt-0.5 flex items-center gap-1 text-sm text-white/50">
                <MapPin size={16} />
                <span>{ev.venue}</span>
                {ev.distance && <span>• {ev.distance} mi</span>}
              </div>
            </div>
            {typeof ev.price === 'number' && (
              <div className="shrink-0 text-right">
                <h3 className="text-[28px] text-white">${ev.price}</h3>
              </div>
            )}
          </div>

            <div className='flex items-center gap-1.5 text-white'>
                {ev.featured && <Badge tone="gray" variant="outline" className="bg-white/20 backdrop-blur-[10px] text-white"> <Star size={16} fill='white' color='white' /> Featured</Badge>}
                {ev.tags && ev.tags.map((tag) => <Badge key={tag} tone="gray" variant="outline" className="bg-white/20 backdrop-blur-[10px] text-white">{tag}</Badge>)}
            </div>

          <p className="text-white">
            {ev.description}
          </p>

            <EventSpotsProgress boxed {...ev} />

          <div className="mt-auto flex flex-col gap-3">
            <SubmitButton
              text={ev.ctaText ?? 'Register Now'}
              withIcon
              className="w-full py-3 bg-primary text-white rounded-full"
              onClick={() => onRegister?.(ev)} 
            />
            {hasDate && (
              <div className="text-sm text-white flex items-center gap-1 justify-center">
                <Calendar size={16} />
                {dateStr} • {timeStr}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};