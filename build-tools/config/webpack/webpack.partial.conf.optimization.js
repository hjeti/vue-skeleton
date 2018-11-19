module.exports = ({ isDevelopment }) => webpackConfig => ({
  ...webpackConfig,
  optimization: isDevelopment ? {
    noEmitOnErrors: true,
  } : {
    concatenateModules: true,
    minimize: true,
    moduleIds: 'hashed',
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
    runtimeChunk: true,
  },
});
