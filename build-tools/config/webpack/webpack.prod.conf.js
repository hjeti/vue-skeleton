const path = require('path');
const config = require('../../config/config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackHelpers = require('./webpackHelpers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const env = config.build.env;
const projectRoot = path.resolve(__dirname, '../../../');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: webpackHelpers.getScssLoaderConfig(false, true),
          },
          {
            use: webpackHelpers.getScssLoaderConfig(false),
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [webpackHelpers.getVueLoaderConfig()],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join(config.build.versionPath, 'image/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join(config.build.versionPath, 'font/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
    ],
  },
  devtool: false,
  output: {
    filename: path.posix.join('', config.build.versionPath + 'js/[name].js'),
    chunkFilename: path.posix.join('', config.build.versionPath + 'js/[id].js'),
    publicPath: config.build.publicPath,
  },
  optimization: {
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
  plugins: [
    new VueLoaderPlugin(),
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.NamedChunksPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        parser: require('postcss-safe-parser'),
        discardComments: {
          removeAll: true
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: path.posix.join(config.build.versionPath, 'css/[name].css'),
    }),
    new HtmlWebpackPlugin({
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
    }),
    new ImageminPlugin({
      disable: !config.build.enableImageOptimization,
      svgo: null,
      gifsicle: null,
      pngquant: config.build.enablePNGQuant ? { quality: config.build.pngQuantQuality } : null,
    }),
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: config.build.versionPath + 'static',
        ignore: ['.gitkeep'],
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: 'staticRoot',
        to: '',
        ignore: ['.gitkeep'],
      },
    ]),
    ...(config.build.analyze
      ? [
          new BundleAnalyzerPlugin({
            defaultSizes: 'gzip',
          }),
        ]
      : []),
    ...(config.build.generateIcons
      ? [
          new FaviconsWebpackPlugin({
            logo: path.join(projectRoot, './static/image/favicon.png'),
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
        ]
      : []),
  ],
});

module.exports = webpackConfig;
