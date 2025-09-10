import { Select } from "/src/components/ui/Select";
import { GENDER_OPTIONS } from "/src/constants";

export const TypeSelect = ({ inputProps, error = "", className = "" }) => {
  

  return (
    <Select
      label="TYPE"
      placeholder="Select who you want to see"
      options={GENDER_OPTIONS}
      inputProps={inputProps}
      error={error}
      className={className}
      required={false}
    />
  );
};