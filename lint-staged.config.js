const config = require('./build-tools/config/config');

const defaultSettings = ['prettier --write', 'git add'];

const jsLintCommand = 'eslint --ext .js,.vue --cache';
const tsLintCommand = 'tslint -p tsconfig.json';
const scssLintCommand = 'stylelint --cache';

const jsSettings = config.lintStaged.eslintEnabled
  ? [...defaultSettings, jsLintCommand]
  : [...defaultSettings];

const vueSettings = config.lintStaged.eslintEnabled ? [jsLintCommand] : [];

const tsSettings = config.lintStaged.tslintEnabled
  ? [...defaultSettings, tsLintCommand]
  : [...defaultSettings];

const scssSettings = config.lintStaged.stylelintEnabled
  ? [...defaultSettings, scssLintCommand]
  : [...defaultSettings];

module.exports = {
  'src/**/*.js': jsSettings,
  'src/**/*.vue': vueSettings,
  'src/**/*.ts': tsSettings,
  'src/**/*.scss': scssSettings,
};
