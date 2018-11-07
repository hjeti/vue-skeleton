const detectPort = require('detect-port');
const opn = require('opn');
const config = require('../config');

const { DEVELOPMENT } = config.buildTypes;

const devWebpackConfig = require('./webpack.conf.base')(DEVELOPMENT);

module.exports = detectPort(devWebpackConfig.devServer.port)
  .then((port) => {
    process.env.PORT = port;
    devWebpackConfig.devServer.port = port;

    if (config.devServer.autoOpenBrowser) {
      opn(`${config.devServer.useHttps ? 'https' : 'http'}://localhost:${port}`).catch(() => {});
    }

    return devWebpackConfig;
  });

