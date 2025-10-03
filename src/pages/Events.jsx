import { Search } from "/src/components/ui/Search";
import { ButtonCustom } from "/src/components/ui/ButtonCustom";
import { SlidersHorizontal } from "lucide-react";
import { EventsFilters } from "/src/components/events/EventsFilters";
import { SortDropdown } from "/src/components/ui/SortDropdown";
import { EventsCarousel } from "/src/components/events/EventsCarousel";
import { useState } from "react";
import { EVENTS, EVENTS_TYPES } from "/src/constants";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { useForm } from "react-hook-form";
import { EventRegisterModal } from "/src/components/events/EventRegisterModal";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { EventRegistrationConfirmationModal } from "/src/components/events/EventRegistrationConfirmationModal";
import { useEventRegistration } from "/src/hooks/useEventRegistration";
import { EventRegistrationFailModal } from "@/components/events/EventRegistrationFailModal";

const TEXT = {
    title: "Events and Mixers",
    subtitle: "Meet people naturally through fun activities and organized events"
}

const Events = () => {
    const [sort, setSort] = useState("best");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const { isOpen, event, openRegistrationModal, closeRegistrationModal, confirmRegistration } =
    useEventRegistration();

    const isMobile = useIsMobile();

    const { control } = useForm({
        defaultValues: {
          types: []
        },
    });
    
    const openRegister = (ev) => {
        openRegistrationModal(ev);
    };

    const completeRegistration = (ev) => {
        confirmRegistration({
            eventTitle: ev.title,
            venueName: ev.venue,
            venueArea: ev.area,
            date: ev.date,
            time: ev.time,
            ticketQty: 1,
        });
    };

    return (
        <div className="relative w-full">
            <div  className="pt-[112px] md:pt-[180px] pb-[60px] md:pb-[100px] px-5 relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="max-w-7xl mx-auto flex flex-col gap-7 md:gap-10">
                    <div className="flex flex-col gap-7 md:gap-6">
                        <div className="flex flex-col md:flex-row justify-between gap-5">
                            <div>
                                <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text mb-3">
                                      <span className="text-transparent">{TEXT.title}</span>
                                </h2>
                                <p>
                                    {TEXT.subtitle}
                                </p>
                            </div>
                            <div className="md:self-end gap-3 flex flex-col md:flex-row z-20">
                                <Search  />
                                <ButtonCustom className="bg-white px-5 py-2.5 md:max-w-min font-medium rounded-full text-base hover:shadow-sm" onClick={() => setFiltersOpen(true)}>
                                    <SlidersHorizontal />
                                    Filters
                                </ButtonCustom>
                                <EventsFilters
                                    open={filtersOpen}
                                    onClose={() => setFiltersOpen(false)}
                                    onApply={(vals) => setFilters(vals)}
                                    onReset={() => setFilters(null)}
                                />
                                { !isMobile &&
                                <SortDropdown
                                    options={[]}
                                    value={sort}
                                    onChange={setSort}
                                /> }
                            </div>
                        </div>
                        
                        <PillMultiSelectSection
                            options={EVENTS_TYPES}
                            control={control}
                            wrap={false}
                            name="types"
                            className="space-y-0"
                            pillClassName="px-5 py-[5.5px] text-base"
                            pillSelectedClassName="bg-primary text-white border-primary shadow-sm hover:bg-primary/90"
                            pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text hover:text-primary-text hover:border-primary"
                            pillDisabledClassName="opacity-40 cursor-not-allowed"
                        />
                    </div>

                    <EventsCarousel events={EVENTS} onRegister={openRegister} />
                    <EventRegisterModal
                        open={isOpen}
                        onClose={closeRegistrationModal}
                        event={event}
                        onComplete={completeRegistration}
                    />
                    <EventRegistrationConfirmationModal />
                    <EventRegistrationFailModal />
                </div>
            </div>
        </div>
    )
}

export default Events;