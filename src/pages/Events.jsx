import { Search } from "/src/components/ui/Search";
import { Button } from "/src/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { EventsFilters } from "/src/components/events/EventsFilters";
import { SortDropdown } from "/src/components/ui/SortDropdown";
import { EventsCarousel } from "/src/components/events/EventsCarousel";
import { useState } from "react";
import { EVENTS, EVENTS_TYPES } from "/src/constants";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { useForm } from "react-hook-form";
import { EventRegisterModal } from "../components/events/EventRegisterModal";

const TEXT = {
    title: "Events and Mixers",
    subtitle: "Meet people naturally through fun activities and organized events"
}

const Events = () => {
    const [sort, setSort] = useState("best");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const { control, watch } = useForm({
        defaultValues: {
          types: []
        },
      });

      const [registerOpen, setRegisterOpen] = useState(false);
      const [selectedEvent, setSelectedEvent] = useState(null);
      
      const openRegister = (ev) => {
        setSelectedEvent(ev);
        setRegisterOpen(true);
      };
      const closeRegister = () => setRegisterOpen(false);

      const handleComplete = (ev) => {
        console.log("Complete registration for", ev?.id);
        setRegisterOpen(false);
      };

    return (
        <div className="relative w-full">
            <div  className="pt-[180px] pb-[100px] relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="max-w-7xl mx-auto flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row justify-between">
                            <div>
                                <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text lg:mb-3">
                                      <span className="text-transparent">{TEXT.title}</span>
                                </h2>
                                <p>
                                    {TEXT.subtitle}
                                </p>
                            </div>
                            <div className="self-end gap-3 flex flex-row z-20">
                                <Search  />
                                <Button className="bg-white px-5 py-2.5 max-w-min font-medium rounded-full text-base hover:shadow-sm" onClick={() => setFiltersOpen(true)}>
                                    <SlidersHorizontal />
                                    Filters
                                </Button>
                                <EventsFilters
                                    open={filtersOpen}
                                    onClose={() => setFiltersOpen(false)}
                                    onApply={(vals) => setFilters(vals)}
                                    onReset={() => setFilters(null)}
                                />
                                <SortDropdown
                                    options={[]}
                                    value={sort}
                                    onChange={setSort}
                                />
                            </div>
                        </div>
                        
                        <PillMultiSelectSection
                            options={EVENTS_TYPES}
                            control={control}
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
                        open={registerOpen}
                        onClose={closeRegister}
                        onComplete={handleComplete}
                        event={selectedEvent}
                    />
                </div>
            </div>
        </div>
    )
}

export default Events;