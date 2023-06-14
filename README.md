To install any package locally
pnpm i path/to/package

Example for installing @rishim777/forge-text

```
pnpm i D:/Development/rms-forge/packages/text
```

Set Github Token

* in windows ```set GITHUB_TOKEN=```
* in linux/MAC ```export const GITHUB_TOKEN=```

Different command for package.json
- Mac/Linux
```
"remove-dist": "rm -rf ./packages/*/dist/"
```

- Windows
```
"remove-dist-wind": "for /d %i in (./packages/*/dist/) do rd /s /q '%i'"
```