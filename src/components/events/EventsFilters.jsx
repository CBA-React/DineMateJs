import { FilterSheet } from "/src/components/ui/FilterSheet";

export const EventsFilters = ({ open, onClose, onApply, onReset }) => {
  return (
    <FilterSheet
      title="Filters"
      open={open}
      onClose={onClose}
      onApply={onApply}
      onReset={onReset}
    >
      {/* {({ control }) => (
        <>
          
        </>
      )} */}
    </FilterSheet>
  );
}
