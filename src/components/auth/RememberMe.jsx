import { Checkbox } from "../ui/Checkbox";

export function RememberMe({
  inputProps,
  label = "Remember me",
  className,
}) {
  return (
    <Checkbox
      inputProps={inputProps}
      label={label}
      className={className}
    />
  );
}
