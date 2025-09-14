#!/usr/bin/env tsx

/**
 * Advanced Image Optimization Script for Phase 3
 * Converts images to AVIF format with WebP/JPEG fallbacks
 * Generates responsive variants for different viewport sizes
 * Creates optimized image manifests for the build system
 */

import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminAvif from 'imagemin-avif';
import imageminWebP from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'attached_assets');
const outputDir = path.join(rootDir, 'client', 'src', 'assets', 'optimized');

// Responsive breakpoints for image generation
const BREAKPOINTS = [
  { width: 320, suffix: '_sm' },
  { width: 640, suffix: '_md' },
  { width: 1024, suffix: '_lg' },
  { width: 1920, suffix: '_xl' }
];

// Image quality settings for different formats
const QUALITY_SETTINGS = {
  avif: { quality: 50, effort: 6 },
  webp: { quality: 75, effort: 6 },
  jpeg: { quality: 80, progressive: true }
};

// Image categories and their optimization strategies
const IMAGE_CATEGORIES = {
  headshots: {
    path: 'headshots',
    sizes: [320, 640, 1024],
    formats: ['avif', 'webp', 'jpeg'],
    quality: { avif: 45, webp: 70, jpeg: 75 }
  },
  logos: {
    path: '',
    sizes: [200, 400, 800],
    formats: ['avif', 'webp', 'png'],
    quality: { avif: 60, webp: 85, png: 100 }
  }
};

interface ImageManifest {
  original: string;
  variants: {
    format: string;
    size: number;
    path: string;
    fileSize: number;
  }[];
  blurPlaceholder: string;
}

class ImageOptimizer {
  private manifest: Record<string, ImageManifest> = {};

  async init() {
    console.log('🎯 Phase 3: Advanced Image Optimization Starting...\n');

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Process all images in the assets directory
    await this.processDirectory(assetsDir);

    // Generate blur placeholders
    await this.generateBlurPlaceholders();

    // Save manifest file
    await this.saveManifest();

    console.log('\n✅ Image optimization completed successfully!');
    this.printSummary();
  }

  private async processDirectory(dirPath: string) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await this.processDirectory(fullPath);
      } else if (this.isImageFile(entry.name)) {
        await this.processImage(fullPath);
      }
    }
  }

  private isImageFile(filename: string): boolean {
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  }

  private async processImage(imagePath: string) {
    const relativePath = path.relative(assetsDir, imagePath);
    const basename = path.basename(imagePath, path.extname(imagePath));
    const category = this.determineCategory(relativePath);

    console.log(`📸 Processing: ${relativePath}`);

    // Get image metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      console.warn(`⚠️  Skipping ${relativePath}: Unable to read image metadata`);
      return;
    }

    const variants: ImageManifest['variants'] = [];

    // Generate variants for each size and format
    for (const size of category.sizes) {
      // Skip upscaling
      if (size > metadata.width) continue;

      for (const format of category.formats) {
        const outputPath = await this.generateVariant(
          imagePath,
          basename,
          format,
          size,
          category.quality[format as keyof typeof category.quality]
        );

        if (outputPath) {
          const stats = await fs.stat(outputPath);
          variants.push({
            format,
            size,
            path: path.relative(path.join(rootDir, 'client', 'src'), outputPath),
            fileSize: stats.size
          });
        }
      }
    }

    this.manifest[basename] = {
      original: relativePath,
      variants,
      blurPlaceholder: '' // Will be filled later
    };
  }

  private determineCategory(relativePath: string): typeof IMAGE_CATEGORIES.headshots {
    if (relativePath.includes('headshots/')) return IMAGE_CATEGORIES.headshots;
    return IMAGE_CATEGORIES.logos;
  }

  private async generateVariant(
    inputPath: string,
    basename: string,
    format: string,
    size: number,
    quality: number
  ): Promise<string | null> {
    try {
      const outputFilename = `${basename}_${size}w.${format}`;
      const outputPath = path.join(outputDir, outputFilename);

      let pipeline = sharp(inputPath).resize(size, null, {
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3
      });

      // Apply format-specific optimizations
      switch (format) {
        case 'avif':
          pipeline = pipeline.avif({
            quality,
            effort: 6,
            chromaSubsampling: '4:2:0'
          });
          break;
        case 'webp':
          pipeline = pipeline.webp({
            quality,
            effort: 6,
            method: 6
          });
          break;
        case 'jpeg':
          pipeline = pipeline.jpeg({
            quality,
            progressive: true,
            mozjpeg: true
          });
          break;
        case 'png':
          pipeline = pipeline.png({
            quality: 100,
            compressionLevel: 9,
            palette: true
          });
          break;
      }

      await pipeline.toFile(outputPath);

      console.log(`   ✓ Generated ${format.toUpperCase()} @ ${size}w`);
      return outputPath;
    } catch (error) {
      console.error(`   ✗ Failed to generate ${format} variant:`, error);
      return null;
    }
  }

  private async generateBlurPlaceholders() {
    console.log('\n🌫️  Generating blur placeholders...');

    for (const [basename, manifest] of Object.entries(this.manifest)) {
      const originalPath = path.join(assetsDir, manifest.original);

      try {
        // Generate 20x20 blur placeholder
        const blurBuffer = await sharp(originalPath)
          .resize(20, 20, { fit: 'cover' })
          .blur(1)
          .jpeg({ quality: 50 })
          .toBuffer();

        const base64 = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
        this.manifest[basename].blurPlaceholder = base64;

        console.log(`   ✓ Placeholder for ${basename}`);
      } catch (error) {
        console.error(`   ✗ Failed to generate placeholder for ${basename}:`, error);
      }
    }
  }

  private async saveManifest() {
    const manifestPath = path.join(outputDir, 'image-manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(this.manifest, null, 2));

    // Also generate TypeScript declarations
    const tsContent = `// Auto-generated image manifest
export interface ImageVariant {
  format: string;
  size: number;
  path: string;
  fileSize: number;
}

export interface ImageManifest {
  original: string;
  variants: ImageVariant[];
  blurPlaceholder: string;
}

export const imageManifest: Record<string, ImageManifest> = ${JSON.stringify(this.manifest, null, 2)};

export function getOptimizedImage(basename: string, preferredSize = 1024, preferredFormat = 'avif'): ImageVariant | null {
  const manifest = imageManifest[basename];
  if (!manifest) return null;

  // Find the best variant matching preferences
  const variant = manifest.variants.find(v =>
    v.format === preferredFormat && v.size >= preferredSize
  ) || manifest.variants.find(v =>
    v.size >= preferredSize
  ) || manifest.variants[manifest.variants.length - 1];

  return variant || null;
}

export function getImageSrcSet(basename: string, format = 'avif'): string {
  const manifest = imageManifest[basename];
  if (!manifest) return '';

  return manifest.variants
    .filter(v => v.format === format)
    .map(v => \`\${v.path} \${v.size}w\`)
    .join(', ');
}
`;

    await fs.writeFile(path.join(outputDir, 'image-manifest.ts'), tsContent);
    console.log('\n📋 Manifest files saved');
  }

  private printSummary() {
    const totalImages = Object.keys(this.manifest).length;
    const totalVariants = Object.values(this.manifest).reduce((sum, m) => sum + m.variants.length, 0);

    console.log('\n📊 Optimization Summary:');
    console.log(`   📸 Images processed: ${totalImages}`);
    console.log(`   🎨 Variants generated: ${totalVariants}`);

    // Calculate space savings
    const formatSavings: Record<string, { count: number; totalSize: number }> = {};

    for (const manifest of Object.values(this.manifest)) {
      for (const variant of manifest.variants) {
        if (!formatSavings[variant.format]) {
          formatSavings[variant.format] = { count: 0, totalSize: 0 };
        }
        formatSavings[variant.format].count++;
        formatSavings[variant.format].totalSize += variant.fileSize;
      }
    }

    console.log('\n📈 Format Distribution:');
    for (const [format, stats] of Object.entries(formatSavings)) {
      const avgSize = (stats.totalSize / stats.count / 1024).toFixed(1);
      console.log(`   ${format.toUpperCase()}: ${stats.count} files, ${avgSize}KB avg`);
    }
  }
}

// Run optimization if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const optimizer = new ImageOptimizer();
  optimizer.init().catch(console.error);
}

export default ImageOptimizer;