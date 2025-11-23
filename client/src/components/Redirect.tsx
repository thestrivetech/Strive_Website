import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface RedirectProps {
  to: string;
}

/**
 * Simple redirect component for client-side 301 redirects
 * Note: For true 301 redirects, server-side configuration is needed
 */
export function Redirect({ to }: RedirectProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Use wouter's setLocation for client-side redirect
    setLocation(to, { replace: true });
  }, [to, setLocation]);

  return null;
}
