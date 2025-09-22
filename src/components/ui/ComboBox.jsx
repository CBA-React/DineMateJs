import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronsUpDown, Loader2, X } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from "@/components/ui/command";
import { useDebounce } from "/src/hooks/useDebounce";

export default function ComboBox({
  label = "SELECT",
  placeholder = "Select an option",
  required = false,
  error = "",
  className = "",
  value = "",
  onChange = () => {},
  inputProps = {},
  items = [],
  onSearch,
  debounceMs = 350,
  minChars = 2,
  initialLabel = "",
  clearable = true,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(items || []);
  const [fetchError, setFetchError] = useState("");

  const debouncedQuery = useDebounce(query, debounceMs);
  const abortRef = useRef(null);
  const cacheRef = useRef(new Map());

  const isRemote = typeof onSearch === "function";

  useEffect(() => {
    if (!isRemote) setOptions(items || []);
  }, [items, isRemote]);

  useEffect(() => {
    if (!isRemote) return;

    const q = debouncedQuery.trim();
    setFetchError("");

    if (q.length < minChars) {
      setOptions([]);
      return;
    }

    if (cacheRef.current.has(q)) {
      setOptions(cacheRef.current.get(q));
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    Promise.resolve(onSearch(q, { signal: controller.signal }))
      .then((arr) => {
        const list = Array.isArray(arr) ? arr : [];
        cacheRef.current.set(q, list);
        setOptions(list);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") {
          setFetchError("Failed to load options. Try again.");
          setOptions([]);
        }
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery, isRemote, minChars, onSearch]);

  const labelByValue = useMemo(() => {
    const map = new Map();
    (options || []).forEach((o) => map.set(String(o.value), o.label));
    return map;
  }, [options]);

  const selectedLabel =
    labelByValue.get(value != null ? String(value) : "") || initialLabel || "";

  const fireChange = (nextValue) => {
    onChange(nextValue);
    inputProps.onChange?.({
      target: { name: inputProps.name, value: nextValue },
    });
  };

  const handleSelect = (opt) => {
    setOpen(false);
    fireChange(opt.value);
  };

  const clearSelection = (e) => {
    e?.stopPropagation?.();
    fireChange("");
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="font-family-sans-serif">*</span>}
      </label>

      <input type="hidden" name={inputProps.name} value={value || ""} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            onBlur={inputProps.onBlur}
            onFocus={(e) => {
              inputProps.onFocus?.(e);
              setOpen(true);
            }}
            className={`
              w-full px-4 py-4 border rounded-xl
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              text-gray-900 placeholder-fade-text
              transition-all duration-300
              hover:shadow-md focus:shadow-lg focus:-translate-y-0.5
              flex items-center justify-between
              ${error
                ? "border-accent bg-primary/10"
                : "border-gray-200 bg-white"}
            `}
          >
            <span
              className={
                selectedLabel ? "text-gray-900" : "text-fade-text"
              }
            >
              {selectedLabel || placeholder}
            </span>

            <div className="flex items-center gap-1">
              {clearable && selectedLabel && (
                <X
                  size={16}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={clearSelection}
                />
              )}
              <ChevronsUpDown
                size={16}
                className="text-gray-400 transition-transform duration-200"
              />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent 
          className="p-0 bg-white rounded-xl border-0 z-50"
          style={{ 
            width: 'var(--radix-popover-trigger-width)',
            boxShadow: 'var(--shadow-box)'
          }}
          sideOffset={4}
          align="start"
        >
          <Command className="px-4 py-3" shouldFilter={!isRemote}>
            <CommandInput
              value={query} 
              onValueChange={setQuery}
              placeholder={isRemote ? "Type to search…" : "Filter…"}
              autoFocus
              className="border-b border-fade-text/20 text-base text-primary-text bg-transparent"
            />
            <CommandList className="bg-white max-h-60 overflow-y-auto no-scrollbar">
              {loading && (
                <div className="px-4 py-3 flex items-center gap-2 text-sm text-fade-text">
                  <Loader2 className="animate-spin" size={16} /> Loading…
                </div>
              )}
              {!loading && fetchError && (
                <div className="px-4 py-3 text-sm text-accent">
                  {fetchError}
                </div>
              )}
              <CommandEmpty className="px-4 py-6 text-center text-sm text-fade-text">
                {isRemote && debouncedQuery.trim().length < minChars
                  ? `Type at least ${minChars} characters`
                  : "No results found."}
              </CommandEmpty>

              {(options || []).map((opt) => (
                <CommandItem
                  key={String(opt.value)}
                  value={opt.label}
                  onSelect={() => handleSelect(opt)}
                  className="
                    command-item w-full px-4 py-3 text-left cursor-pointer
                    text-primary-text
                    hover:bg-primary-text/5 hover:text-primary-text
                    transition-colors duration-200
                    border-b border-fade-text/10 last:border-b-0
                  "
                >
                  {opt.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="mt-2 text-sm text-accent flex items-center gap-1">
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
}