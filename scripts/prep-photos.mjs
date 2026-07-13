#!/usr/bin/env node
// Resize + re-encode a folder of photo exports (e.g. from Immich) for use in a blog post.
// Usage: npm run prep-photos -- <input-dir> <output-dir> [--width=2400] [--quality=85]

import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const SUPPORTED_EXT = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff']);

function parseArgs(argv) {
  const positional = [];
  let width = 2400;
  let quality = 85;

  for (const arg of argv) {
    if (arg.startsWith('--width=')) width = Number(arg.slice('--width='.length));
    else if (arg.startsWith('--quality=')) quality = Number(arg.slice('--quality='.length));
    else positional.push(arg);
  }

  const [inputDir, outputDir] = positional;
  if (!inputDir || !outputDir) {
    console.error('Usage: npm run prep-photos -- <input-dir> <output-dir> [--width=2400] [--quality=85]');
    process.exit(1);
  }
  return { inputDir, outputDir, width, quality };
}

async function main() {
  const { inputDir, outputDir, width, quality } = parseArgs(process.argv.slice(2));

  mkdirSync(outputDir, { recursive: true });

  const entries = readdirSync(inputDir).filter((name) => statSync(join(inputDir, name)).isFile());

  let processed = 0;
  for (const name of entries) {
    const ext = extname(name).toLowerCase();
    if (!SUPPORTED_EXT.has(ext)) {
      console.warn(`skip (unsupported type): ${name}`);
      continue;
    }

    const inputPath = join(inputDir, name);
    const outputName = `${basename(name, ext)}.jpg`;
    const outputPath = join(outputDir, outputName);
    const beforeBytes = statSync(inputPath).size;

    const image = sharp(inputPath).rotate();
    const meta = await image.metadata();

    await image
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath);

    const afterBytes = statSync(outputPath).size;
    const fmt = (n) => `${(n / 1024).toFixed(0)}KB`;
    console.log(
      `${name} -> ${outputName}  (${meta.width}x${meta.height} -> max ${width}w, ${fmt(beforeBytes)} -> ${fmt(afterBytes)})`
    );
    processed++;
  }

  console.log(`\n${processed} photo(s) written to ${outputDir}`);
}

main();
