import { GenderSelect } from "/src/components/auth/GenderSelect";
import { TypeSelect } from "/src/components/auth/TypeSelect";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { TextArea } from "/src/components/ui/TextArea";
import { useFormContext } from "react-hook-form";

export const EditAbout = () => {
    const {
        register,
        control,
        formState: { errors },
      } = useFormContext();

    return (
        <div className="mx-auto max-w-[720px] flex flex-col gap-6">
            <GenderSelect
                    className="no-scrollbar"
                    inputProps={register("gender")}
                    error={errors.gender?.message} 
            />
            <TypeSelect
              inputProps={register("search_gender")}
              error={errors.search_gender?.message}
            />
            <DistanceSlider control={control}/>
            
            <TextArea control={control} name="description" maxLength={500} />
        </div>
    )
}