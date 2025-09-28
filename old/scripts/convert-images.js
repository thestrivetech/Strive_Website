import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertToAVIF() {
  const inputDir = path.join(__dirname, '..', 'client', 'src', 'assets');
  const outputDir = path.join(__dirname, '..', 'client', 'src', 'assets', 'optimized');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  console.log('🎯 Starting AVIF conversion...\n');

  // List of images to convert
  const images = [
    'Grant-Headshot.webp',
    'Garrett-Headshot.webp',
    'Jeff-Headshot.webp',
    'strive_logo.webp'
  ];

  for (const imageFile of images) {
    const inputPath = path.join(inputDir, imageFile);
    const basename = path.parse(imageFile).name;

    try {
      // Check if file exists
      await fs.access(inputPath);

      console.log(`📸 Processing: ${imageFile}`);

      // Generate AVIF variants
      const sizes = [320, 640, 1024];
      for (const size of sizes) {
        const avifOutput = path.join(outputDir, `${basename}_${size}w.avif`);
        const webpOutput = path.join(outputDir, `${basename}_${size}w.webp`);

        // AVIF conversion
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .avif({ quality: 50, effort: 6 })
          .toFile(avifOutput);

        // WebP fallback
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(webpOutput);

        console.log(`   ✓ Generated ${size}w variants`);
      }

      // Generate blur placeholder
      const blurOutput = path.join(outputDir, `${basename}_blur.jpg`);
      await sharp(inputPath)
        .resize(20, 20, { fit: 'cover' })
        .blur(1)
        .jpeg({ quality: 50 })
        .toFile(blurOutput);

      console.log(`   ✓ Generated blur placeholder\n`);

    } catch (error) {
      console.error(`❌ Error processing ${imageFile}:`, error.message);
    }
  }

  console.log('✅ Image conversion completed!');
}

convertToAVIF().catch(console.error);