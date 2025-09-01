import * as React from "react";
import { Controller } from "react-hook-form";

export function TextArea({
  control,
  name = "about",
  label = "About you*",
  placeholder = "Tell potential matches about yourself, your interests, and what you're looking for...",
  minLength = 0,
  maxLength = 500,
  required = true,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Tell us a little about you" : false,
        minLength: minLength
          ? { value: minLength, message: `Minimum ${minLength} characters` }
          : undefined,
        maxLength: { value: maxLength, message: `Maximum ${maxLength} characters` },
      }}
      render={({ field, fieldState: { error } }) => {
        const count = field.value?.length ?? 0;
        const over = count > maxLength;
        const errMsg = error?.message;

        return (
          <div className="space-y-2">
            <div className="text-primary-text uppercase text-sm">About you*</div>

            <label className="sr-only" htmlFor={`${name}-textarea`}>{label}</label>
            <textarea
              id={`${name}-textarea`}
              className={[
                "w-full h-32 rounded-lg border px-4 py-3 text-[15px] leading-6",
                "placeholder:text-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400",
                errMsg ? "border-red-400" : "border-gray-300",
              ].join(" ")}
              placeholder={placeholder}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              maxLength={maxLength}                 
              aria-invalid={errMsg ? "true" : "false"}
              aria-describedby={`${name}-help`}
            />

            <div id={`${name}-help`} className={`text-sm ${over ? "text-red-500" : "text-gray-400"}`}>
              {count}/{maxLength} characters
            </div>

            {errMsg && (
              <p className="mt-2 text-sm text-primary flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errMsg}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
