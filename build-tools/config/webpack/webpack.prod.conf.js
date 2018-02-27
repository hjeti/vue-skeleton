const path = require('path');
const config = require('../../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackHelpers = require('./webpackHelpers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const env = config.build.env;
const projectRoot = path.resolve(__dirname, '../../../');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: webpackHelpers.getScssLoaderConfig(),
        }),
      },
      {
        test: /\.vue$/,
        use: [webpackHelpers.getVueLoaderConfig(false)],
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
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    new ExtractTextPlugin({
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
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(projectRoot, './node_modules')) === 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new LodashModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: config.build.versionPath + 'static',
        ignore: ['.*'],
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: 'staticRoot',
        to: '',
        ignore: ['.*'],
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: path.join(projectRoot, './stats.json'),
    }),
    ...(config.build.generateIcons ? (
    [
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
          windows: true
        }
    })]) : []),
  ],
});

module.exports = webpackConfig;
