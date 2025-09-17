import { useFormContext } from "react-hook-form";
import { RadioPillGroup } from "/src/components/ui/RadioPillGroup";
import { Q1, Q2, Q3 } from "/src/constants";

export const EditQuiz = () => {
  const { control } = useFormContext();

  return (
    <div className="mx-auto max-w-[720px] space-y-8">
      <RadioPillGroup
        control={control}
        name="quiz.additionalProp1"
        title="How do you recharge after a long day?"
        options={Q1}
        rules={{ required: "Pick an option" }}
      />

      <hr className="my-6 border-primary-text/15" />

      <RadioPillGroup
        control={control}
        name="quiz.additionalProp2"
        title="When planning a date, you prefer to:"
        options={Q2}
        rules={{ required: "Pick an option" }}
      />

      <hr className="my-6 border-primary-text/15" />

      <RadioPillGroup
        control={control}
        name="quiz.additionalProp3"
        title="Your approach to trying new cuisines:"
        options={Q3}
        rules={{ required: "Pick an option" }}
      />
    </div>
  );
};
