import { FilterSheet } from "/src/components/ui/FilterSheet";
import { AgeRange } from "/src/components/ui/AgeRange";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { SortDropdown } from "/src/components/ui/SortDropdown";
import { SORT_OPTIONS } from "/src/constants";
import { useFetch } from "/src/hooks/useFetch";
import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";

const DEFAULTS = {
  name: "",
  age_from: 18,
  age_to: 28,
  distance: 80,
  interests: undefined,
  tags: undefined,
  order_by: "best_match"
};

export const MatchFilters = ({ open, onClose, onApply, onReset, currentSort }) => {
  const isMobile = useIsMobile();
  
  const { data: interestsArr = [], isLoading: interestsLoading } =
    useFetch("/api/v1/profile/interests/list", "interests-list", {
      select: (raw) => (Array.isArray(raw?.interests) ? raw.interests : []),
    });

  const { data: tagsArr = [], isLoading: tagsLoading } =
    useFetch("/api/v1/profile/tags/list", "tags-list", {
      select: (raw) => (Array.isArray(raw?.tags) ? raw.tags : []),
    });

  const interestOptions = useMemo(
    () => interestsArr.map(({ id, name }) => ({ id, label: name })),
    [interestsArr]
  );
  
  const tagOptions = useMemo(
    () => tagsArr.map(({ id, name }) => ({ id, label: name })),
    [tagsArr]
  );

  const interestIdToLabel = useMemo(
    () => Object.fromEntries(interestOptions.map((o) => [o.id, o.label])),
    [interestOptions]
  );
  
  const tagIdToLabel = useMemo(
    () => Object.fromEntries(tagOptions.map((o) => [o.id, o.label])),
    [tagOptions]
  );
  
  const interestLabelToId = useMemo(
    () => Object.fromEntries(interestOptions.map((o) => [o.label, o.id])),
    [interestOptions]
  );
  
  const tagLabelToId = useMemo(
    () => Object.fromEntries(tagOptions.map((o) => [o.label, o.id])),
    [tagOptions]
  );

  return (
    <FilterSheet
      title="Filters"
      open={open}
      onClose={onClose}
      onApply={onApply}
      onReset={onReset}
      defaultValues={{ ...DEFAULTS, order_by: currentSort ?? DEFAULTS.order_by }}
    >
      {({ control, setValue, getValues }) => {
        const interestsUI = useWatch({ control, name: "_interestsUI" }) ?? [];
        const tagsUI = useWatch({ control, name: "_tagsUI" }) ?? [];

        useEffect(() => {
          if (!Array.isArray(interestsUI)) return;
          const ids = interestsUI.map((lbl) => interestLabelToId[lbl]).filter(Boolean);
          const prev = getValues("interests") ?? [];
          const changed = ids.length !== prev.length || ids.some((v, i) => v !== prev[i]);
          if (changed) setValue("interests", ids, { shouldDirty: true });
        }, [interestsUI, interestLabelToId, getValues, setValue]);

        useEffect(() => {
          if (!Array.isArray(tagsUI)) return;
          const ids = tagsUI.map((lbl) => tagLabelToId[lbl]).filter(Boolean);
          const prev = getValues("tags") ?? [];
          const changed = ids.length !== prev.length || ids.some((v, i) => v !== prev[i]);
          if (changed) setValue("tags", ids, { shouldDirty: true });
        }, [tagsUI, tagLabelToId, getValues, setValue]);

        useEffect(() => {
          const ids = getValues("interests") ?? [];
          if (Array.isArray(ids) && ids.length && interestsArr.length) {
            const labels = ids.map((id) => interestIdToLabel[id]).filter(Boolean);
            if (labels.length > 0) {
              setValue("_interestsUI", labels, { shouldDirty: false });
            }
          }
        }, [interestsArr, interestIdToLabel, getValues, setValue]);

        useEffect(() => {
          const ids = getValues("tags") ?? [];
          if (Array.isArray(ids) && ids.length && tagsArr.length) {
            const labels = ids.map((id) => tagIdToLabel[id]).filter(Boolean);
            if (labels.length > 0) {
              setValue("_tagsUI", labels, { shouldDirty: false });
            }
          }
        }, [tagsArr, tagIdToLabel, getValues, setValue]);

        return (
          <>
            {isMobile && (
              <SortDropdown 
                control={control}
                name="order_by"
                options={SORT_OPTIONS}
                defaultValue={currentSort ?? "best_match"}
              />
            )}
            
            <AgeRange control={control} min={18} max={100} />
            
            <DistanceSlider 
              hideHelper 
              control={control} 
              name="distance" 
              min={1} 
              max={80} 
            />

            {interestsLoading ? (
              <div className="text-fade-text">Loading interests…</div>
            ) : (
              <PillMultiSelectSection 
                control={control} 
                name="_interestsUI" 
                options={interestOptions.map(o => o.label)} 
                title="INTERESTS"
                pillClassName="px-5 py-[5.5px]"
                pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
                pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
                pillDisabledClassName="opacity-40 cursor-not-allowed"
              />
            )}

            {tagsLoading ? (
              <div className="text-fade-text">Loading personality tags…</div>
            ) : (
              <PillMultiSelectSection 
                control={control} 
                name="_tagsUI" 
                options={tagOptions.map(o => o.label)} 
                title="PERSONALITY TAGS"
                pillClassName="px-5 py-[5.5px]"
                pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
                pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
                pillDisabledClassName="opacity-40 cursor-not-allowed"
              />
            )}
          </>
        );
      }}
    </FilterSheet>
  );
};