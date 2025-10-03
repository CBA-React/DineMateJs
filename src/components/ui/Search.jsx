import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import clsx from "clsx";
import { useIsMobile } from "/src/hooks/useIsMobile";

export const Search = ({
  onSubmit = (q) => {},
  placeholder = "Search",
  className = "",
}) => {
  const isMobile = useIsMobile();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (open && wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (
        (e.key === "/" || (e.ctrlKey && e.key.toLowerCase() === "k")) &&
        !open
      ) {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (isMobile) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const query = q.trim();
      onSubmit(query);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={clsx(
          "flex items-center gap-2 w-full rounded-full bg-white px-4 py-3 relative",
          className
        )}
      >
        <SearchIcon size={20} className="text-primary-text shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-medium relative outline-none placeholder:text-fade-text text-primary-text"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="rounded-full p-1 hover:bg-gray-100 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </form>
    );
  }
  
  const submitDesktop = (e) => {
    e.preventDefault();
    const query = q.trim();
    onSubmit(query);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) setTimeout(() => inputRef.current?.focus(), 60);
        }}
        className="bg-white p-3 rounded-full hover:shadow-sm max-w-min"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open search"
      >
        <SearchIcon size={20} />
      </button>

      <div
        className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+0.5rem)] z-[60]"
        aria-hidden={!open}
      >
        <form
          onSubmit={submitDesktop}
          className={clsx(
            "w-[16rem] sm:w-[22rem] lg:w-[28rem]",
            "rounded-full bg-white",
            "transform-gpu origin-right transition-all duration-200",
            open ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-2 p-3">
            <SearchIcon size={18} className="text-primary-text shrink-0" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="flex-1 outline-none placeholder:text-fade-text bg-transparent"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="rounded-full p-1 hover:bg-gray-100 text-gray-400"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
