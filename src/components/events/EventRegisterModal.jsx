'use client';
import React from 'react';
import Modal from '/src/components/ui/Modal';                  
import { SubmitButton } from '/src/components/ui/SubmitButton';
import { MapPin, Calendar, X, UserRound } from 'lucide-react';
import { IncludedDropdown } from '/src/components/ui/IncludedDropdown';        
import { formatDateTime } from '/src/utils/dateUtils';   
import { Button } from '/src/components/ui/Button';     

const TEXT = {
    title: 'Register for Event',
    detailsTitle: 'Event Details',
    total: 'Total',
}

export const EventRegisterModal = ({ open, onClose, event, onComplete }) => {
  const hasDate =
    typeof event?.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(event.date);
  const { dateStr, timeStr } = hasDate
    ? formatDateTime(event.date, event.time, 'en-US', { weekday: "long" })
    : { dateStr: '', timeStr: '' };

  return (
    <Modal open={open} onClose={onClose} className="max-w-[544px] text-primary-text relative">
      <div className="p-10 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="w-full text-center">
            <h2 className="font-serif text-5xl font-medium">
              {TEXT.title}
            </h2>
            <h4 className="mt-3 text-[22px]">{event?.title}</h4>
          </div>
          <Button
            className="absolute right-5 top-5 p-1 rounded-full flex items-center text-black hover:bg-gray-100 max-w-fit"
            onClick={onClose}
            aria-label="Close"
            >
                <X size={28} />
            </Button>
        </div>

        <div>
            <div className="rounded-[10px] bg-[#DBDBDB25] p-4">
                <h4 className="text-[22px]">{TEXT.detailsTitle}</h4>
              <div className="grid grid-cols-2 gap-y-1.5 text-sm mt-2.5 text-primary-text">
                <div className="col-span-2 flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="truncate">{event?.venue}</span>
                  <span className="ml-auto">
                    {event?.distance != null ? `${event.distance} mi` : null}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <UserRound size={16} />
                  <span className="truncate">
                    {event?.attending != null && event?.capacity != null
                      ? `${event.attending}/${event.capacity} attending`
                      : 'Attendees'}
                  </span>
                  <span className="ml-auto">
                    {event?.ages ? `Ages ${event.ages}` : null}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="truncate">{dateStr}</span>
                  <span className="ml-auto">{timeStr}</span>
                </div>
              </div>
            </div>
            <IncludedDropdown
              className="mt-4"
              title="What's Included"
              items={event?.included ?? []}
              defaultOpen={false}
            />
        </div>

        <div className="border-t border-primary-text/10 text-[22px]" />

        <div className="flex flex-row justify-between">
            <h4>{TEXT.total}</h4>
            <h4>
                ${event?.price ?? 0}
            </h4>
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={onClose} className="text-sm text-fade-text underline max-w-fit">
            Cancel
          </Button>
          <div className="flex items-center gap-6">
            <SubmitButton
              text="Complete Registration"
              withIcon
              className="px-5 py-2.5"
              onClick={() => onComplete?.(event)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
