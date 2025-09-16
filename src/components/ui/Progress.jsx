'use client';
import React from 'react';
import clsx from 'clsx';

export const Progress = ({
  value = 0,                      
  className,
  thickness = 2,                  
  rounded = 'rounded-full',
  trackClass = 'bg-primary-text/10',     
  barClass = 'bg-primary',        
  animated = true,
  showLabel = false,
  label,
  showValue = false,
}) => {
  const v = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || showValue) && (
        <div className="mb-1 flex items-baseline justify-between text-sm">
          {showLabel && <span className="font-medium text-gray-900">{label}</span>}
          {showValue && <span className="font-medium text-gray-900">{v}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v}
        className={clsx('relative w-full', rounded)}
        style={{ height: thickness }}
      >
        <div className={clsx('absolute inset-0', trackClass, rounded)} />
        <div
          className={clsx('absolute left-0 top-0 h-full', barClass, rounded, animated && 'transition-[width] duration-500')}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
