const path = require('path');

/*
change the publicPath if site is running in a subfolder on the server. It's also possible to override this
publicPath by using: npm run build -- --publicPath=/v/vue-skeleton/
 */
let publicPath = '/';

const publicPathArgument = process.argv.find((argument) => argument.indexOf('--publicPath') === 0);

if(publicPathArgument){
	publicPath = publicPathArgument.split('=')[1];
}

const versionPath = 'version/' + new Date().getTime() + '/';

module.exports = {
	build: {
		env: {
			NODE_ENV: JSON.stringify('production'),
			VERSIONED_STATIC_ROOT: JSON.stringify(publicPath + versionPath + 'static/'),
			STATIC_ROOT: JSON.stringify(publicPath + 'static/'),
			PUBLIC_PATH: JSON.stringify(publicPath),
		},
		index: path.resolve(__dirname, '../dist/index.html'),
		versionPath: versionPath,
		publicPath: publicPath,
		enableESLintLoader: true,
		enableTSLintLoader: true,
		enableImageOptimization: true,
		enablePNGQuant: true, // Best PNG optimizer but PNGQuant crashes on some images so use with caution.
	},
	dev: {
		env: {
			NODE_ENV: JSON.stringify('development'),
			VERSIONED_STATIC_ROOT: JSON.stringify('/static/'),
			STATIC_ROOT: JSON.stringify('/static/'),
			PUBLIC_PATH: JSON.stringify('/'),
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
				// Make sure that these folders are also excluded in the tslintloader config in webpackHelpers.js
				exclude: [
					'./node_modules/**/*',
					'./src/vendor/**/*'
				],
			},
		},
	],
};
