import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "/src/components/ui/Button";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { AgeRange } from "./AgeRange";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const INTERESTS = [ "Hiking","Photography","Yoga","Wine Tasting","Reading","Art","Music","Dancing","Meditation", "Movies","Gardening","Travel","Sports","Theater","Cooking","Volunteering" ]; 
const PERSONALITY = [ "Adventurous","Foodie","Introverted","Spontaneous","Planner","Spiritual","Ambitious","Romantic", "Intellectual","Laid-back","Extroverted","Optimistic","Artistic","Athletic","Creative" ];

export const FiltersPanel = ({
  open,
  onClose = () => {},
  onApply = () => {},
  onReset = () => {},
  defaultValues = {
    ageMin: 18,
    ageMax: 28,
    distance: 80,
    interests: [],
    personality: [],
  },
}) => {
  const { control, handleSubmit, reset } = useForm({ defaultValues, mode: "onChange" });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const apply = handleSubmit((values) => { onApply(values); onClose(); });
  const resetAll = () => { reset(defaultValues); onReset(defaultValues); };

  const panel = (
    <div className={`fixed inset-0 z-[1000] ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 rounded-r-[20px] top-0 h-screen w-[320px] p-[28px] sm:w-[360px] bg-white shadow-xl z-[1010]
                    transition-transform duration-300 will-change-transform
                    ${open ? "translate-x-0" : "-translate-x-full"} flex flex-col gap-6`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[28px] text-primary-text">Filters</h3>
          <Button aria-label="Close" onClick={onClose} className="rounded-full p-1 max-w-min hover:bg-fade-text/10">
            <X strokeWidth={1} size={32} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          <AgeRange control={control} min={18} max={100} />
          <DistanceSlider hideHelper control={control} name="distance" min={1} max={80} />
          <PillMultiSelectSection control={control} name="interests" options={INTERESTS} title="INTERESTS"/>
          <PillMultiSelectSection control={control} name="personality" options={PERSONALITY} title="PERSONALITY TAGS"/>
        </div>

        <div className="border-t border-gray-100  space-y-3">
          <SubmitButton withIcon text="Apply" className="w-full py-2.5 bg-secondary rounded-full" onClick={apply} />
          <Button onClick={resetAll} className="w-full rounded-full border border-secondary justify-center px-4 py-2.5 text-secondary hover:bg-gray-50">
            Reset Filters
          </Button>
        </div>
      </aside>
    </div>
  );

  return createPortal(panel, document.body);
};
