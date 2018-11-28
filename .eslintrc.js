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
  extends: ['airbnb-base', 'prettier', 'plugin:vue/recommended', 'plugin:vue-types/strongly-recommended'],
  plugins: ['import', 'prettier', 'vue'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build-tools/config/webpack/webpack.conf.base.js',
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
