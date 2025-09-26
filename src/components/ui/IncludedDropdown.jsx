'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { ButtonCustom } from './ButtonCustom';

export const IncludedDropdown = ({
  title = "What's Included",
  items = [], 
  defaultOpen = false,
  className,
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={clsx('rounded-[10px] bg-accent/10 p-4', className)}>
      <ButtonCustom
        type="button"
        aria-expanded={open}
        className="w-full flex items-center justify-between rounded-lg text-left text-base font-medium text-gray-900"
        onClick={() => setOpen(v => !v)}
      >
        <h4 className="text-[22px]">{title}</h4>
        <ChevronDown
          className={clsx('transition-transform', open && 'rotate-180')}
          size={20}
        />
      </ButtonCustom>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-3 ">
              {items.map((it, i) => (
                <div
                  key={i}
                  className="rounded-[10px] bg-white p-3 text-primary-text"
                >
                  {it.label && (
                    <div className="text-sm uppercase tracking-wide">
                      {it.label}
                    </div>
                  )}
                  <div className="mt-0.5 flex items-center gap-2">
                    {it.icon ? <it.icon size={20} className="text-accent" strokeWidth={1.25} /> : null}
                    <span className="md:text-xl">{it.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
