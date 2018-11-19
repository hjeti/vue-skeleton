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
const AssetsPlugin = require('assets-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = ({ config, isDevelopment, buildType }) => webpackConfig => {
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
      'process.env': config.env[buildType],
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: isDevelopment ? 'static' : config.dist.staticPath,
        ignore: ['.*'],
      },
    ]),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(
      isDevelopment
        ? {
            filename: config.devServer.indexHtml,
            template: 'index.html',
            inject: true,
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
            // option enabled by InlineSourcePlugin below
            inlineSource: 'runtime~.+\\.js',
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
      // note: the FriendlyErrorsWebpackPlugin is injected from webpack.conf.dev.js
    );
  } else {
    /*
     * ------------------------------------------------
     * Production-only plugins
     * ------------------------------------------------
     */
    plugins.push(
      new AssetsPlugin({
        prettyPrint: true,
        metadata: {
          version: config.dist.version,
          time: Date.now(),
        },
        path: path.join(config.projectRoot, 'dist', 'manifests'),
        filename: `${config.dist.version}.json`,
        entrypoints: true,
      }),
      new InlineSourcePlugin(),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash].css',
      }),
      new LodashModuleReplacementPlugin({
        paths: true,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parser: require('postcss-safe-parser'),
          discardComments: {
            removeAll: true,
          },
        },
      }),
      new ImageminPlugin({
        disable: !config.dist.enableImageOptimization,
        svgo: null,
        gifsicle: null,
        pngquant: config.dist.enablePNGQuant ? { quality: config.dist.pngQuantQuality } : null,
      }),
    );

    if (config.dist.cleanBuildOutput) {
      plugins.push(
        new WebpackCleanupPlugin({
          exclude: [`manifests/${config.dist.version}.json`]
        })
      )
    }

    if (config.enableBundleAnalyzer) {
      plugins.push(
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
        }),
      );
    }

    if (config.dist.generateIcons) {
      plugins.push(
        new FaviconsWebpackPlugin({
          logo: path.join(config.projectRoot, 'static/image/favicon.png'),
          prefix: path.join(config.dist.staticPath, 'favicon/'),
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
