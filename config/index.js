const path = require('path');

const versionPath = 'version/' + new Date().getTime() + '/';
const publicPath = '/';  //change if site is running in a subfolder on the server

module.exports = {
	build: {
		env: {
			NODE_ENV: JSON.stringify( 'production' ),
			VERSIONED_STATIC_ROOT: JSON.stringify( publicPath + versionPath + 'static/' ),
			STATIC_ROOT: JSON.stringify( publicPath + 'static/' ),
			PUBLIC_PATH: JSON.stringify( publicPath ),
		},
		index: path.resolve( __dirname, '../dist/index.html' ),
		versionPath: versionPath,
		publicPath: publicPath,
		enableESLintLoader: true,
		enableTSLintLoader: true,
	},
	dev: {
		env: {
			NODE_ENV: JSON.stringify( 'development' ),
			VERSIONED_STATIC_ROOT: JSON.stringify( '/static/' ),
			STATIC_ROOT: JSON.stringify( '/static/' ),
			PUBLIC_PATH: JSON.stringify( '/' ),
		},
		port: 8080,
		proxyTable: {},
		enableESLintLoader: false,
		enableTSLintLoader: false,
	},
	useHttps: false,
	prePush: [
		{
			name: 'esLintCheck',
			options: {}
		},
		{
			name: 'tsLintCheck',
			options: {
				exclude: [
					'./node_modules/**/*',
					'./src/vendor/**/*'
				],
			},
		},
	],
};
