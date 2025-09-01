import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export const NumberInput = ({
  label = "NUMBER",
  placeholder = "Enter number",
  required = false,
  error = "",
  className = "",
  min = 18,
  max = 100,
  inputProps = {},
  value = "",
  onChange = () => {},
}) => {
  const [inputValue, setInputValue] = useState(String(value ?? ""));

  useEffect(() => {
    setInputValue(String(value ?? ""));
  }, [value]);

  const {
    name,
    id,
    onChange: rhfOnChange,
    onBlur: rhfOnBlur,
    onFocus: rhfOnFocus,
    ref,
    ...rest
  } = inputProps || {};

  const emitToRHF = (val) => {
    const syntheticEvent = { target: { name, value: val } };
    onChange(val);         
    rhfOnChange?.(syntheticEvent);
  };

  const handleIncrement = () => {
    const current = Number.isNaN(parseInt(inputValue, 10))
      ? min
      : parseInt(inputValue, 10);
    if (current < max) {
      const next = String(current + 1);
      setInputValue(next);
      emitToRHF(next);
    }
  };

  const handleDecrement = () => {
    const current = Number.isNaN(parseInt(inputValue, 10))
      ? min
      : parseInt(inputValue, 10);
    if (current > min) {
      const next = String(current - 1);
      setInputValue(next);
      emitToRHF(next);
    }
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;

    if (raw === "" || /^\d+$/.test(raw)) {
      const n = parseInt(raw, 10);
      if (raw === "" || Number.isNaN(n) || n <= max) {
        setInputValue(raw);
        emitToRHF(raw);
      }
    }
  };

  const handleInputBlur = (e) => {
    let n = parseInt(inputValue, 10);

    if (Number.isNaN(n)) {
      if (required) {
      n = min;
      } else {
        rhfOnBlur?.(e);
        return;
      }
    }

    n = Math.min(max, Math.max(min, n));
    const clamped = String(n);
    setInputValue(clamped);
    emitToRHF(clamped);
    rhfOnBlur?.(e);
  };

  const parsed = parseInt(inputValue, 10);

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="font-family-sans-serif">*</span>}
      </label>
      
      <div className="relative">
        <input
          {...rest}                 
          type="text"
          inputMode="numeric"
          name={name}
          id={id}
          ref={ref}                
          className={`
            w-full px-4 py-4 pr-12 border rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
            text-gray-900 placeholder-fade-text 
            transition-all duration-300 
            hover:shadow-md focus:shadow-lg focus:-translate-y-0.5
            ${error ? "border-accent bg-primary/10" : "border-gray-200 bg-white"}
          `}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}  
          onBlur={handleInputBlur}
          onFocus={rhfOnFocus}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            type="button"
            onClick={handleIncrement}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            disabled={!Number.isFinite(parsed) ? false : parsed >= max}
          >
            <ChevronUp
              size={12}
              className={`transition-colors ${
                Number.isFinite(parsed) && parsed >= max
                  ? "text-gray-300"
                  : "text-gray-400 hover:text-primary"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            disabled={Number.isFinite(parsed) && parsed <= min}
          >
            <ChevronDown
              size={12}
              className={`transition-colors ${
                Number.isFinite(parsed) && parsed <= min
                  ? "text-gray-300"
                  : "text-gray-400 hover:text-primary"
              }`}
            />
          </button>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-primary flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};