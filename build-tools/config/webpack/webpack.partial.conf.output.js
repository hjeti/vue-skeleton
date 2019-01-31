const path = require('path');

module.exports = ({ config, isDevelopment }) => webpackConfig => ({
  ...webpackConfig,
  output: {
    path: path.join(config.projectRoot, 'dist'),
    publicPath: isDevelopment ? '/' : config.dist.publicPath,
    globalObject: 'this',
    filename: isDevelopment
      ? '[name].js'
      : path.posix.join('', config.dist.versionPath + 'js/[name].js'),
    chunkFilename: isDevelopment
      ? '[id].js'
      : path.posix.join('', config.dist.versionPath + 'js/[id].js'),
  },
});
