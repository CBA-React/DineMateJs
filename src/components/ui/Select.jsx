import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const Select = ({
  label = "SELECT",
  placeholder = "Select an option",
  required = false,
  error = "",
  className = "",
  options = [],
  inputProps = {},
  value = "",
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    
    const syntheticEvent = {
      target: {
        name: inputProps.name,
        value: option.value
      }
    };
    
    onChange(option.value);
    if (inputProps.onChange) {
      inputProps.onChange(syntheticEvent);
    }
    
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className={`w-full ${className}`} ref={selectRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="font-family-sans-serif">*</span>}
      </label>
      
      <div className="relative">
        <button
          type="button"
          className={`
            w-full px-4 py-4 border rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
            text-gray-900 placeholder-fade-text 
            transition-all duration-300 
            hover:shadow-md focus:shadow-lg focus:-translate-y-0.5
            flex items-center justify-between
            ${error 
              ? 'border-accent bg-primary/10' 
              : 'border-gray-200 bg-white'
            }
          `}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={inputProps.onBlur}
          onFocus={inputProps.onFocus}
        >
          <span className={selectedOption ? "text-gray-900" : "text-fade-text"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180 text-primary" : "text-gray-400"
            }`} 
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors
                  ${selectedValue === option.value ? "bg-primary/10 text-primary" : "text-gray-900"}
                `}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
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
};