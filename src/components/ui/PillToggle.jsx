import * as React from "react";

export function PillToggle({
  selected = false,
  disabled,
  className = "",
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full border text-sm transition-colors",
        selected
          ? "border-primary text-primary-text bg-white ring-1 ring-primary/20"
          : "border-gray-300 text-gray-700 bg-white hover:border-gray-400",
        disabled && !selected ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
