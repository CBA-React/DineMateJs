import { useFormContext } from "react-hook-form";
import { RadioPillGroup } from "/src/components/ui/RadioPillGroup";

const Q1 = [
  "Quiet time alone or with a book",
  "Intimate dinner with close friends",
  "Social gathering or party"
];
const Q2 = [
  "Plan every detail in advance",
  "Have a general idea and go with the flow",
  "Be completely spontaneous"
];
const Q3 = [
  "I prefer familiar foods",
  "I'll try most things once",
  "The more exotic, the better!"
];

export function StepQuiz() {
  const { control } = useFormContext();

  return (
    <section className="space-y-8">
      <RadioPillGroup
        control={control}
        name="q1"
        title="How do you recharge after a long day?"
        options={Q1}
      />

      <hr className="my-6 border-primary-text/15" />

      <RadioPillGroup
        control={control}
        name="q2"
        title="When planning a date, you prefer to:"
        options={Q2}
      />

      <hr className="my-6 border-primary-text/15" />

      <RadioPillGroup
        control={control}
        name="q3"
        title="Your approach to trying new cuisines:"
        options={Q3}
      />
    </section>
  );
}
