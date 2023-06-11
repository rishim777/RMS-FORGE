module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // CSS modules :global()
    // :export
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export'],
      },
    ],
    /* using CSS modules with kebab-case is more hassle than snake_case
    overrides https://github.com/stylelint/stylelint-config-standard/blob/6ed92800d32768531aacfe940e95d6a916d47c87/index.js#L124-L129
    Ref: https://stylelint.io/user-guide/rules/regex/#enforce-a-case */
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be snake_case',
      },
    ],
    'scss/dollar-variable-pattern': null,
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['inset'],
      },
    ],
    'media-feature-range-notation': null,
  },
  ignoreFiles: ['**/*/dist/**/*.css'],
};
