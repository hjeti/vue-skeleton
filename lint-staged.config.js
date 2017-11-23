const config = require('./build-tools/config');

const defaultSettings = ['prettier --write', 'git add'];

const jsSettings = config.lintStaged.eslintEnabled
  ? [...defaultSettings, 'eslint src --ext .js --cache']
  : [...defaultSettings];

const tsSettings = config.lintStaged.tslintEnabled
  ? [...defaultSettings, 'tslint -p tsconfig.json']
  : [...defaultSettings];

const scssSettings = config.lintStaged.stylelintEnabled
  ? [...defaultSettings, 'stylelint --cache']
  : [...defaultSettings];

module.exports = {
  'src/**/*.{js}': jsSettings,
  'src/**/*.{ts}': tsSettings,
  'src/**/*.{scss}': scssSettings,
};
