import { FilterSheet } from "/src/components/ui/FilterSheet";
import { AgeRange } from "/src/components/ui/AgeRange";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { INTERESTS, PERSONALITY } from "/src/constants";

const DEFAULTS = {
  ageMin: 18,
  ageMax: 28,
  distance: 80,
  interests: [],
  personality: [],
};

export const MatchFilters = ({ open, onClose, onApply, onReset }) => {
  return (
    <FilterSheet
      title="Filters"
      open={open}
      onClose={onClose}
      onApply={onApply}
      onReset={onReset}
      defaultValues={DEFAULTS}
    >
      {({ control }) => (
        <>
          <AgeRange control={control} min={18} max={100} />
          <DistanceSlider hideHelper control={control} name="distance" min={1} max={80} />
          <PillMultiSelectSection 
            control={control} 
            name="interests" 
            options={INTERESTS} 
            title="INTERESTS"
            pillClassName="px-5 py-[5.5px]"
            pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
            pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
            pillDisabledClassName="opacity-40 cursor-not-allowed"
          />
          <PillMultiSelectSection 
            control={control} 
            name="personality" 
            options={PERSONALITY} 
            title="PERSONALITY TAGS"
            pillClassName="px-5 py-[5.5px]"
            pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
            pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
            pillDisabledClassName="opacity-40 cursor-not-allowed"
          />
        </>
      )}
    </FilterSheet>
  );
}
