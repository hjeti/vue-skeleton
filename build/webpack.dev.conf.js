const config = require('../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpackHelpers = require('./webpackHelpers');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: webpackHelpers.getScssLoaderConfig(true),
			},
			{
				test: /\.vue$/,
				use: [webpackHelpers.getVueLoaderConfig(true, config.dev.enableESLintLoader)],
			},
			{
				test: /\.(png|jpe?g|gif)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: path.posix.join('', 'image/[name].[hash:7].[ext]')
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
							name: path.posix.join('', 'font/[name].[hash:7].[ext]')
						}
					}
				],
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config.dev.env
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
				context: path.resolve(__dirname, '../')
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			version: '/',
			inject: true
		}),
		new FriendlyErrorsWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: 'static',
				to: 'static',
				ignore: ['.*']
			}]),
		new CopyWebpackPlugin([
			{
				from: 'staticRoot',
				to: 'static',
				ignore: ['.*']
			}])
	]
});
