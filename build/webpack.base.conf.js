const path = require('path');
const config = require('../config');
const webpackHelpers = require('./webpackHelpers');

const projectRoot = path.resolve(__dirname, '../');
const isDevelopment = process.env.NODE_ENV == 'development';
const eslintLoaderEnabled = isDevelopment ? config.dev.enableESLintLoader : config.build.enableESLintLoader;
const tslintLoaderEnabled = isDevelopment ? config.dev.enableTSLintLoader : config.build.enableTSLintLoader;

module.exports = {
	entry: {
		app: './src/bootstrap.js'
	},
	output: {
		path: path.join(projectRoot, 'dist'),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename : '[id].js'
	},
	resolve: {
		extensions: ['.vue', '.js', '.ts', '.scss'],
		modules: [path.join(projectRoot, 'src'), path.join(projectRoot, 'node_modules')],
		alias: {
			'modernizr$': path.join(projectRoot, '.modernizrrc'),
			'TweenLite': path.resolve(projectRoot, 'node_modules/gsap/src/uncompressed/TweenLite'),
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
			{
				test: /\.(glsl|txt)$/,
				use: 'raw-loader'
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
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: path.resolve(__dirname, '../tsconfig.json'),
						},
					},
				]
			},
			webpackHelpers.getTSLintLoader(tslintLoaderEnabled, projectRoot),
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	}
};


