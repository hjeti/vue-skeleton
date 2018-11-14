module.exports = ({ isDevelopment }) => webpackConfig => ({
  ...webpackConfig,
  optimization: isDevelopment ? {
    noEmitOnErrors: true,
  } : {
    concatenateModules: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: false,
  },
});
