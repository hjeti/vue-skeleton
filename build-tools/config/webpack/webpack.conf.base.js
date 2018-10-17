const helpers = require('./webpack.helpers');
const config = require('../config');

module.exports = isDevelopment => {
  const generator = helpers.compose(
    [
      require('./webpack.partial.conf.devServer'),
      require('./webpack.partial.conf.entry'),
      require('./webpack.partial.conf.module'),
      require('./webpack.partial.conf.node'),
      require('./webpack.partial.conf.optimization'),
      require('./webpack.partial.conf.output'),
      require('./webpack.partial.conf.plugins'),
      require('./webpack.partial.conf.resolve'),
    ].map(module => module(config, isDevelopment))
  );

  return generator({
    // single configuration properties go here
    // object go into a separate file (e.g. webpack.partial.conf.entry.js)
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : false,
  });
};
