import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({
  open,
  onClose,
  children,
  className = "",
  closeOnBackdrop = true,
  closeOnEsc = true,
  initialFocusRef,
  ariaLabel = "Dialog",
}) => {
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => (document.documentElement.style.overflow = overflow);
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open) return;
    const el = initialFocusRef?.current || contentRef.current;
    setTimeout(() => {
      const focusable = el?.querySelector?.(
        'button,a,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus?.();
    }, 0);
  }, [open, initialFocusRef]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-[4px]"
          aria-label={ariaLabel}
          aria-modal="true"
          role="dialog"
          onMouseDown={(e) => {
            if (closeOnBackdrop && e.target === backdropRef.current) onClose?.();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid h-full w-full place-items-center">
            <motion.div
              ref={contentRef}
              className={`w-full max-w-2xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 ${className}`}
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
