import ComboBox from "/src/components/ui/ComboBox";
import getCities from "/src/services/citiesService";

export const LocationComboBox = ({
  label = "LOCATION",
  placeholder = "City, state",
  required = true,
  error = "",
  className = "",
  inputProps = {},
  value = "",            
  onChange = () => {},
  minChars = 2,
  debounceMs = 350,
  initialLabel = "",   
}) => {
  const onSearch = async (q, { signal }) => {
    const data = await getCities(q, { signal });
    const cities = Array.isArray(data?.cities) ? data.cities : [];

    const map = new Map();
    for (const c of cities) {
      const label = `${c.name}, ${c.country_code}`;
      if (!map.has(label)) map.set(label, { value: label, label, raw: c });
    }
    return Array.from(map.values());
  };

  return (
    <ComboBox
      label={label}
      placeholder={placeholder}
      required={required}
      error={error}
      className={className}
      inputProps={inputProps}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      minChars={minChars}
      debounceMs={debounceMs}
      initialLabel={initialLabel}
    />
  );
}
