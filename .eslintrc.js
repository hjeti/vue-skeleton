// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:vue/recommended'],
  plugins: ['import', 'prettier', 'vue'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build-tools/config/webpack/webpack.base.conf.js',
      },
    },
  },
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
        ts: 'never',
      },
    ],
    // strongly-recommended rules fails with vue-types
    // https://github.com/dwightjack/vue-types/issues/29
    'vue/require-default-prop': 0,
    // allow debugger during development
    'no-debugger': 2,
    'no-console': 1,
    'no-param-reassign': 0,
    // only for use with getter-setters
    'no-underscore-dangle': 0,
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'all', printWidth: 100, tabWidth: 2 },
    ],
  },
  overrides: [
    {
      "files": [ "src/**/*.vue"],
      "rules": {
        'prettier/prettier': [
          'off'
        ],
      },
    },
  ],
};
