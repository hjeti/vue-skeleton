const detectPort = require('detect-port');
const opn = require('opn');
const config = require('../config');

const devWebpackConfig = require('./webpack.conf.base')(true);

module.exports = detectPort(devWebpackConfig.devServer.port)
  .then((port) => {
    process.env.PORT = port;
    devWebpackConfig.devServer.port = port;

    if (config.dev.autoOpenBrowser) {
      opn(`${config.useHttps ? 'https' : 'http'}://localhost:${port}`).catch(() => {});
    }

    return devWebpackConfig;
  });

