import { useFormContext } from "react-hook-form";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { TextArea } from "/src/components/ui/TextArea";
import { GenderSelect } from "/src/components/auth/GenderSelect";
import { TypeSelect } from "/src/components/auth/TypeSelect";

export function StepAbout() {
  const { control } = useFormContext();

  return (
    <section className="grid gap-8">
      <GenderSelect
        className="no-scrollbar"
      />
      <TypeSelect />
      <DistanceSlider control={control} />

      <TextArea control={control} maxLength={500} />
    </section>
  );
}
