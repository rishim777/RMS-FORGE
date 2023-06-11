// @ts-check
export const packageScope = '@rms';
export const packagePrefix = 'ui';

/**
 * Function to create package.json
 *
 * @param {Object} option - Option object
 * @param {string} option.packageName - Name of the package
 */
export function createPackageJson({ packageName }) {
  return {
    name: `${packageScope}/${packagePrefix}-${packageName}`,
    version: '0.0.0',
    description: 'rms-forge {TODO} Component',
    keywords: [],
    author: 'Rishi Mishra',
    homepage: `https://github.com/rishim777/rms-forge/tree/main/packages/ui-${packageName}#readme`,
    license: 'ISC',
    main: 'dist/index.js',
    type: 'module',
    types: 'dist/types.d.ts',
    source: 'src/index.ts',
    files: ['dist', 'src'],
    sideEffects: ['*.css', '*.jpg', '*.png', '*.webp', '*.mp4'], // so Parcel will bundle them
    directories: {
      lib: 'dist',
      test: '__tests__',
    },
    dependencies: {
      classnames: '^2.3.2',
      '@rms/forge-utils': 'workspace:*',
    },
    devDependencies: {
      // '@rms/forge-design-tokens': 'workspace:*',
    },
    peerDependencies: {
      react: '^17.0.2',
    },
    repository: {
      type: 'git',
      url: 'git@github.com:rishim777/rms-forge.git',
    },
    bugs: {
      url: 'https://github.com/rishim777/rms-forge/issues',
    },
    publishConfig: {
      access: 'restricted',
    },
    sass: {
      includePaths: ['./node_modules'],
    },
    browserslist: '>0.1% in ID, not dead',
  };
}
