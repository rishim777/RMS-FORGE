To install any package locally
pnpm i path/to/package

Example for installing @rishim777/forge-text

```
pnpm i D:/Development/rms-forge/packages/text
```
 "remove-dist-wind": "for /d %i in (./packages/*/dist/) do rd /s /q '%i'",
 "release-wind": "npm run wind-build && changeset publish"