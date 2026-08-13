/* global console, process */

import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {
  collectGeneratedIconFileNames,
  collectIconSvgEntries,
  createIconIndexSource,
  iconManifestFileName,
  normalizeIconSvgSource,
  validateSvgContent,
} from './icon-utils.mjs';

const projectRoot = process.cwd();
const iconsRoot = path.join(projectRoot, 'src', 'assets', 'icons');
const svgRoot = path.join(iconsRoot, 'svg');
const generatedRoot = path.join(iconsRoot, 'generated');
const indexPath = path.join(iconsRoot, 'index.ts');
const manifestPath = path.join(generatedRoot, iconManifestFileName);
const relativePath = (filePath) =>
  path.relative(projectRoot, filePath).split(path.sep).join('/');
const svgEntries = await collectIconSvgEntries(svgRoot);
const errors = [];

const readFileOrNull = async (filePath) => {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
};

for (const {filePath, source} of svgEntries) {
  errors.push(...validateSvgContent(filePath, source, projectRoot));

  if (normalizeIconSvgSource(source) !== source) {
    errors.push(`${relativePath(filePath)} - run \`pnpm icons:convert\``);
  }
}

const generatedFileNames = await collectGeneratedIconFileNames(generatedRoot);
const expectedGeneratedNames = svgEntries.map(
  ({componentName}) => `${componentName}.tsx`
);
const indexSource = await readFileOrNull(indexPath);
const manifestSource = await readFileOrNull(manifestPath);

if (indexSource !== createIconIndexSource(svgEntries)) {
  errors.push(`${relativePath(indexPath)} - run \`pnpm icons:generate\``);
}

if (
  JSON.stringify(generatedFileNames) !== JSON.stringify(expectedGeneratedNames)
) {
  errors.push(`${relativePath(generatedRoot)} - run \`pnpm icons:generate\``);
}

if (manifestSource == null) {
  errors.push(`${relativePath(manifestPath)} - run \`pnpm icons:generate\``);
}

if (errors.length > 0) {
  console.error('Icon SVG check failed:');
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Icon SVG validation and generated output sync passed (${svgEntries.length} files).`
  );
}
