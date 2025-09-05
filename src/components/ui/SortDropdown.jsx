import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const SortDropdown = ({
  options = [],                 
  value,                         
  defaultValue,                  
  onChange = () => {},
  className = "",
  menuClassName = "",
  labelPrefix = "Sort by:",
}) => {
  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? options[0]?.value);
  const currentValue = isControlled ? value : innerValue;

  const selected = useMemo(
    () => options.find(o => o.value === currentValue) ?? options[0],
    [currentValue, options]
  );

  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, options.findIndex(o => o.value === currentValue))
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex(i => Math.min(options.length - 1, i + 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex(i => Math.max(0, i - 1)); }
      if (e.key === "Enter") {
        const opt = options[activeIndex];
        if (opt) select(opt);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, options, activeIndex]);

  const select = (opt) => {
    if (!isControlled) setInnerValue(opt.value);
    onChange(opt.value);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-primary-text
                   hover:shadow-sm transition cursor-pointer"
      >
        <span className="text-gray-500"> {labelPrefix} </span>
        <span className="font-semibold">{selected?.label}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          className={`absolute z-10 left-0 mt-2 w-[min(84vw,225px)] rounded-2xl bg-white shadow-lg ring-1 ring-black/10 overflow-hidden ${menuClassName}`}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === currentValue;
            const isActive = i === activeIndex;
            return (
              <button
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => select(opt)}
                className={`w-full text-left px-5 py-3 text-lg
                            ${isSelected ? "bg-rose-100/60" : isActive ? "bg-gray-50" : "bg-white"}
                            text-primary-text transition`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
