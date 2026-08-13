/* global console, process */

import { spawn } from 'node:child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  collectIconSvgEntries,
  createIconIndexSource,
  iconManifestFileName,
  normalizeCurrentColorAttributes,
  validateSvgContent,
} from './icon-utils.mjs';

const projectRoot = process.cwd();
const iconsRoot = path.join(projectRoot, 'src', 'assets', 'icons');
const svgRoot = path.join(iconsRoot, 'svg');
const generatedRoot = path.join(iconsRoot, 'generated');
const indexPath = path.join(iconsRoot, 'index.ts');
const manifestPath = path.join(generatedRoot, iconManifestFileName);

const cleanGeneratedFiles = async () => {
  await mkdir(generatedRoot, { recursive: true });

  const entries = await readdir(generatedRoot, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')))
      .map((entry) => rm(path.join(generatedRoot, entry.name))),
  );
};

const runCommand = (args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${args[0]} exited with code ${code}`));
    });
  });
};

const runSvgr = async () => {
  await runCommand([
    path.join(projectRoot, 'node_modules', '@svgr', 'cli', 'bin', 'svgr'),
    '--typescript',
    '--icon',
    '--memo',
    '--ref',
    '--no-index',
    '--no-prettier',
    '--out-dir',
    path.relative(projectRoot, generatedRoot),
    path.relative(projectRoot, svgRoot),
  ]);
};

const runPrettier = async () => {
  await runCommand([
    path.join(projectRoot, 'node_modules', 'prettier', 'bin', 'prettier.cjs'),
    '--write',
    path.relative(projectRoot, generatedRoot),
    path.relative(projectRoot, indexPath),
  ]);
};

const normalizeGeneratedIcons = async () => {
  const entries = await readdir(generatedRoot, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
      .map(async (entry) => {
        const filePath = path.join(generatedRoot, entry.name);
        const source = await readFile(filePath, 'utf8');
        const normalizedSource = normalizeCurrentColorAttributes(
          source
            .replace('import * as React from "react";\n', '')
            .replace(
              'import type { SVGProps } from "react";\nimport { Ref, forwardRef, memo } from "react";',
              "import { forwardRef, memo, type Ref, type SVGProps } from 'react';",
            ),
        );

        await writeFile(filePath, normalizedSource, 'utf8');
      }),
  );
};

const writeIconIndex = async (svgEntries) => {
  await writeFile(indexPath, createIconIndexSource(svgEntries), 'utf8');
};

const writeIconManifest = async (svgEntries) => {
  await writeFile(
    manifestPath,
    `${JSON.stringify(
      svgEntries.map(({ componentName, fileName }) => ({
        componentName,
        generatedFileName: `${componentName}.tsx`,
        sourceFileName: fileName,
      })),
      null,
      2,
    )}\n`,
    'utf8',
  );
};

const svgEntries = await collectIconSvgEntries(svgRoot);
const validationErrors = svgEntries.flatMap(({ filePath, source }) =>
  validateSvgContent(filePath, source, projectRoot),
);

if (validationErrors.length > 0) {
  console.error('Icon SVG validation failed:');
  console.error(validationErrors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

await cleanGeneratedFiles();

if (svgEntries.length > 0) {
  await runSvgr();
  await normalizeGeneratedIcons();
}

await writeIconIndex(svgEntries);
await writeIconManifest(svgEntries);
await runPrettier();

console.log(`Generated ${svgEntries.length} icon${svgEntries.length === 1 ? '' : 's'}.`);
