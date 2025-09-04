import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E",
  loading = "lazy",
  onLoad,
  onError
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!imageRef || loading === "eager") {
      // If loading is eager, load immediately
      if (loading === "eager") {
        setImageSrc(src);
      }
      return;
    }

    // Create intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observerRef.current?.unobserve(imageRef);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before image enters viewport
      }
    );

    observerRef.current.observe(imageRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [imageRef, src, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-50"
        } ${isError ? "opacity-30" : ""} w-full h-full object-cover`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        data-testid="lazy-image"
      />
      
      {/* Loading overlay */}
      {!isLoaded && !isError && imageSrc !== placeholder && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-muted/10 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">
            Failed to load image
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;