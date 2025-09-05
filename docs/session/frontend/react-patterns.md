# React Patterns - Session 2 Frontend Documentation

## Scroll Detection Hooks

### useScrollPosition Hook
```tsx
import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
```

### useIntersectionObserver Hook
```tsx
import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref: React.RefObject<Element>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}
```

### Navigation with Gradient Transitions
```tsx
import { useState, useEffect } from 'react';

export function NavigationWithGradient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-blue-900 to-purple-900 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      {/* Navigation content */}
    </nav>
  );
}
```

## Component Organization Patterns

### Lazy Loading Components
```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Component Splitting Strategy
```tsx
// Instead of one large component, split into focused components

// ❌ Avoid: Large monolithic component
function LargeComponent() {
  // 200+ lines of complex logic
}

// ✅ Good: Split into focused components
function Header() {
  // Header-specific logic
}

function ContentSection() {
  // Content-specific logic
}

function Footer() {
  // Footer-specific logic
}

function MainComponent() {
  return (
    <>
      <Header />
      <ContentSection />
      <Footer />
    </>
  );
}
```

### Custom Hook Extraction
```tsx
// Extract reusable logic into custom hooks
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
```

## State Management Patterns

### Conditional State Updates
```tsx
function Component() {
  const [state, setState] = useState(initialValue);
  
  // ✅ Good: All hooks at top level
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  
  if (isVisible) {
    return <div>Visible content</div>;
  }
  
  return <div>Hidden content</div>;
}
```

### Data Fetching with Cleanup
```tsx
function useData(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!url) return;
    
    let ignore = false;
    
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
          setLoading(false);
        }
      });
    
    return () => {
      ignore = true;
    };
  }, [url]);
  
  return { data, loading };
}
```

## Event Handling Patterns

### Window Event Listeners
```tsx
function useWindowListener(eventType: string, listener: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
}

// Usage
function PointerTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListener('pointermove', (e: PointerEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  return <div>Mouse at: {position.x}, {position.y}</div>;
}
```

### Delayed Value Updates
```tsx
function useDelayedValue<T>(value: T, delay: number): T {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return delayedValue;
}
```

## Performance Optimization Patterns

### Client-Side Rendering Detection
```tsx
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// Usage for client-only content
function ClientOnlyComponent() {
  const isClient = useIsClient();

  if (!isClient) {
    return <div>Loading...</div>; // Server-side fallback
  }

  return <div>Client-side content</div>;
}
```

### Component Memoization
```tsx
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);

  const handleClick = useCallback((id: string) => {
    onClick(id);
  }, [onClick]);

  return (
    <div>
      {processedData.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
});
```

## Best Practices

### 1. Hook Rules
- Always call hooks at the top level
- Don't call hooks inside loops, conditions, or nested functions
- Use the Rules of Hooks ESLint plugin

### 2. Component Structure
- Keep components under 300 lines
- Extract complex logic into custom hooks
- Use composition over prop drilling

### 3. State Management
- Lift state up when needed by multiple components
- Use local state for component-specific data
- Consider context for deeply nested data

### 4. Effect Dependencies
- Always include all dependencies in useEffect arrays
- Use useCallback and useMemo to stabilize dependencies
- Consider using useEffectEvent for non-reactive functions (React 18+)

### 5. Error Handling
```tsx
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error('Component error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <div>Something went wrong. Please refresh the page.</div>;
  }

  return <>{children}</>;
}
```