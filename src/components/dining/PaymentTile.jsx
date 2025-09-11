import { forwardRef } from "react";
import clsx from "clsx";

export const PaymentTile = forwardRef(function PaymentTile(
  {
    title,
    subtitle,
    note = "",
    checked = false,
    onChange = () => {},
    disabled = false,
    className = "",
  },
  ref
) {
  const base =
    "w-full text-left rounded-xl p-4 bg-[#DBDBDB]/25 transition select-none " +
    (disabled ? "opacity-60 cursor-not-allowed " : "cursor-pointer ");
  const tone = checked
    ? "bg-accent/10 "
    : "border-gray-200 bg-[#DBDBDB]/25 hover:bg-gray-50 ";

  return (
    <button
      type="button"
      ref={ref}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => !disabled && onChange()}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange();
        }
      }}
      className={base + tone + className}
    >
      <div className="flex items-start gap-3">
        <span
          className={
            "mt-1 inline-flex items-center justify-center w-5 h-5 shrink-0 rounded-full border " +
            (checked ? "border-primary" : "border-fade-text")
          }
          aria-hidden="true"
        >
          <span
            className={
              "w-4 h-4 rounded-full " +
              (checked ? "bg-primary" : "bg-transparent")
            }
          />
        </span>

        <div className="min-w-0">
          <h4 className="text-primary-text text-[22px]">{title}</h4>
          {subtitle
            ? (typeof subtitle === "string"
                ? <div className="text-fade-text">{subtitle}</div>
                : subtitle)
            : null}

          {note
            ? <div className={clsx("mt-1", checked ? "text-primary" : "text-fade-text")}>{note}</div>
            : null}
        </div>
      </div>
    </button>
  );
});

export default PaymentTile;
