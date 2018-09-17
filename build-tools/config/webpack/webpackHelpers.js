const jsonImporter = require('node-sass-json-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.getSassLoaderConfig = function(isDevelopment) {
  return {
    loader: 'sass-loader',
    options: {
      importer: jsonImporter(),
      data: '@import "src/asset/style/utils.scss";',
      includePaths: ['src/asset/style'],
      sourceMap: isDevelopment,
    },
  };
};

exports.getBabelLoaderConfig = function(isDevelopment) {
  return {
    loader: 'babel-loader',
    options: {
      cacheDirectory: isDevelopment,
    },
  };
};

exports.getScssLoaderConfig = function(isDevelopment, cssModules = false) {
  const config = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDevelopment,
        localIdentName: '[local]-[hash:base64:7]',
        camelCase: true,
        importLoaders: 2,
        modules: cssModules,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDevelopment,
      },
    },
    this.getSassLoaderConfig(isDevelopment),
  ];

  if (isDevelopment) {
    config.unshift({
      loader: 'style-loader',
    });
  }

  if (!isDevelopment) {
    config.unshift(MiniCssExtractPlugin.loader);
  }

  return config;
};

exports.getVueLoaderConfig = function() {
  return {
    loader: 'vue-loader',
    options: {
      transformAssetUrls: {
        source: ['src', 'srcset'],
      },
    },
  };
};

exports.getSvgoLoaderConfig = function() {
  return {
    loader: 'svgo-loader',
    options: {
      plugins: [
        { removeStyleElement: true },
        { removeComments: true },
        { removeDesc: true },
        { removeUselessDefs: true },
        { removeTitle: true },
        { removeMetadata: true },
        { removeComments: true },
        { cleanupIDs: { remove: true, prefix: '' } },
        { convertColors: { shorthex: false } },
      ],
    },
  };
};
