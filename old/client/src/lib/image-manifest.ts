/**
 * Phase 3: Optimized Image Manifest
 * Generated image variants with AVIF/WebP formats and responsive sizes
 */

// Import optimized images
import GarrettHeadshotAVIF320 from '@/assets/optimized/Garrett-Headshot_320w.avif';
import GarrettHeadshotAVIF640 from '@/assets/optimized/Garrett-Headshot_640w.avif';
import GarrettHeadshotAVIF1024 from '@/assets/optimized/Garrett-Headshot_1024w.avif';
import GarrettHeadshotWebP320 from '@/assets/optimized/Garrett-Headshot_320w.webp';
import GarrettHeadshotWebP640 from '@/assets/optimized/Garrett-Headshot_640w.webp';
import GarrettHeadshotWebP1024 from '@/assets/optimized/Garrett-Headshot_1024w.webp';
import GarrettHeadshotBlur from '@/assets/optimized/Garrett-Headshot_blur.jpg';

import GrantHeadshotAVIF320 from '@/assets/optimized/Grant-Headshot_320w.avif';
import GrantHeadshotAVIF640 from '@/assets/optimized/Grant-Headshot_640w.avif';
import GrantHeadshotAVIF1024 from '@/assets/optimized/Grant-Headshot_1024w.avif';
import GrantHeadshotWebP320 from '@/assets/optimized/Grant-Headshot_320w.webp';
import GrantHeadshotWebP640 from '@/assets/optimized/Grant-Headshot_640w.webp';
import GrantHeadshotWebP1024 from '@/assets/optimized/Grant-Headshot_1024w.webp';
import GrantHeadshotBlur from '@/assets/optimized/Grant-Headshot_blur.jpg';

import JeffHeadshotAVIF320 from '@/assets/optimized/Jeff-Headshot_320w.avif';
import JeffHeadshotAVIF640 from '@/assets/optimized/Jeff-Headshot_640w.avif';
import JeffHeadshotAVIF1024 from '@/assets/optimized/Jeff-Headshot_1024w.avif';
import JeffHeadshotWebP320 from '@/assets/optimized/Jeff-Headshot_320w.webp';
import JeffHeadshotWebP640 from '@/assets/optimized/Jeff-Headshot_640w.webp';
import JeffHeadshotWebP1024 from '@/assets/optimized/Jeff-Headshot_1024w.webp';
import JeffHeadshotBlur from '@/assets/optimized/Jeff-Headshot_blur.jpg';

import StriveLogoAVIF320 from '@/assets/optimized/strive_logo_320w.avif';
import StriveLogoAVIF640 from '@/assets/optimized/strive_logo_640w.avif';
import StriveLogoAVIF1024 from '@/assets/optimized/strive_logo_1024w.avif';
import StriveLogoWebP320 from '@/assets/optimized/strive_logo_320w.webp';
import StriveLogoWebP640 from '@/assets/optimized/strive_logo_640w.webp';
import StriveLogoWebP1024 from '@/assets/optimized/strive_logo_1024w.webp';
import StriveLogoBlur from '@/assets/optimized/strive_logo_blur.jpg';

export interface ImageVariant {
  format: 'avif' | 'webp';
  size: 320 | 640 | 1024;
  url: string;
  width: number;
}

export interface OptimizedImageSet {
  name: string;
  variants: ImageVariant[];
  blurPlaceholder: string;
  defaultSrc: string;
  srcSet: {
    avif: string;
    webp: string;
  };
}

// Image variant data with actual imports
export const imageManifest: Record<string, OptimizedImageSet> = {
  'Garrett-Headshot': {
    name: 'Garrett-Headshot',
    variants: [
      { format: 'avif', size: 320, url: GarrettHeadshotAVIF320, width: 320 },
      { format: 'avif', size: 640, url: GarrettHeadshotAVIF640, width: 640 },
      { format: 'avif', size: 1024, url: GarrettHeadshotAVIF1024, width: 1024 },
      { format: 'webp', size: 320, url: GarrettHeadshotWebP320, width: 320 },
      { format: 'webp', size: 640, url: GarrettHeadshotWebP640, width: 640 },
      { format: 'webp', size: 1024, url: GarrettHeadshotWebP1024, width: 1024 },
    ],
    blurPlaceholder: GarrettHeadshotBlur,
    defaultSrc: GarrettHeadshotWebP1024,
    srcSet: {
      avif: `${GarrettHeadshotAVIF320} 320w, ${GarrettHeadshotAVIF640} 640w, ${GarrettHeadshotAVIF1024} 1024w`,
      webp: `${GarrettHeadshotWebP320} 320w, ${GarrettHeadshotWebP640} 640w, ${GarrettHeadshotWebP1024} 1024w`
    }
  },

  'Grant-Headshot': {
    name: 'Grant-Headshot',
    variants: [
      { format: 'avif', size: 320, url: GrantHeadshotAVIF320, width: 320 },
      { format: 'avif', size: 640, url: GrantHeadshotAVIF640, width: 640 },
      { format: 'avif', size: 1024, url: GrantHeadshotAVIF1024, width: 1024 },
      { format: 'webp', size: 320, url: GrantHeadshotWebP320, width: 320 },
      { format: 'webp', size: 640, url: GrantHeadshotWebP640, width: 640 },
      { format: 'webp', size: 1024, url: GrantHeadshotWebP1024, width: 1024 },
    ],
    blurPlaceholder: GrantHeadshotBlur,
    defaultSrc: GrantHeadshotWebP1024,
    srcSet: {
      avif: `${GrantHeadshotAVIF320} 320w, ${GrantHeadshotAVIF640} 640w, ${GrantHeadshotAVIF1024} 1024w`,
      webp: `${GrantHeadshotWebP320} 320w, ${GrantHeadshotWebP640} 640w, ${GrantHeadshotWebP1024} 1024w`
    }
  },

  'Jeff-Headshot': {
    name: 'Jeff-Headshot',
    variants: [
      { format: 'avif', size: 320, url: JeffHeadshotAVIF320, width: 320 },
      { format: 'avif', size: 640, url: JeffHeadshotAVIF640, width: 640 },
      { format: 'avif', size: 1024, url: JeffHeadshotAVIF1024, width: 1024 },
      { format: 'webp', size: 320, url: JeffHeadshotWebP320, width: 320 },
      { format: 'webp', size: 640, url: JeffHeadshotWebP640, width: 640 },
      { format: 'webp', size: 1024, url: JeffHeadshotWebP1024, width: 1024 },
    ],
    blurPlaceholder: JeffHeadshotBlur,
    defaultSrc: JeffHeadshotWebP1024,
    srcSet: {
      avif: `${JeffHeadshotAVIF320} 320w, ${JeffHeadshotAVIF640} 640w, ${JeffHeadshotAVIF1024} 1024w`,
      webp: `${JeffHeadshotWebP320} 320w, ${JeffHeadshotWebP640} 640w, ${JeffHeadshotWebP1024} 1024w`
    }
  },

  'strive_logo': {
    name: 'strive_logo',
    variants: [
      { format: 'avif', size: 320, url: StriveLogoAVIF320, width: 320 },
      { format: 'avif', size: 640, url: StriveLogoAVIF640, width: 640 },
      { format: 'avif', size: 1024, url: StriveLogoAVIF1024, width: 1024 },
      { format: 'webp', size: 320, url: StriveLogoWebP320, width: 320 },
      { format: 'webp', size: 640, url: StriveLogoWebP640, width: 640 },
      { format: 'webp', size: 1024, url: StriveLogoWebP1024, width: 1024 },
    ],
    blurPlaceholder: StriveLogoBlur,
    defaultSrc: StriveLogoWebP1024,
    srcSet: {
      avif: `${StriveLogoAVIF320} 320w, ${StriveLogoAVIF640} 640w, ${StriveLogoAVIF1024} 1024w`,
      webp: `${StriveLogoWebP320} 320w, ${StriveLogoWebP640} 640w, ${StriveLogoWebP1024} 1024w`
    }
  }
};

/**
 * Get optimized image set for a given image name
 */
export function getOptimizedImage(imageName: string): OptimizedImageSet | null {
  return imageManifest[imageName] || null;
}

/**
 * Get the best image variant for given preferences
 */
export function getBestImageVariant(
  imageName: string,
  preferredSize: 320 | 640 | 1024 = 1024,
  preferredFormat: 'avif' | 'webp' = 'avif'
): ImageVariant | null {
  const imageSet = getOptimizedImage(imageName);
  if (!imageSet) return null;

  // Find exact match first
  let variant = imageSet.variants.find(v =>
    v.format === preferredFormat && v.size === preferredSize
  );

  // Fallback to same format, different size
  if (!variant) {
    variant = imageSet.variants.find(v => v.format === preferredFormat);
  }

  // Fallback to any variant with preferred size
  if (!variant) {
    variant = imageSet.variants.find(v => v.size === preferredSize);
  }

  // Last resort: return first available variant
  return variant || imageSet.variants[0] || null;
}

/**
 * Generate srcSet string for a given format
 */
export function generateSrcSet(imageName: string, format: 'avif' | 'webp' = 'avif'): string {
  const imageSet = getOptimizedImage(imageName);
  if (!imageSet) return '';

  const variants = imageSet.variants.filter(v => v.format === format);
  return variants.map(v => `${v.url} ${v.width}w`).join(', ');
}

/**
 * Check if browser supports AVIF format
 */
export async function checkAVIFSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = () => resolve(true);
    avif.onerror = () => resolve(false);
    // Minimal AVIF test image
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

/**
 * Check if browser supports WebP format
 */
export async function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webp = new Image();
    webp.onload = () => resolve(true);
    webp.onerror = () => resolve(false);
    // Minimal WebP test image
    webp.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  });
}