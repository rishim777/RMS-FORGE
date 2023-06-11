# `@rms/forge-design-tokens`

Collections of (S)CSS files, variables, and mixins as Tiket Passport’s design
token.

## Installation

```shell
# if you’ve installed @rms/forge, you don’t need to install this package separately
npm install @rms/forge-design-tokens
```

## Usage

Import once in your app. If using `NEXT PROJECT`, do this in
`pages/_app.page.tsx`

### Base styles

Importing `base.css` will include:

1. Normalize
2. Reset
3. Design tokens in the form of CSS variables

```tsx
import '@rms/forge-design-tokens/base.css';
```

For available design tokens: browser inspect `:root`

