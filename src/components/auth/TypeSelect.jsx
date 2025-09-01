import { Select } from "../ui/Select";

export const TypeSelect = ({ inputProps, error = "", className = "" }) => {
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