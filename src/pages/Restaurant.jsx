import { useParams } from "react-router-dom";
import { RESTAURANTS } from "/src/constants";
import { useEffect } from "react";
import { TagBadge } from "/src/components/ui/Badge";
import { RestaurantBadge } from "/src/components/dining/RestaurantBadge";
import { Star, DollarSign, MapPin, Clock } from "lucide-react";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { useBooking } from "/src/hooks/useBooking";
import {BookTableModal} from "/src/components/dining/BookTableModal";
import {BookingConfirmationModal} from "/src/components/dining/BookingConfirmationModal";
import clsx from "clsx";
import { useIsMobile } from "/src/hooks/useIsMobile";

const badgesKeys = [{key: "rating", label: "Rating", icon: Star }, {key: "pricePerPerson", label: "Avg per person", icon: DollarSign}, {key: "distanceMiles", label: "Distance", icon: MapPin}, {key: "isOpen", label: "Status", icon: Clock}];

const Restaurant = () => {
    const { restaurantId } = useParams();
    const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
    const { openBookingModal } = useBooking();
    const isMobile = useIsMobile();

    useEffect(() => {
        console.log(restaurantId);
        console.log(RESTAURANTS);
    }, [restaurantId]);

    if (!restaurant) {
        return <div className="relative w-full">
        <div  className="pt-[112px] md:pt-[120px] pb-[60px] md:pb-[100px] px-5 relative"
            style={{
                background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                minHeight: '600px'
              }}
        >
            <div className="max-w-7xl mx-auto flex flex-col">
                <p className="pt-20 text-center text-primary-text font-semibold">Restaurant not found</p>
            </div>
        </div>
    </div>
    }

    return (
        <div className="relative w-full">
            <div className="pt-[112px] md:pt-[120px] pb-[60px] md:pb-[100px] px-5 relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
                <div className="max-w-7xl mx-auto flex flex-col gap-10 items-center justify-center">
                    <div className="flex flex-col gap-3 w-full">
                        <img src={restaurant.image} alt={restaurant.name} className={clsx("rounded-xl w-full max-h-[500px] object-cover", isMobile && "aspect-square")} />
                        
                        <div className="flex flex-row overflow-scroll no-scrollbar md:grid md:grid-cols-4 gap-3">
                            {badgesKeys.map((badge, index) => (
                                <RestaurantBadge key={`${badge.label}${index}`} label={badge.label} value={restaurant[badge.key]} icon={badge.icon} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 max-w-[600px] w-full">
                        <div className="flex items-start justify-between">
                            <div className="w-full flex flex-col gap-0.5">
                                <div className="flex flex-row justify-between w-full items-center">
                                    <h3 className="text-[28px] text-primary-text">
                                    {restaurant.name}
                                    </h3>
                                    <p className="text-primary-text text-[28px]">
                                    {"$".repeat(Math.max(1, Math.min(4, restaurant.priceLevel || 1)))}
                                    </p>
                                </div>
                                <p className="text-primary-text">{restaurant.cuisine}</p>
                                <div className="flex items-center gap-3 text-sm text-fade-text">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" aria-hidden />
                                        <span>{restaurant.area}</span>
                                        <span className="text-gray-400">·</span>
                                        <span>{restaurant.distanceMiles} mi</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" aria-hidden />
                                        <span>${restaurant.pricePerPerson}/person</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    <hr className="text-primary-text/10" />

                    <div className="flex flex-wrap gap-1.5">
                        {restaurant.tags.map((t) => (
                        <TagBadge key={t}>
                            <span className="text-sm">{t}</span>
                        </TagBadge>
                        ))}
                    </div>
                    
                    <p className="text-primary-text">{restaurant.description}</p>
                    <SubmitButton text="Book Table" withIcon className="md:max-w-fit px-5 py-2.5" onClick={() => openBookingModal(restaurant)}/>
                    </div>
                </div>
                <BookTableModal />
                <BookingConfirmationModal />
            </div>
        </div>
    )
}

export default Restaurant;