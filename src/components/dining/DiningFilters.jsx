import { FilterSheet } from "/src/components/ui/FilterSheet";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { Select } from "/src/components/ui/Select"; 
import { CUISINES } from "/src/constants";

const DEFAULTS = {
  distance: 50,
  priceRange: null, // "$" | "$$" | "$$$" | "$$$$"
  cuisine: [],
};

export const DiningFilters = ({ open, onClose, onApply, onReset }) => {
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
          <DistanceSlider hideHelper control={control} name="distance" min={1} max={80} />
          <Select control={control} name="priceRange" label="PRICE RANGE" placeholder="Select price range" />
          <PillMultiSelectSection control={control} name="cuisine" options={CUISINES} title="CUISINE" />
        </>
      )}
    </FilterSheet>
  );
}
