#!/usr/bin/env node
// Compress images in public/images in place.
// - Downscales images whose longest edge exceeds MAX_EDGE (never upscales).
// - Recompresses JPEG (mozjpeg) and PNG, keeping the same filename/format so
//   existing imports/references keep working.
// - Only overwrites a file when the result is actually smaller.
//
// Usage:
//   node scripts/compress-images.mjs           // compress in place
//   node scripts/compress-images.mjs --dry     // report only, write nothing
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve('public', 'images');
const MAX_EDGE = 1280; // px; plenty for retina display of all current images
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const DRY_RUN = process.argv.includes('--dry');

const exts = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function compressOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return null;

  const original = await readFile(file);
  const image = sharp(original, { failOn: 'none' });
  const meta = await image.metadata();

  // Downscale only if larger than the cap.
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  if (longest > MAX_EDGE) {
    image.resize({
      width: meta.width >= meta.height ? MAX_EDGE : undefined,
      height: meta.height > meta.width ? MAX_EDGE : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  if (ext === '.png') {
    image.png({
      compressionLevel: 9,
      palette: true,
      quality: PNG_QUALITY,
      effort: 8,
    });
  } else {
    image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const output = await image.toBuffer();
  return { original, output, before: original.length, after: output.length };
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for await (const file of walk(ROOT)) {
    let result;
    try {
      result = await compressOne(file);
    } catch (err) {
      console.warn(`skip  ${path.relative(ROOT, file)} (${err.message})`);
      continue;
    }
    if (!result) continue;

    const rel = path.relative(ROOT, file);
    // Keep whichever is smaller; skip negligible/negative gains.
    if (result.after < result.before) {
      totalBefore += result.before;
      totalAfter += result.after;
      changed += 1;
      const pct = ((1 - result.after / result.before) * 100).toFixed(0);
      console.log(
        `${DRY_RUN ? 'would ' : ''}save  ${rel}: ${fmt(result.before)} -> ${fmt(result.after)} (-${pct}%)`,
      );
      if (!DRY_RUN) await writeFile(file, result.output);
    } else {
      console.log(`keep  ${rel}: already optimal (${fmt(result.before)})`);
    }
  }

  console.log('-'.repeat(50));
  console.log(`${changed} file(s) ${DRY_RUN ? 'would be ' : ''}compressed`);
  if (totalBefore > 0) {
    const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(0);
    console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (-${pct}%)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
