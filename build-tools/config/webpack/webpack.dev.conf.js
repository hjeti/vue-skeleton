const config = require('../../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpackHelpers = require('./webpackHelpers');
const detectPort = require('detect-port');
const opn = require('opn');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: webpackHelpers.getScssLoaderConfig(true),
      },
      {
        test: /\.vue$/,
        use: [webpackHelpers.getVueLoaderConfig(true)],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join('', 'image/[name].[hash:7].[ext]'),
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
              name: path.posix.join('', 'font/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
    ],
  },
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
    quiet: true,
    https: config.useHttps
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedChunksPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      version: '/',
      inject: true,
      cache: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static',
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
  ],
});

module.exports = detectPort(devWebpackConfig.devServer.port).then(function (port) {
  process.env.PORT = port;
  devWebpackConfig.devServer.port = port;

  devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: ${config.useHttps ? 'https' : 'http'}://localhost:${port}`],
    }
  }));

  if(config.dev.autoOpenBrowser) {
    opn(`${config.useHttps ? 'https' : 'http'}://localhost:${port}`).catch(() => {});
  }

  return devWebpackConfig;
});
