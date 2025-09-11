import { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function toISO(d) {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISO(s) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  return Number.isNaN(date.getTime()) ? null : date;
}

function sameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function isBeforeDay(a, b) {
  if (!a || !b) return false;
  const ax = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bx = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return ax.getTime() < bx.getTime();
}

function monthMatrix(viewDate) {
  // returns array of 42 date objects (6 rows x 7 days)
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startDay = start.getDay(); 
  const gridStart = new Date(start);
  gridStart.setDate(start.getDate() - startDay);
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatLabel(valueISO, placeholder) {
  const d = parseISO(valueISO);
  if (!d) return placeholder;
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export const DateSelect = forwardRef(function DateSelect(
  {
    label = "DATE",
    placeholder = "Select a date",
    required = false,
    error = "",
    className = "",
    value = "",
    onChange = () => {},
    min,           
    max,           
    inputProps = {}, // { name, onBlur, onFocus }
  },
  triggerRef 
) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(() => {
    const parsedValue = parseISO(value);
    return parsedValue || new Date();
  });
  const panelRef = useRef(null);
  const containerRef = useRef(null);

  

  const minDate = useMemo(() => parseISO(min), [min]);
  const maxDate = useMemo(() => parseISO(max), [max]);
  const selected = useMemo(() => parseISO(value), [value]);
  const grid = useMemo(() => monthMatrix(view), [view]);

  useEffect(() => {
    const d = parseISO(value);
    if (d && !sameDay(d, view)) {
      setView(d);
    } else if (!value && !sameDay(view, new Date())) {
      setView(new Date());
    }
  }, [value, view]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const canGoPrev = !minDate || new Date(view.getFullYear(), view.getMonth(), 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const canGoNext = !maxDate || new Date(view.getFullYear(), view.getMonth(), 1) < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  };
  const goNextMonth = () => {
    if (!canGoNext) return;
    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));
  };

  const isDisabled = (d) => {
    const beforeMin = minDate && isBeforeDay(d, minDate);
    const afterMax = maxDate && isBeforeDay(maxDate, d);
    const otherMonth = d.getMonth() !== view.getMonth();
    return beforeMin || afterMax || otherMonth;
  };

  const handleSelect = (d) => {
    if (isDisabled(d)) return;
    const iso = toISO(d);
    onChange(iso);
    if (inputProps.onChange) {
      inputProps.onChange({ target: { name: inputProps.name, value: iso } });
    }
    setIsOpen(false);
  };

  const labelText = formatLabel(value, placeholder);

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      <label className="block text-sm font-medium text-primary-text mb-2">
        {label}
        {required && <span className="font-family-sans-serif">*</span>}
      </label>

      <button
        ref={triggerRef}
        type="button"
        className={`
          w-full px-4 py-4 border rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
          text-gray-900 placeholder-fade-text 
          transition-all duration-300 
          hover:shadow-md focus:shadow-lg focus:-translate-y-0.5
          flex items-center justify-between
          ${error ? "border-accent bg-primary/10" : "border-gray-200 bg-white"}
        `}
        onClick={() => setIsOpen((v) => !v)}
        onBlur={inputProps.onBlur}
        onFocus={inputProps.onFocus}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={selected ? "text-gray-900" : "text-fade-text"}>
          {labelText}
        </span>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-gray-400" />
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute z-40 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3"
        >
          <div className="flex items-center justify-between px-2 py-1">
            <button
              type="button"
              onClick={goPrevMonth}
              disabled={!canGoPrev}
              className={`p-1 rounded-md hover:bg-gray-50 ${!canGoPrev ? "opacity-40 cursor-not-allowed" : ""}`}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="text-sm font-medium">
              {view.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </div>
            <button
              type="button"
              onClick={goNextMonth}
              disabled={!canGoNext}
              className={`p-1 rounded-md hover:bg-gray-50 ${!canGoNext ? "opacity-40 cursor-not-allowed" : ""}`}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs text-fade-text px-2 mt-1 select-none">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="py-1 text-center">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 p-2">
            {grid.map((d, i) => {
              const inMonth = d.getMonth() === view.getMonth();
              const disabled = isDisabled(d);
              const isSelected = sameDay(d, selected);

              const base =
                "w-9 h-9 rounded-lg text-sm grid place-items-center transition-colors";
              const tone = isSelected
                ? "bg-primary text-white"
                : disabled
                ? inMonth
                  ? "text-fade-text"
                  : "text-fade-text"
                : inMonth
                ? "text-primary-text hover:bg-gray-50"
                : "text-fade-text";

              return (
                <button
                  key={i}
                  type="button"
                  className={`${base} ${tone}`}
                  onClick={() => handleSelect(d)}
                  disabled={disabled}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-primary flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});
