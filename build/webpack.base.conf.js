const path = require('path');
const config = require('../config');
const webpackHelpers = require('./webpackHelpers');

const projectRoot = path.resolve(__dirname, '../');
const isDevelopment = process.env.NODE_ENV == 'development';
const eslintLoaderEnabled = isDevelopment ? config.dev.enableESLintLoader : config.build.enableESLintLoader;

module.exports = {
	entry: {
		app: './src/bootstrap.js'
	},
	output: {
		path: path.join(projectRoot, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.vue', '.js', '.ts', '.scss'],
		modules: [path.join(projectRoot, 'src'), path.join(projectRoot, 'node_modules')],
		alias: {
			'modernizr$': path.join(projectRoot, '.modernizrrc')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					webpackHelpers.getBabelLoaderConfig(isDevelopment)
				],
				include: [
					path.join(projectRoot, 'src')
				],
				exclude: /node_modules/
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr-loader!json-loader'
			},
			webpackHelpers.getESLintLoader(eslintLoaderEnabled, projectRoot),
			{
				test: /\.ts$/,
				include: [
					path.join(projectRoot, 'src')
				],
				use: [
					webpackHelpers.getBabelLoaderConfig(isDevelopment),
					{
						loader: 'awesome-typescript-loader'
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	}
};


