const path = require('path');

module.exports = ({ config, isDevelopment }) => webpackConfig => ({
  ...webpackConfig,
  output: {
    path: path.join(config.projectRoot, 'dist'),
    publicPath: isDevelopment ? '/' : config.dist.publicPath,
    filename: `assets/js/[name]${isDevelopment ? '' : '.[contenthash]'}.js`,
    chunkFilename: `assets/js/[id]${isDevelopment ? '' : '.[chunkhash]'}.js`,
  },
});
