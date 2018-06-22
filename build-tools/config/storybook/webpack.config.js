const path = require('path');
const webpackBaseConfig = require('../webpack/webpack.base.conf');
const webpackHelpers = require('../webpack/webpackHelpers');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const config = require('../../config');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.resolve.extensions = ['.vue', '.js', '.ts', '.scss'];
  storybookBaseConfig.resolve.alias = {
    ...storybookBaseConfig.resolve.alias,
    ...webpackBaseConfig.resolve.alias,
  };

  storybookBaseConfig.module.rules = [];
  webpackBaseConfig.module.rules.forEach(rule => {
    storybookBaseConfig.module.rules.push(rule);
  });

  storybookBaseConfig.module.rules = [
    ...storybookBaseConfig.module.rules,
    {
      test: /\.scss$/,
      use: webpackHelpers.getScssLoaderConfig(true),
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
  ];

  storybookBaseConfig.plugins = [
    ...storybookBaseConfig.plugins,
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
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
  ];

  // Return the altered config
  return storybookBaseConfig;
};
