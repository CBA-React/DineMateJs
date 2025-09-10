import { useFormContext } from "react-hook-form";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { TextArea } from "/src/components/ui/TextArea";
import { GenderSelect } from "/src/components/auth/GenderSelect";
import { TypeSelect } from "/src/components/auth/TypeSelect";

export function StepAbout() {
  const { control, register, formState: { errors} } = useFormContext();

  return (
    <section className="grid gap-8">
      <GenderSelect
        className="no-scrollbar"
        inputProps={register("gender")}
        error={errors.gender?.message} />
      <TypeSelect
        inputProps={register("search_gender")}
        error={errors.search_gender?.message}
      />
      <DistanceSlider control={control}/>

      <TextArea control={control} name="description" maxLength={500} />
    </section>
  );
}
