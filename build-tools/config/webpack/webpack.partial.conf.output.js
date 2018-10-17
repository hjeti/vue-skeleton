const path = require('path');

module.exports = (config, isDevelopment) => webpackConfig => ({
  ...webpackConfig,
  output: {
    path: path.join(config.projectRoot, 'dist'),
    publicPath: isDevelopment ? '/' : config.build.publicPath,
    filename: isDevelopment
      ? '[name].js'
      : path.posix.join('', config.build.versionPath + 'js/[name].js'),
    chunkFilename: isDevelopment
      ? '[id].js'
      : path.posix.join('', config.build.versionPath + 'js/[id].js'),
  },
});
