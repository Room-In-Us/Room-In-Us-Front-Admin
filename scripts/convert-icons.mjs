/* global console, process */

import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {
  collectIconSvgEntries,
  normalizeIconSvgSource,
  validateSvgContent,
} from './icon-utils.mjs';

const projectRoot = process.cwd();
const iconsRoot = path.join(projectRoot, 'src', 'assets', 'icons');
const svgRoot = path.join(iconsRoot, 'svg');
const svgEntries = await collectIconSvgEntries(svgRoot);
const errors = [];
let convertedCount = 0;

for (const {filePath} of svgEntries) {
  const source = await readFile(filePath, 'utf8');
  errors.push(...validateSvgContent(filePath, source, projectRoot));

  if (errors.length > 0) {
    continue;
  }

  const normalizedSource = normalizeIconSvgSource(source);

  if (normalizedSource !== source) {
    await writeFile(filePath, normalizedSource, 'utf8');
    convertedCount += 1;
  }
}

if (errors.length > 0) {
  console.error('Icon SVG conversion failed:');
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Converted ${convertedCount} of ${svgEntries.length} icon SVG files.`
  );
}
