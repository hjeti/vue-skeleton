const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config, isDevelopment) => webpackConfig => {
  /*
   * ------------------------------------------------
   * Common plugins (for development and production)
   * ------------------------------------------------
   */
  const plugins = [
    new CopyWebpackPlugin([
      {
        from: 'staticRoot',
        to: '',
        ignore: ['.*'],
      },
    ]),
    new webpack.DefinePlugin({
      'process.env': config[isDevelopment ? 'dev' : 'build'].env,
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: isDevelopment ? 'static' : config.build.versionPath + 'static',
        ignore: ['.*'],
      },
    ]),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(
      isDevelopment
        ? {
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            version: config.build.versionPath,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: false,
            },
            chunksSortMode: 'dependency',
          }
        : {
            filename: 'index.html',
            template: 'index.html',
            version: '/',
            inject: true,
            cache: true,
          },
    ),
  ];

  if (isDevelopment) {
    /*
     * ------------------------------------------------
     * Development-only plugins
     * ------------------------------------------------
     */
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running here: ${
              config.useHttps ? 'https' : 'http'
            }://localhost:${process.env.PORT || config.dev.port}`,
          ],
        },
      }),
    );
  } else {
    /*
     * ------------------------------------------------
     * Production-only plugins
     * ------------------------------------------------
     */
    plugins.push(
      new WebpackCleanupPlugin(),
      new MiniCssExtractPlugin({
        filename: path.posix.join(config.build.versionPath, 'css/[name].css'),
      }),
      new LodashModuleReplacementPlugin({
        paths: true,
      }),
      new webpack.NamedChunksPlugin(),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parser: require('postcss-safe-parser'),
          discardComments: {
            removeAll: true,
          },
        },
      }),
      new ImageminPlugin({
        disable: !config.build.enableImageOptimization,
        svgo: null,
        gifsicle: null,
        pngquant: config.build.enablePNGQuant ? { quality: config.build.pngQuantQuality } : null,
      }),
    );

    if (config.build.analyze) {
      plugins.push(
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
        }),
      );
    }

    if (config.build.generateIcons) {
      plugins.push(
        new FaviconsWebpackPlugin({
          logo: path.join(config.projectRoot, 'static/image/favicon.png'),
          prefix: config.build.versionPath + 'static/favicon/',
          emitStats: false,
          persistentCache: false,
          inject: true,
          background: '#fff',
          title: '',
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: true,
            twitter: true,
            yandex: true,
            windows: true,
          },
        }),
      );
    }
  }

  return {
    ...webpackConfig,
    plugins,
  };
};
