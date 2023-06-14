// Parcel doesn’t seem to understand tsconfig’s plugin: typescript-plugin-css-modules
// so we declare this and reference from each package’s src/index.ts (these are Parcel’s entry files via `source`)
// this: /// <reference types="@rishim777/forge-utils/parcel" />
declare module '*.module.scss' {
  const value: Record<string, string>;
  export default value;
}

// the following gets rid of Parcel warnings about missing types for image files
// because we’re still using `import img from 'img.png'`
// instead of `const imgURL = new URL('img.png', import.meta.url)`
// TODO: convert those, and remove these declarations
declare module '*.webp' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.jpg' {
  const value: string;
  export default value;
}
