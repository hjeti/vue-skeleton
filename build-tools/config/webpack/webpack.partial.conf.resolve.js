const path = require('path');

module.exports = ({ config }) => webpackConfig => ({
  ...webpackConfig,
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.scss'],
    alias: {
      modernizr$: path.join(config.projectRoot, '.modernizrrc'),
      TweenLite: path.resolve(config.projectRoot, 'node_modules/gsap/src/uncompressed/TweenLite'),
      asset: path.resolve(config.projectRoot, 'src/asset'),
    },
  },
});
