import { NumberInput } from "../ui/NumberInput";

export const AgeSelect = ({ inputProps, error = "", className = "" }) => {
  return (
    <NumberInput
      label="AGE"
      placeholder="Select your age"
      min={18}
      max={100}
      error={error}
      className={className}
      inputProps={inputProps}
    />
  );
};