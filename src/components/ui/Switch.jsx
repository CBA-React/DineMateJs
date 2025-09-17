export const Switch = ({ checked, onChange, disabled = false, className = "", size = "md", label }) => {
    const sizes = {
      sm: { track: "h-5 w-9", thumb: "h-4 w-4", inset: "top-0.5", translate: "translate-x-4" },
      md: { track: "h-[22px] w-10", thumb: "h-[18px] w-[18px]", inset: "top-0.5", translate: "translate-x-4.5" },
      lg: { track: "h-7 w-14", thumb: "h-6 w-6", inset: "top-0.5", translate: "translate-x-7" },
    };
    const s = sizes[size] ?? sizes.md;
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange?.(!checked); }
          if (e.key === "ArrowLeft") onChange?.(false);
          if (e.key === "ArrowRight") onChange?.(true);
        }}
        className={`relative inline-flex items-center rounded-[100px] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 ${className}`}
      >
        <span
          className={`block ${s.track} rounded-full shadow-inner transition-colors ${checked ? "bg-[#ff002b]" : "bg-neutral-300"} ${disabled ? "opacity-50" : ""}`}
        />
        <span
          className={`absolute ${s.inset} left-0.5 ${s.thumb} rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? s.translate : "translate-x-0"}`}
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,.15)" }}
        />
      </button>
    );
  }