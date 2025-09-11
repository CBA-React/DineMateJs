import { DiningFilters } from "/src/components/dining/DiningFilters";
import { useState } from "react";
import { SORT_OPTIONS } from "/src/constants";
import { Search } from "/src/components/ui/Search";
import { Button } from "/src/components/ui/Button"
import { SlidersHorizontal } from "lucide-react";
import { SortDropdown } from "/src/components/ui/SortDropdown";
import { RESTAURANTS } from "/src/constants";
import { RestaurantCard } from "/src/components/dining/RestaurantCard";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { BookTableModal } from "/src/components/dining/BookTableModal";
import { useBooking } from "/src/hooks/useBooking";
import { BookingConfirmationModal } from "/src/components/dining/BookingConfirmationModal";

const TEXT = {
    title: "Perfect Date Spots",
    subtitle: "Book restaurants directly through MyDimate for stress-free dating",
}

const Dining = () => {
    const [sort, setSort] = useState("best");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [_, setFilters] = useState(null);
    const { openBookingModal } = useBooking();

    const handleBookTable = (restaurant) => {
        openBookingModal(restaurant);
    }
    return (
        <div className="relative w-full">
            <div  className="pt-[180px] pb-[100px] relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="max-w-7xl mx-auto flex flex-col">
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
                            <DiningFilters 
                                open={filtersOpen}
                                onClose={() => setFiltersOpen(false)}
                                onApply={(vals) => setFilters(vals)}
                                onReset={() => setFilters(null)}
                            />
                            <SortDropdown
                                options={SORT_OPTIONS}
                                value={sort}
                                onChange={setSort}
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-x-6 gap-y-10 lg:mt-10 justify-items-stretch items-start">
                        {RESTAURANTS.map((r) => (
                            <div className="flex flex-col gap-6">
                                <RestaurantCard key={r.id} r={r} />
                                <SubmitButton text="Book Table" withIcon className="bg-secondary rounded-full" onClick={() => handleBookTable(r)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BookTableModal />
            <BookingConfirmationModal />
        </div>
    )
}

export default Dining;