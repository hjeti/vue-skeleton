module.exports = ({ config }) => webpackConfig => ({
  ...webpackConfig,
  devServer: {
    clientLogLevel: 'info',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || '0.0.0.0',
    port: config.devServer.port,
    disableHostCheck: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: config.devServer.proxyTable,
    // quiet: true,
    https: config.devServer.useHttps,
  },
});
