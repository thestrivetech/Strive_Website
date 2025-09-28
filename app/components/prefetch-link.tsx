import React, { useCallback, ReactNode } from 'react';
import { Link } from 'wouter';
import { usePrefetch, ROUTE_PREFETCH_MAP } from '@/hooks/usePrefetch';

interface PrefetchLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetchDelay?: number; // Delay in ms before prefetching (default 100ms)
  onClick?: () => void;
}

/**
 * Enhanced Link component that prefetches data on hover
 * Improves perceived navigation performance
 */
export const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  href,
  children,
  className,
  prefetchDelay = 100,
  onClick,
}) => {
  const prefetchHooks = usePrefetch();

  const handleMouseEnter = useCallback(() => {
    const timer = setTimeout(() => {
      // Check if route has specific prefetch requirements
      const prefetchFunction = ROUTE_PREFETCH_MAP[href as keyof typeof ROUTE_PREFETCH_MAP];

      if (prefetchFunction && prefetchFunction in prefetchHooks) {
        const fn = prefetchHooks[prefetchFunction as keyof typeof prefetchHooks];
        if (typeof fn === 'function') {
          (fn as () => void)();
        }
      }
    }, prefetchDelay);

    return () => clearTimeout(timer);
  }, [href, prefetchDelay, prefetchHooks]);

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
    >
      <div onMouseEnter={handleMouseEnter} onFocus={handleMouseEnter}>
        {children}
      </div>
    </Link>
  );
};

export default PrefetchLink;