import { Select } from "/src/ui/Select";
import { GENDER_OPTIONS } from "/src/constants";

export const GenderSelect = ({ inputProps, error = "", className = "" }) => {
    

  return (
    <Select
      label="GENDER"
      placeholder="Select your gender"
      options={GENDER_OPTIONS}
      inputProps={inputProps}
      error={error}
      className={className}
      required={false}
    />
  );
};