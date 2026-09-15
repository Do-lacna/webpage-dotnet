#!/usr/bin/env node
// Fetch remote logo and save into public/images/ so it becomes reachable at /images/usetri-logo.png
// Safe to run multiple times; skips download if file already exists and has non-zero size.
import { writeFile, stat } from 'fs/promises';
import { mkdirSync, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';

const pipe = promisify(pipeline);

const remoteUrl = 'https://usetrislovensko.sk/images/usetri-logo.png';
const targetDir = path.resolve('public', 'images');
const targetFile = path.join(targetDir, 'usetri-logo.png');

async function main() {
  try {
    mkdirSync(targetDir, { recursive: true });
    let exists = false;
    try {
      const s = await stat(targetFile);
      exists = s.size > 0;
    } catch {}

    if (exists) {
      console.log('[fetch-logo] Logo already present, skipping download.');
      return;
    }

    console.log('[fetch-logo] Downloading logo from', remoteUrl);
    const res = await fetch(remoteUrl);
    if (!res.ok) {
      throw new Error('Failed to download logo: ' + res.status + ' ' + res.statusText);
    }
    const writeStream = createWriteStream(targetFile);
    await pipe(res.body, writeStream);
    // Basic sanity check
    const s = await stat(targetFile);
    if (s.size === 0) throw new Error('Downloaded file is empty');
    console.log('[fetch-logo] Saved to', targetFile);
  } catch (err) {
    console.warn('[fetch-logo] Warning:', err.message);
    console.warn('[fetch-logo] You can manually place the file at public/images/usetri-logo.png');
    // Create a placeholder SVG so the path still resolves
    if (!targetFile.endsWith('.png')) return;
    const placeholderPath = path.join(targetDir, 'usetri-logo-placeholder.svg');
    await writeFile(placeholderPath, '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="#0a0a0a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="14">Logo missing</text></svg>');
    console.log('[fetch-logo] Placeholder created at', placeholderPath);
  }
}

main();

