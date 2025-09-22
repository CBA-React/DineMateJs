import { SortDropdown } from "/src/components/ui/SortDropdown";
import { useState } from "react";
import { Button } from "/src/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { Search } from "/src/components/ui/Search";
import { PEOPLE } from "/src/constants";
import { MatchCard } from "/src/components/matches/MatchCard";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Link } from "react-router-dom";
import { MatchFilters } from "/src/components/matches/MatchFilters";
import { SORT_OPTIONS } from "/src/constants";
import { useIsMobile } from "/src/hooks/useIsMobile";

const TEXT = {
    title: "Your Matches",
    likedYou: "people have liked you back",
    moreMatches: "MORE MATCHES",
    keepDiscovering: "Keep Discovering",
}

const Matches = () => {
    const [sort, setSort] = useState("best");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [_, setFilters] = useState(null);
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    return (
        <div className="relative w-full">
            <div  className="pt-[112px] md:pt-[180px] pb-[140px] md:pb-[370px] px-5 relative"
                style={{
                    background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                    minHeight: '600px'
                  }}
            >
            <div className="max-w-7xl mx-auto flex flex-col">
                <div className="flex flex-col md:flex-row gap-5 justify-between">
                    <div>
                        <h2 className="font-serif font-medium text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text mb-3">
                              <span className="text-transparent">{TEXT.title}</span>
                        </h2>
                        <p>
                                {PEOPLE.length} {TEXT.likedYou}
                            </p>
                        </div>

                        <div className="md:self-end gap-3 flex flex-col md:flex-row z-20">
                            <Search defaultOpen side="right" />
                            <Button className="bg-white px-5 py-2.5 md:max-w-min font-medium rounded-full justify-center text-base hover:shadow-sm" onClick={() => setFiltersOpen(true)}>
                                <SlidersHorizontal />
                                Filters
                            </Button>
                            <MatchFilters 
                                open={filtersOpen}
                                onClose={() => setFiltersOpen(false)}
                                onApply={(vals) => setFilters(vals)}
                                onReset={() => setFilters(null)}
                            />

                            {!isMobile &&
                            <SortDropdown
                                options={SORT_OPTIONS}
                                value={sort}
                                onChange={setSort}
                            />}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-x-6 gap-y-7 md:gap-y-10 mt-7 md:mt-10 justify-items-stretch items-start">
                        {PEOPLE.map((p) => 
                        <MatchCard 
                            key={`${p.name}-${p.age}-${p.location}`}
                            className="w-full"
                            person={p}
                            onPlan={() => navigate(`/plan/${p.id}`)}
                            onChat={() => navigate(`/messages/${p.id}`)}
                            unread={2} 
                        />)}
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg 
                        viewBox="0 -200 1440 400" 
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fff" />
                                <stop offset="50%" stopColor="#fff" />
                                <stop offset="100%" stopColor="#fff" />
                            </linearGradient>
                        </defs>
                        <path 
                            d="M0,200 Q720,-200 1440,200 L1440,400 L0,400 Z" 
                            fill="url(#arcGradient)" 
                        />
                    </svg>
                </div>
            </div>

            <div className="bg-white px-4">
                <div className="text-center max-w-2xl mx-auto items-center flex flex-col">
                    <p className="text-fade-text text-sm uppercase tracking-wider mb-3">
                        {TEXT.moreMatches}
                    </p>
                    <h2 className="font-serif font-medium mb-3 text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                        <span className="text-transparent">{TEXT.keepDiscovering}</span>
                    </h2>
                    <p className="text-primary-text text-[20px] mb-6 leading-relaxed">
                    Find more compatible matches by continuing to swipe<br />
                    and explore profiles
                    </p>
                    <Link to="/discover">
                        <SubmitButton className="max-w-[204px] px-5" text="Continue Swiping" withIcon />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Matches;