import * as React from "react";

export function RadioPill({ checked, disabled, onChange, children }) {
  return (
    <label
      className={[
        "px-4 py-2 rounded-full border text-sm cursor-pointer w-fit select-none transition-colors",
        checked
          ? "border-primary text-primary-text bg-white ring-1 ring-primary/20"
          : "border-gray-300 text-fade-text bg-white hover:border-gray-400",
        disabled && !checked ? "opacity-50 cursor-not-allowed" : ""
      ].join(" ")}
    >

      <input
        type="radio"
        className="sr-only"
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </label>
  );
}
