const jsonImporter = require('node-sass-json-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = ({ config, isDevelopment }) => webpackConfig => {
  return {
    ...webpackConfig,
    module: {
      rules: [
        /*
         * ------------------------------------------------
         * Styling (scss and css)
         * ------------------------------------------------
         */
        {
          test: /\.scss$/,
          oneOf: (() => {
            function getScssLoaders(cssModules) {
              const loaders = [
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
                {
                  loader: 'sass-loader',
                  options: {
                    importer: jsonImporter(),
                    data: '@import "src/asset/style/utils.scss";',
                    includePaths: ['src/asset/style'],
                    sourceMap: isDevelopment,
                  },
                },
              ];

              if (isDevelopment) {
                loaders.unshift({ loader: 'style-loader' });
              } else {
                loaders.unshift(MiniCssExtractPlugin.loader);
              }

              return loaders;
            }

            return [
              {
                resourceQuery: /module/,
                use: getScssLoaders(true),
              },
              {
                use: getScssLoaders(false),
              },
            ];
          })(),
        },
        /*
         * ------------------------------------------------
         * JavaScript and TypeScript
         * ------------------------------------------------
         */
        ...(() => {
          const babelLoaderConfig = {
            loader: 'babel-loader',
            options: {
              cacheDirectory: isDevelopment,
              configFile: path.join(config.projectRoot, './babel.config.js'),
            },
          };

          return [
            {
              test: /\.js$/,
              use: babelLoaderConfig,
              exclude: config.compileNodeModules ? /@babel(?:\/|\\{1,2})runtime/ : /node_modules/,
            },
            {
              test: /\.ts$/,
              use: [
                babelLoaderConfig,
                {
                  loader: 'awesome-typescript-loader',
                  options: {
                    configFileName: path.resolve(config.projectRoot, './tsconfig.json'),
                  },
                },
              ],
            },
          ];
        })(),
        /*
         * ------------------------------------------------
         * Vue
         * ------------------------------------------------
         */
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                transformAssetUrls: {
                  source: ['src', 'srcset'],
                },
              },
            },
          ],
        },
        /*
         * ------------------------------------------------
         * Images, SVG, Audio and Video
         * ------------------------------------------------
         */
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: path.posix.join(
                  isDevelopment ? '' : config.dist.versionPath,
                  'image/[name].[hash:7].[ext]',
                ),
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm|ogv)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: path.posix.join(
                  isDevelopment ? '' : config.dist.versionPath,
                  'video/[name].[hash:7].[ext]',
                ),
              },
            },
          ],
        },
        {
          test: /\.(mp3|ogg|wav)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: path.posix.join(
                  isDevelopment ? '' : config.dist.versionPath,
                  'audio/[name].[hash:7].[ext]',
                ),
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          oneOf: (() => {
            const svgoLoaderConfig = {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeViewBox: false },
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

            return [
              {
                resourceQuery: /inline/,
                use: [{ loader: 'svg-inline-loader' }, svgoLoaderConfig],
              },
              {
                use: [{ loader: 'url-loader' }, svgoLoaderConfig],
              },
            ];
          })(),
        },
        /*
         * ------------------------------------------------
         * Fonts
         * ------------------------------------------------
         */
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: path.posix.join(
                  isDevelopment ? '' : config.dist.versionPath,
                  'font/[name].[hash:7].[ext]',
                ),
              },
            },
          ],
        },
        /*
         * ------------------------------------------------
         * Other
         * ------------------------------------------------
         */
        {
          test: /\.modernizrrc$/,
          loader: 'modernizr-loader!json-loader',
        },
        {
          test: /\.(glsl|txt)$/,
          use: 'raw-loader',
        },
      ],
    },
  };
};
