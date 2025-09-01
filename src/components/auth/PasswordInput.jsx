import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({ 
    label = "PASSWORD", 
    placeholder = "Enter your password", 
    required = true,
    error = "",
    className = "",
    inputProps
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = inputProps?.id ?? "password";
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="font-family-sans-serif">*</span>}
        </label>
        <div className="relative">
          <input 
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-4 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-fade-text transition-all duration-300 hover:shadow-md focus:shadow-lg focus:-translate-y-0.5 ${
              error ? 'border-accent bg-primary/10' : 'border-gray-200 bg-white'
            }`}
            placeholder={placeholder}
            {...inputProps}
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility}
            className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-fade-text hover:text-fade-text/60 transition-colors duration-200 focus:outline-none focus:text-fade-text"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
                <Eye size={24}/>
            ) : (
                <EyeOff size={24}/>
            )}
          </button>
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