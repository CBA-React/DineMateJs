import { Select } from "../ui/Select";

export const GenderSelect = ({ inputProps, error = "", className = "" }) => {
    const GENDER_OPTIONS = [
        {value: "man", label: "Man"},
        {value: "woman", label: "Woman"},
        {value: "non-binary", label: "Non-binary"},
        {value: "agender", label: "Agender"},
        {value: "genderfluid", label: "Genderfluid"},
        {value: "prefer-not-to-say", label: "Prefer not to say"},
    ]

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