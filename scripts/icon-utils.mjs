import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const iconFileNamePattern = /^ic-[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/;
export const iconManifestFileName = 'manifest.json';

export const collectSvgFiles = async (directory) => {
  let entries = [];

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectSvgFiles(entryPath);
      }

      return entry.isFile() && entry.name.toLowerCase().endsWith('.svg') ? [entryPath] : [];
    }),
  );

  return files.flat().sort();
};

export const collectIconSvgEntries = async (directory) => {
  const svgFiles = await collectSvgFiles(directory);
  const entries = await Promise.all(
    svgFiles.map(async (filePath) => ({
      componentName: getIconComponentName(filePath),
      fileName: path.basename(filePath),
      filePath,
      source: await readFile(filePath, 'utf8'),
    })),
  );

  return entries.sort((firstEntry, secondEntry) =>
    firstEntry.fileName.localeCompare(secondEntry.fileName),
  );
};

export const collectGeneratedIconFileNames = async (directory) => {
  let entries = [];

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
    .map((entry) => entry.name)
    .sort();
};

export const getIconComponentName = (filePath) => {
  const baseName = path.basename(filePath, '.svg');

  return baseName
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
};

export const createIconIndexSource = (svgEntries) => {
  const exportLines = svgEntries.map(
    ({ componentName }) =>
      `export {default as ${componentName}} from './generated/${componentName}';`,
  );

  return [
    '// This barrel file is auto-generated. Do not edit it manually.',
    '// Run `pnpm icons:generate` to rebuild icon exports.',
    ...exportLines,
    '',
  ].join('\n');
};

const neutralIconColorValuePattern = String.raw`(?:#000(?:000)?|#191f28|#1a1e27|black|var\(\s*--(?:fill|stroke)-0\s*,\s*(?:#000(?:000)?|#191f28|#1a1e27|black)\s*\))`;
const neutralIconColorValueRegExp = new RegExp(`^${neutralIconColorValuePattern}$`, 'i');

const normalizeCurrentColorValue = (value) =>
  neutralIconColorValueRegExp.test(value.trim()) ? 'currentColor' : value;

export const normalizeCurrentColorAttributes = (source) => {
  return source
    .replace(
      /\b(fill|stroke)\s*=\s*(["'])([^"']+)\2/gi,
      (match, name, quote, value) => `${name}=${quote}${normalizeCurrentColorValue(value)}${quote}`,
    )
    .replace(
      /\b(fill|stroke)\s*=\s*{\s*(["'])([^"']+)\2\s*}/gi,
      (match, name, quote, value) =>
        `${name}={${quote}${normalizeCurrentColorValue(value)}${quote}}`,
    )
    .replace(
      /\b(fill|stroke):\s*(["'])([^"']+)\2/gi,
      (match, name, quote, value) =>
        `${name}: ${quote}${normalizeCurrentColorValue(value)}${quote}`,
    )
    .replace(
      /\b(fill|stroke):\s*([^;}"'\s][^;}"'\n]*)(?=[;}"'\n]|$)/gi,
      (match, name, value) => `${name}: ${normalizeCurrentColorValue(value)}`,
    );
};

export const normalizeSvgRootSizeToViewBox = (source) => {
  const svgOpenTagMatch = source.match(/<svg\b[^>]*>/i);

  if (svgOpenTagMatch == null) {
    return source;
  }

  const svgOpenTag = svgOpenTagMatch[0];
  const viewBoxMatch = svgOpenTag.match(/\bviewBox\s*=\s*(["'])([^"']+)\1/i);

  if (viewBoxMatch == null) {
    return source;
  }

  const [, , viewBoxValue] = viewBoxMatch;
  const [, , width, height] = viewBoxValue.trim().split(/\s+/).map(Number);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return source;
  }

  const normalizedSvgOpenTag = svgOpenTag
    .replace(/\bwidth\s*=\s*(["'])[^"']+\1/i, `width="${width}"`)
    .replace(/\bheight\s*=\s*(["'])[^"']+\1/i, `height="${height}"`);

  return source.replace(svgOpenTag, normalizedSvgOpenTag);
};

export const normalizeIconSvgSource = (source) => {
  return normalizeSvgRootSizeToViewBox(normalizeCurrentColorAttributes(source));
};

export const validateSvgContent = (filePath, source, projectRoot) => {
  const errors = [];
  const fileName = path.basename(filePath);
  const relativePath = path.relative(projectRoot, filePath).split(path.sep).join('/');
  const blockedTagPattern = /<\s*(script|foreignObject|iframe|object|embed)\b/i;
  const eventAttributePattern = /\s(on[a-z][\w:-]*)\s*=/i;
  const javascriptUrlPattern = /(?:href|xlink:href)\s*=\s*["']\s*javascript:/i;
  const hrefAttributePattern = /\s(?:href|xlink:href)\s*=\s*["']([^"']*)["']/gi;

  if (!iconFileNamePattern.test(fileName)) {
    errors.push('file name must match ic-name.svg');
  }

  if (blockedTagPattern.test(source)) {
    errors.push('blocked element: script, foreignObject, iframe, object, or embed');
  }

  if (eventAttributePattern.test(source)) {
    errors.push('blocked event attribute: on*');
  }

  if (javascriptUrlPattern.test(source)) {
    errors.push('blocked javascript: URL');
  }

  for (const match of source.matchAll(hrefAttributePattern)) {
    const hrefValue = match[1].trim();

    if (hrefValue !== '' && !hrefValue.startsWith('#')) {
      errors.push(`blocked external href: ${hrefValue}`);
    }
  }

  return errors.map((message) => `${relativePath} - ${message}`);
};
