import { SortDropdown } from "/src/components/ui/SortDropdown";
import { useState, useEffect, useRef } from "react";
import { ButtonCustom } from "/src/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { Search } from "/src/components/ui/Search";
import { MatchCard } from "/src/components/matches/MatchCard";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { Link } from "react-router-dom";
import { MatchFilters } from "/src/components/matches/MatchFilters";
import { SORT_OPTIONS } from "/src/constants";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { getLikes } from "@/services/matchesService";

import { useMatches } from "@/hooks/useMatches";

const TEXT = {
    title: "Your Matches",
    likedYou: "people have liked you back",
    moreMatches: "MORE MATCHES",
    keepDiscovering: "Keep Discovering",
}

const Matches = () => {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({order_by: "best_match"});
    const [liked, setLiked] = useState();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const sentinelRef = useRef(null);

    const { matches, loading, hasMore, loadMore } = useMatches({
        pageSize: 10,
        filters,
    });

    const handleApplyFilters = (vals) => {
        const { order_by, ...rest } = vals;
        setFilters((prev) => ({
            ...prev,
            ...rest,
            ...(order_by ? { order_by } : {}),
        }));
    };

    useEffect(() => {
    let mounted = true;
    (async () => {
        try {
        const likes = await getLikes();
        if (mounted) setLiked(likes ?? 0);
        } catch (e) {
        console.error("getLikes failed", e);
        if (mounted) setLiked(0);
        }
    })();
    return () => { mounted = false; };
    }, []);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
            const first = entries[0];
            if (!first) return;
            
            if (first.isIntersecting && hasMore && !loading) {
                loadMore();
            }
            },
            {
            root: null,              
            rootMargin: "800px 0px",  
            threshold: 0,
            }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [hasMore, loading, loadMore]);

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
                                {liked} {TEXT.likedYou}
                            </p>
                        </div>

                        <div className="md:self-end gap-3 flex flex-col md:flex-row z-20">
                            <Search
                                defaultOpen
                                side="right"
                                onSubmit={(query) => {
                                    setFilters((prev) => ({
                                    ...prev,
                                    name: query,
                                    }));
                                }}
                            />
                            <ButtonCustom className="bg-white px-5 py-2.5 md:max-w-min font-medium rounded-full justify-center text-base hover:shadow-sm hover:bg-white h-full" onClick={() => setFiltersOpen(true)}>
                                <SlidersHorizontal />
                                Filters
                            </ButtonCustom>
                            <MatchFilters
                                open={filtersOpen}
                                onClose={() => setFiltersOpen(false)}
                                onApply={handleApplyFilters}
                                onReset={() => {
                                    setFilters({order_by: "best_match"})
                                }}
                                currentSort={filters.order_by}
                            />

                            {!isMobile &&
                            <SortDropdown
                                options={SORT_OPTIONS}
                                value={filters.order_by}
                                onChange={
                                    (val) => setFilters({ ...filters, order_by: val })}
                            />}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-x-6 gap-y-7 md:gap-y-10 mt-7 md:mt-10 justify-items-stretch items-start">
                        {(matches ?? []).map((person) => (
                            <MatchCard
                            key={`${person.id}-${person.full_name ?? person.name}-${person.city ?? person.location}`}
                            className="w-full"
                            person={person}
                            onPlan={() => navigate(`/plan/${person.id}`)}
                            onChat={() => navigate(`/messages/${person.id}`)}
                            unread={2}
                            />
                        ))}
                    </div>

                    <div ref={sentinelRef} aria-hidden="true" />
                    {loading && (
                    <div className="py-6 text-center text-fade-text">Loading…</div>
                    )}
                    {!hasMore && (matches?.length ?? 0) > 0 && (null
                    )}
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