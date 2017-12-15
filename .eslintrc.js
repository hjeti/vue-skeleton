// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['html', 'import', 'prettier'],
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
};
