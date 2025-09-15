'use client';
import React from 'react';
import clsx from 'clsx';
import { User } from 'lucide-react';
import { Progress } from '/src/components/ui/Progress';
import { useMemo } from 'react';

const TEXT = {
    wrapperTitle: "Spots filled",
}

export const EventSpotsProgress = ({     
  attending,            
  capacity,             
  ages,                 
  className,
  barClass = 'bg-primary',
  trackClass = 'bg-primary-text/10',
  boxed = false,        
}) => {
  const v = useMemo(() => Math.max(0, Math.min(100, Number(attending / capacity * 100) || 0)).toFixed(1), [attending, capacity]);

  const Wrapper = ({ children }) =>
    boxed ? (
      <div className={clsx('rounded-[10px] bg-white p-4', className)}>{children}</div>
    ) : (
      <div className={className}>{children}</div>
    );

  return (
    <Wrapper>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-primary-text">{TEXT.wrapperTitle}</span>
        <span className="font-medium text-primary-text">{v}%</span>
      </div>

      <Progress
        value={v}
        thickness={3}
        rounded="rounded-none"     
        trackClass={trackClass}
        barClass={barClass}
        animated
        className="mt-2"
      />

      {(attending !== undefined || ages) && (
        <div className="mt-2 flex items-center gap-1 text-sm text-fade-text">
          <User size={16} className="opacity-70" />
          <span>
            {attending !== undefined && capacity !== undefined ? (
              <>
                <span>{attending}</span>/{capacity} attending
              </>
            ) : null}
            {ages ? <> {attending !== undefined && capacity !== undefined ? ' • ' : null} {"Ages "}{ages}</> : null}
          </span>
        </div>
      )}
    </Wrapper>
  );
}
