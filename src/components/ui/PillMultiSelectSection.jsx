import * as React from "react";
import { Controller } from "react-hook-form";
import { PillToggle } from "./PillToggle";
import clsx from "clsx";
import { twMerge } from 'tailwind-merge';

export function PillMultiSelectSection({
  control,
  name,
  options,
  title,
  icon,
  min = 0,
  max = Infinity,
  wrap = true,
  className,
  pillClassName,
  pillBaseClassName,
  pillSelectedClassName,
  pillUnselectedClassName,
  pillDisabledClassName,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (v) => {
          if (min === 0) return true;
          return (Array.isArray(v) && v.length >= min) || `Pick at least ${min} ${title.toLowerCase()}`;
        },
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
          <div className={twMerge(clsx("space-y-3", className))}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon}
                <span className="uppercase text-sm text-primary-text">{title}</span>
              </div>
              {Number.isFinite(max) && (
                <span className={`text-sm ${counterColor}`}>({selected.length}/{max})</span>
              )}
            </div>

            <div className={clsx("flex gap-2 overflow-scroll no-scrollbar", wrap && "flex-wrap")}>
              {options.map((opt) => {
                const isSelected = selected.includes(opt);
                const disabled = !isSelected && !canAddMore;

                return (
                  <PillToggle
                    key={opt}
                    selected={isSelected}
                    disabled={disabled}
                    onClick={() =>
                      isSelected
                        ? field.onChange(selected.filter((x) => x !== opt))
                        : canAddMore && field.onChange([...selected, opt])
                    }
                    baseClassName={pillBaseClassName ?? "px-5 py-[5.5px] rounded-full text-sm text-nowrap"}
                    selectedClassName={pillSelectedClassName}
                    unselectedClassName={pillUnselectedClassName}
                    disabledClassName={pillDisabledClassName}
                    className={pillClassName}
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
