import React from 'react';
import { cn } from '@/lib/utils';

interface ComingSoonBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating' | 'hero';
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
    floating: 'bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white backdrop-blur-sm',
    hero: 'bg-gradient-to-br from-[#020a1c] via-purple-900 to-[#020a1c] text-white border border-[#ff7033]/20'
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full font-medium shadow-sm',
        'coming-soon-badge',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      Coming September 15th
    </span>
  );
}