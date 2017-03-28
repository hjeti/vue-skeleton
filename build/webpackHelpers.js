const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

exports.getBabelLoaderConfig = function(isDevelopment){
	return {
		loader: 'babel-loader',
		options: {
			cacheDirectory: isDevelopment
		}
	}
};

exports.getScssLoaderConfig = function(isDevelopment){
	const config = [
		{
			loader: 'css-loader'
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins() {
					return [
						require('autoprefixer')({
							browsers: ['last 2 versions']
						})
					];
				}
			}
		},
		{
			loader: 'sass-loader'
		}
	];

	if(isDevelopment){
		config.unshift({
			loader: 'style-loader'
		});
	}

	return config;
};

exports.getVueLoaderConfig = function(isDevelopment, eslintLoaderEnabled){
	let scssLoader;

	if(isDevelopment){
		scssLoader = 'vue-style-loader!css-loader!sass-loader';
	}
	else
	{
		scssLoader = ExtractTextPlugin.extract({
			use: [
				{
					loader: 'css-loader'
				},
				{
					loader: 'sass-loader'
				}
			], fallback: 'vue-style-loader'
		});
	}

	const config = {
		loader: 'vue-loader',
		options: {
			loaders: {
				scss: scssLoader,
				js: 'babel-loader' + (eslintLoaderEnabled ? '!eslint-loader' : '')
			},
			postcss: [
				require('autoprefixer')({
					browsers: ['last 2 versions']
				})
			],
			cssModules: {
				localIdentName: '[local]-[hash:base64:7]',
				camelCase: true
			}
		}
	};

	return config;
};

exports.getESLintLoader = function(enabled, projectRoot){
	return enabled ? {
		test: /\.js$/,
		enforce: 'pre',
		use: [
			{
				loader: 'eslint-loader'
			}
		],
		include: [
			path.join(projectRoot, 'src')
		],
		exclude: /node_modules/
	} : {};
};





