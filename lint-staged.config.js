const config = require('./build-tools/config');

const defaultSettings = ['prettier --write', 'git add'];

const jsSettings = config.lintStaged.eslintEnabled
  ? [...defaultSettings, 'npm run lint:js']
  : [...defaultSettings];

const tsSettings = config.lintStaged.tslintEnabled
  ? [...defaultSettings, 'npm run lint:ts']
  : [...defaultSettings];

const scssSettings = config.lintStaged.stylelintEnabled
  ? [...defaultSettings, 'npm run lint:scss']
  : [...defaultSettings];

module.exports = {
  'src/**/*.js': jsSettings,
  'src/**/*.ts': tsSettings,
  'src/**/*.scss': scssSettings,
};
