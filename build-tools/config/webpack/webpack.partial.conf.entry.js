module.exports = (config, isDevelopment) => webpackConfig => ({
  ...webpackConfig,
  entry: {
    app: [
      './src/polyfill/polyfill.js',
      './src/bootstrap.js'
    ],
  },
});
