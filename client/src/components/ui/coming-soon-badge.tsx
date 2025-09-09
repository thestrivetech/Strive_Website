import React from 'react';
import { cn } from '@/lib/utils';

interface ComingSoonBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating';
}

export function ComingSoonBadge({ 
  className, 
  size = 'sm',
  variant = 'default'
}: ComingSoonBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const variantClasses = {
    default: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
    floating: 'bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white backdrop-blur-sm'
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full font-medium shadow-sm',
        'animate-pulse',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      Coming October 1st, 2025
    </span>
  );
}