// @ts-check
/* eslint-disable no-console */
import util from 'util';
import childProcess from 'child_process';
import fs from 'fs/promises';
import { argv } from 'process';
import path from 'path';

import { packageScope, packagePrefix, createPackageJson } from './package.config.mjs';
import { createStorybookFile } from './storybook-template.mjs';
import { createComponentFile } from './component-template.mjs';

const exec = util.promisify(childProcess.exec);
const relativePath = './packages';
/**
 * Transforms snakeCased string into PascalCase string
 *
 * @param {string} str any string
 * @returns {string}
 */
const snakeToPascalCase = (str) =>
  str
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');

/**
 * Create initial lerna package
 *
 * @param {string} lernaPackageName name of the lerna supported package
 */
async function createLernaPackage(lernaPackageName) {
  console.log(`🔧 Creating new lerna package [${lernaPackageName}]...`);
  await exec(`lerna create ${lernaPackageName} --description "TODO" --access "restricted" --yes`);
}

/**
 * Creates Folder and Files for initial component
 *
 * @param {string} packageName name of the package
 */
async function setupFolderStructureAndFiles(packageName) {
  console.log('🗃️  Setting up folders and starter files for you...');
  const pkgDir = `${path.join('./packages', packageName)}`;

  // // creating a folder in relative path
  // await exec(`mkdir ${pkgDir}`);
  // await exec(`mkdir  ${path.join(pkgDir, 'src')}`);
  // // await exec(`rd /s /q ${path.join(relativePath, `${packagePrefix}-${packageName}`)}`);
  // // await exec(`move ${path.join(relativePath, `${packagePrefix}-${packageName}`)}  ${pkgDir}`);

  await exec(`move ${path.join('./packages', packagePrefix)}-${packageName} ${pkgDir}`);

  // remove lerna defaults
  await exec(`rd /s /q ${path.join(pkgDir, '__tests__')}`);
  await exec(`rd /s /q ${path.join(pkgDir, 'lib')}`);

  await exec(`mkdir  ${path.join(pkgDir, 'src')}`);

  const componentName = snakeToPascalCase(packageName);
  const defaultReadmeFile = 'README.md';
  const rootIndexFile = 'index.ts';
  const defaultIndexFile = 'index.ts';
  const defaultComponentFile = `${componentName}.tsx`;
  const defaultScssFile = `${componentName}.module.scss`;
  const defaultStorybookFile = `${componentName}.stories.tsx`;

  // package-name/README.md
  const defaultReadmeFileContent = `This package is part of [rms-forge](https://github.com/rishim777/rms-forge). See the repo for more details.`;
  // package-name/index.ts
  const rootIndexFileContent = `export * from './src';`;
  // package-name/src/index.ts
  const defaultIndexFileContent = `/// <reference types='@rishim777/forge-utils/parcel' />
  export * from './${componentName}';`;

  const defaultScssFileContent = '.container { padding: 40px; }';
  const defaultComponentFileContent = createComponentFile(componentName);
  const defaultStorybookFileContent = createStorybookFile(componentName);

  await exec(`echo ${defaultReadmeFileContent} > ${path.join(pkgDir, defaultReadmeFile)}`);
  await exec(`echo ${rootIndexFileContent} > ${path.join(pkgDir, rootIndexFile)}`);
  await exec(`echo ${defaultScssFileContent} > ${path.join(pkgDir, 'src', defaultScssFile)}`);

  fs.writeFile(path.join(pkgDir, 'src', defaultIndexFile), defaultIndexFileContent);
  fs.writeFile(path.join(pkgDir, 'src', defaultComponentFile), defaultComponentFileContent);
  fs.writeFile(path.join(pkgDir, 'src', defaultStorybookFile), defaultStorybookFileContent);
}

/**
 * Creates and update core configurations
 *
 * @param {string} packageName name of the package
 */
async function setupConfigurations(packageName) {
  console.log('📋 Generating configuration files...');
  const pkgDir = `${path.join(relativePath, packageName)}`;

  const packageJSON = createPackageJson({ packageName });

  // replace Lerna created package.json
  await fs.writeFile(`${path.join(pkgDir, 'package.json')}`, JSON.stringify(packageJSON, null, 2));
}

/**
 * Extracts mandatory input for scaffolding process based on shell input
 *
 * @param {string[]} shellArgvs node argv value
 * @returns
 */
function getMandatoryInput(shellArgvs) {
  const packageName = shellArgvs[2];

  if (!packageName) {
    throw Error('Package name have to be specified!');
  }

  const lernaPackageName = `${packageScope}/${packagePrefix}-${packageName}`;

  return { packageName, lernaPackageName };
}

/**
 * Prints success execution process
 *
 * @param {string} lernaPackageName name of the lerna supported package
 * @param {string} packageName name of the package
 */
function printSuccess(lernaPackageName, packageName) {
  console.log(
    `🐉 Customized lerna package [${lernaPackageName}] is now ready on ./packages/${packageName}.`,
  );
}

(async function main() {
  try {
    console.error('>>> RTS 🟡 UI SCAFFOLD <<<\n');
    const { packageName, lernaPackageName } = getMandatoryInput(argv);
    await createLernaPackage(lernaPackageName);
    await setupFolderStructureAndFiles(packageName);
    await setupConfigurations(packageName);
    await exec(`npx prettier --write packages/${packageName}`);
    await exec('pnpm i')
      .then((res) => {})
      .catch((err) => console.log(err));

    await printSuccess(lernaPackageName, packageName);
    console.error('\n>>> RTS 🟡 UI SCAFFOLD DONE <<<\n');
  } catch (err) {
    console.error('🟥 ERROR!', err.message);
  }
})();
