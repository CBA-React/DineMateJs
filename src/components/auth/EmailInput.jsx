export const EmailInput = ({ 
    label = "EMAIL", 
    placeholder = "Enter your email",  
    required = true,
    error = "",
    className = "",
    inputProps
  }) => {
    const id = inputProps?.id ?? "email";
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="font-family-sans-serif">*</span>}
        </label>
        <input 
          type="email" 
          className={`w-full px-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-fade-text transition-all duration-300 hover:shadow-md focus:shadow-lg focus:-translate-y-0.5 ${
            error ? 'border-accent bg-primary/10' : 'border-gray-200 bg-white'
          }`}
          placeholder={placeholder}
          {...inputProps}
        />
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