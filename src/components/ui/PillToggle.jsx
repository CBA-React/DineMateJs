import * as React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function PillToggle({
  selected = false,
  disabled,
  onClick,
  children,
  className = "",
  unstyled = false,
  baseClassName = "px-4 py-2 rounded-full border text-sm transition-colors",
  selectedClassName,
  unselectedClassName,
  disabledClassName = "opacity-50 cursor-not-allowed",
}) {
  const defaultSelected   = "border-primary text-primary-text bg-white ring-1 ring-primary/20";
  const defaultUnselected = "border-gray-300 text-gray-700 bg-white hover:border-gray-400";

  const stateClass = unstyled
    ? ""
    : selected
      ? (selectedClassName ?? defaultSelected)
      : (unselectedClassName ?? defaultUnselected);

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        clsx(
          baseClassName,
          disabled && !selected ? disabledClassName : "cursor-pointer",
          stateClass,
          className
        )
      )}
    >
      {children}
    </button>
  );
}
