import * as React from "react";
import { Controller } from "react-hook-form";
import { RadioPill } from "./RadioPill";

export function RadioPillGroup({
  control,
  name,
  title,
  options,
  rules,
  requiredMessage = "Please choose an option",
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules ?? (requiredMessage ? { required: requiredMessage } : undefined)}
      render={({ field, fieldState }) => (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium uppercase">{title}</span>
          </div>

          <div role="radiogroup" aria-label={title} className="grid gap-3">
            {options.map((opt) => (
              <RadioPill
                key={opt}
                checked={field.value === opt}
                onChange={() => field.onChange(opt)}
              >
                {opt}
              </RadioPill>
            ))}
          </div>

          {fieldState.error?.message && (
            <p className="text-sm text-primary">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
