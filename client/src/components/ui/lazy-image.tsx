import { useState, useEffect, useRef, memo } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: "lazy" | "eager";
  width?: number | string;
  height?: number | string;
  srcSet?: string;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo(({
  src,
  alt,
  className = "",
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E",
  loading = "lazy",
  width,
  height,
  srcSet,
  sizes,
  fetchPriority,
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
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height && { height: typeof height === 'number' ? `${height}px` : height })
      }}
    >
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        srcSet={srcSet}
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${isError ? "opacity-30" : ""} w-full h-full object-cover`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        data-testid="lazy-image"
      />

      {/* Enhanced skeleton loading */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0">
          {/* Skeleton gradient animation */}
          <div className="w-full h-full bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 animate-pulse">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite'
                 }}
            />
          </div>

          {/* Loading indicator for non-placeholder images */}
          {imageSrc !== placeholder && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-muted/10 flex items-center justify-center">
          <div className="text-muted-foreground text-sm text-center p-4">
            <div className="w-8 h-8 mx-auto mb-2 opacity-50">
              ⚠️
            </div>
            Failed to load image
          </div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage;