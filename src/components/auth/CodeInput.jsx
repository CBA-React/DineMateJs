import {forwardRef, useEffect, useState, useRef } from "react";

export const VerificationCodeInput = forwardRef(({ inputProps, error, length = 6 }, ref) => {
    const [values, setValues] = useState(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);
  const { onChange, onBlur, name } = inputProps;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const emit = (nextValues) => {
    const code = nextValues.join("");
    onChange({ target: { name, value: code } });
  };


  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const next = [...values];
    next[index] = value;
    setValues(next);
    emit(next);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!values[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        setFocusedIndex(index - 1);
      } else {
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
        
        onChange(newValues.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
      setFocusedIndex(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    
    if (pastedData) {
      const newValues = [...values];
      const pastedDigits = pastedData.slice(0, length).split('');
      
      pastedDigits.forEach((digit, index) => {
        if (index < length) {
          newValues[index] = digit;
        }
      });
      
      setValues(newValues);

      onChange(newValues.join(''));
      
      const nextIndex = Math.min(pastedDigits.length, length - 1);
      inputRefs.current[nextIndex].focus();
      setFocusedIndex(nextIndex);
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    onBlur();
  };

  return (
    <div className="w-full">
      <label className="block text-sm text-primary-text mb-2">
        VERIFICATION CODE *
      </label>
      
      <div className="grid grid-cols-6 gap-2 mb-5 md:mb-10">
        {values.map((value, index) => (
          <input
            key={index}
            ref={el => {
              inputRefs.current[index] = el;
              if (index === 0) ref?.(el);
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onPaste={handlePaste}
            className={`
              min-h-12
                text-center text-lg font-medium
              border-2 rounded-lg
              transition-all duration-200 ease-in-out
              focus:outline-none
              ${focusedIndex === index
                ? 'border-primary ring-2 ring-primary/50' 
                : value 
                  ? 'border-primary-text/15 bg-gray-50' 
                  : 'border-gray-200'
              }
              hover:border-gray-300
              ${error ? 'border-primary' : ''}
            `}
          />
        ))}
      </div>
      
      {error && (
          <p className="mt-2 text-sm text-primary flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
      )}
      
      <input
        type="hidden"
        name={name}
        value={values.join('')}
      />
    </div>
  );
});

VerificationCodeInput.displayName = 'VerificationCodeInput';