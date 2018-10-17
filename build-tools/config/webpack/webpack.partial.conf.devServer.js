module.exports = (config, isDevelopment) => webpackConfig => ({
  ...webpackConfig,
  devServer: {
    clientLogLevel: 'info',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || config.dev.port,
    disableHostCheck: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: config.dev.proxyTable,
    // quiet: true,
    https: config.useHttps,
  },
});
