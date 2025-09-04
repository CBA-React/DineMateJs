'use client';

import React from 'react';
import clsx from 'clsx';


const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

const byTone = {
  gray: {
    soft: 'bg-gray-50 text-gray-700 border border-gray-200',
    solid: 'bg-gray-900 text-white',
    outline: 'text-gray-700 border border-gray-300 bg-transparent',
  },
  emerald: {
    soft: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    solid: 'bg-emerald-600 text-white',
    outline: 'text-emerald-700 border border-emerald-300 bg-transparent',
  },
  rose: {
    soft: 'bg-accent/10 text-primary-text border-0',
    solid: 'bg-accent/50 text-primary-text',
    outline: 'text-primary-text bg-transparent border border-accent',
  },
  blue: {
    soft: 'bg-blue-50 text-blue-700 border border-blue-100',
    solid: 'bg-blue-600 text-white',
    outline: 'text-blue-700 border border-blue-300 bg-transparent',
  },
  purple: {
    soft: 'bg-purple-50 text-purple-700 border border-purple-100',
    solid: 'bg-purple-600 text-white',
    outline: 'text-purple-700 border border-purple-300 bg-transparent',
  },
  amber: {
    soft: 'bg-amber-50 text-amber-800 border border-amber-100',
    solid: 'bg-amber-500 text-white',
    outline: 'text-amber-700 border border-amber-300 bg-transparent',
  },
};

export const Badge = ({
  children,
  className,
  variant = 'soft', 
  tone = 'gray',
  size = 'sm', 
  pill = true,
  leftIcon,
  rightIcon,
  dot,
  ...props
}) => {
  const base = 'inline-flex items-center gap-1.5 whitespace-nowrap select-none';
  const rounded = pill ? 'rounded-full' : 'rounded-md';
  const v =
    variant === 'chip'
      ? 'bg-white text-gray-700 border border-gray-200 shadow-sm'
      : variant === 'glass'
      ? 'bg-white/90 text-gray-900 border border-white/80 backdrop-blur'
      : byTone[tone][variant];

  return (
    <span className={clsx(base, rounded, sizeStyles[size], v, className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {leftIcon && <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{rightIcon}</span>}
    </span>
  );
}

export const StatusBadge = ({ open }) => {
  return (
    <Badge
      variant="soft"
      tone={open ? 'emerald' : 'rose'}
      size="sm"
      className="font-medium shadow-sm"
    >
      {open ? 'Open' : 'Closed'}
    </Badge>
  );
}

export const RatingBadge = ({ rating }) => {
  return (
    <Badge variant="glass" size="sm" className="font-semibold" title={`${rating} rating`}>
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-accent" aria-hidden>
        <path
          fill="currentColor"
          d="M10 1.5l2.7 5.47 6.03.88-4.36 4.26 1.03 6.01L10 15.71 4.6 18.12l1.03-6.01L1.27 7.85l6.03-.88L10 1.5z"
        />
      </svg>
      {Number(rating).toFixed(1)}
    </Badge>
  );
}

export const TagBadge = ({ children }) => {
  return (
    <Badge className="rounded-sm border-0 bg-accent/10" tone='rose' variant='soft' size="sm">
      {children}
    </Badge>
  );
}
