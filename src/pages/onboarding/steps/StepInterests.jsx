import { useFormContext } from "react-hook-form";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { Grid2X2, UserRound } from "lucide-react";

const ALL_INTERESTS = ["Hiking","Photography","Cooking","Travel","Yoga","Reading","Dancing","Movies","Art","Sports","Theater","Meditation","Gardening"];
const ALL_TRAITS    = ["Adventurous","Foodie","Optimistic","Creative","Introverted","Extroverted","Spontaneous","Planner","Ambitious","Laid-back","Romantic","Intellectual","Athletic","Artistic"];
const ALL_ALCOHOL    = ["Not for me","I don't drink","I try not to drink", "I drink on special occasions", "I drink with company on weekends", "Almost every evening"];
const ALL_SMOKE    = ["I smoke for company", "With alcohol", "I don't smoke", "I smoke", "I'm trying to quit"];

export function StepInterests() {
  const { control } = useFormContext();

  return (
    <section>
      <PillMultiSelectSection
        control={control}
        name="interests"
        options={ALL_INTERESTS}
        title="Interests"
        min={3}
        max={8}
        icon={<Grid2X2 className="w-4 h-4 text-primary-text" />}
      />

      <hr className="my-6 text-primary-text/15" />

      <PillMultiSelectSection
        control={control}
        name="traits"
        options={ALL_TRAITS}
        title="Personality tags"
        min={3}
        max={8}
        icon={<UserRound className="w-4 h-4 text-primary-text" />}
      />

      <hr className="my-6 text-primary-text/15" />

      <PillMultiSelectSection
        control={control}
        name="alcohol"
        options={ALL_ALCOHOL}
        title="How often do you drink alcohol?"
        min={1}
        max={1}
        icon={<UserRound className="w-4 h-4 text-primary-text" />}
      />

      <hr className="my-6 text-primary-text/15" />

      <PillMultiSelectSection
        control={control}
        name="smoke"
        options={ALL_SMOKE}
        title="How often do you smoke?"
        min={1}
        max={1}
        icon={<UserRound className="w-4 h-4 text-primary-text" />}
      />

      <input type="hidden" {...(useFormContext()).register("interests", {
        validate: v => (Array.isArray(v) && v.length >= 3) || "Pick at least 3 interests"
      })} />
      <input type="hidden" {...(useFormContext()).register("traits", {
        validate: v => (Array.isArray(v) && v.length >= 3) || "Pick at least 3 traits"
      })} />
    </section>
  );
}
