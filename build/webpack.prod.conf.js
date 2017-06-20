const path = require('path');
const config = require('../config');
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

const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					use: webpackHelpers.getScssLoaderConfig()
				}),
			},
			{
				test: /\.vue$/,
				use: [webpackHelpers.getVueLoaderConfig(false, config.build.enableESLintLoader)],
			},
			{
				test: /\.(png|jpe?g|gif)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: path.posix.join(config.build.versionPath, 'image/[name].[hash:7].[ext]')
						}
					}
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: path.posix.join(config.build.versionPath, 'font/[name].[hash:7].[ext]')
						}
					}
				],
			}
		]
	},
	devtool: false,
	output: {
		filename: path.posix.join('', config.build.versionPath + '/js/[name].js'),
		chunkFilename: path.posix.join('', config.build.versionPath + '/js/[id].js'),
		publicPath: config.build.publicPath
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
				warnings: false
			},
			output: {
				comments: false
			}
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			options: {
				context: path.resolve(__dirname, '../')
			}
		}),
		new ExtractTextPlugin({filename: path.posix.join(config.build.versionPath, '/css/[name].css')}),
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: 'index.html',
			inject: true,
			version: config.build.versionPath,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: false
			},
			chunksSortMode: 'dependency'
		}),
		new ImageminPlugin({
			disable: !config.build.enableImageOptimization,
			svgo: null,
			gifsicle: null,
			pngquant: config.build.enablePNGQuant ? { quality: '65' } : null,
		}),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		new CopyWebpackPlugin([
			{
				from: 'static',
				to: config.build.versionPath + '/static',
				ignore: ['.*']
			}]),
		new CopyWebpackPlugin([
			{
				from: 'staticRoot',
				to: 'static',
				ignore: ['.*']
			}]),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: '../stats.json',
		})
	]
});

module.exports = webpackConfig;
