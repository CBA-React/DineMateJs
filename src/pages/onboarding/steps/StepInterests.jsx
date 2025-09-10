import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { Grid2X2, UserRound } from "lucide-react";

const ALL_INTERESTS = ["Hiking","Photography","Cooking","Travel","Yoga","Reading","Dancing","Movies","Art","Sports","Theater","Meditation","Gardening"];
const ALL_TRAITS    = ["Adventurous","Foodie","Optimistic","Creative","Introverted","Extroverted","Spontaneous","Planner","Ambitious","Laid-back","Romantic","Intellectual","Athletic","Artistic"];
const ALL_ALCOHOL    = ["Not for me","I don't drink","I try not to drink", "I drink on special occasions", "I drink with company on weekends", "Almost every evening"];
const ALL_SMOKE    = ["I smoke for company", "With alcohol", "I don't smoke", "I smoke", "I'm trying to quit"];

export function StepInterests() {
  const { control, setValue, register } = useFormContext();

  const alcoholSel = useWatch({ control, name: "alcohol" });
  const smokeSel   = useWatch({ control, name: "smoke" }); 

  useEffect(() => {
    const habits = [];
    const alcohol = Array.isArray(alcoholSel) ? alcoholSel[0] : undefined;
    const smoking = Array.isArray(smokeSel) ? smokeSel[0] : undefined;

    if (smoking) habits.push({ type: "smoking", value: smoking });
    if (alcohol) habits.push({ type: "alcohol", value: alcohol });

    setValue("habits", habits, { shouldValidate: true, shouldDirty: true });
  }, [alcoholSel, smokeSel, setValue]);

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
        name="tags"
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

      <input type="hidden" {...register("interests", {
        validate: v => (Array.isArray(v) && v.length >= 3) || "Pick at least 3 interests"
      })} />
      <input type="hidden" {...register("tags", {
        validate: v => (Array.isArray(v) && v.length >= 3) || "Pick at least 3 traits"
      })} />
      <input
        type="hidden"
        {...register("habits", {
          validate: (v) =>
            (Array.isArray(v) &&
              v.some((h) => h?.type === "smoking" && h.value) &&
              v.some((h) => h?.type === "alcohol" && h.value)) ||
            "Pick smoking and alcohol options",
        })}
      />
    </section>
  );
}
