import * as React from "react";
import { Controller } from "react-hook-form";
import { PillToggle } from "./PillToggle";

export function PillMultiSelectSection({
  control,
  name,
  options,
  title,
  icon,
  min = 0,
  max = Infinity,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (v) =>
          (Array.isArray(v) && v.length >= min) || `Pick at least ${min} ${title.toLowerCase()}`,
      }}
      render={({ field, fieldState }) => {
        const selected = Array.isArray(field.value) ? field.value : [];
        const canAddMore = selected.length < max;

        const toggle = (item) => {
          if (selected.includes(item)) {
            field.onChange(selected.filter((x) => x !== item));
          } else if (canAddMore) {
            field.onChange([...selected, item]);
          }
        };

        const counterColor = selected.length < min ? "text-primary" : "text-gray-500";

        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon}
                <span className="uppercase text-sm text-primary-text">{title}</span>
              </div>
              {Number.isFinite(max) && (
                <span className={`text-sm ${counterColor}`}>({selected.length}/{max})</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {options.map((opt) => {
                const isSelected = selected.includes(opt);
                const disabled = !isSelected && !canAddMore;
                return (
                  <PillToggle
                    key={opt}
                    className="px-5 py-[5.5px]"
                    selected={isSelected}
                    disabled={disabled}
                    onClick={() => toggle(opt)}
                  >
                    {opt}
                  </PillToggle>
                );
              })}
            </div>

            {fieldState.error?.message && (
              <p className="text-sm text-primary mt-1">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
