export const Checkbox = ({
  inputProps,
  label,
  className,
  error = "",
}) => {
  const id = inputProps?.id ?? "checkbox";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="inline-flex items-center gap-3 cursor-pointer select-none"
      >
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          {...inputProps}
        />

        <span
          aria-hidden
          className="
            relative h-5 w-5 rounded-full border-2 border-gray-400 transition
            peer-checked:border-primary
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-2

            after:content-[''] after:absolute after:rounded-full after:bg-primary
            after:h-2.5 after:w-2.5 after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
            after:scale-0 after:transition-transform after:duration-150
            peer-checked:after:scale-100
          "
        />

        <span className="text-fade-text peer-checked:text-primary-text">
          {label}
        </span>
      </label>
      
      {error && (
        <p className="mt-1 text-sm text-primary flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}