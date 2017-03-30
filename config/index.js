const path = require('path');

const versionPath = 'version/' + new Date().getTime() + '/';
const publicPath = '/';  //change if site is running in a subfolder on the server

module.exports = {
    build: {
        env: {
			NODE_ENV: JSON.stringify('production'),
			VERSIONED_STATIC_ROOT: JSON.stringify(publicPath + versionPath + 'static/'),
			STATIC_ROOT: JSON.stringify(publicPath + 'static/')
		},
        index: path.resolve(__dirname, '../dist/index.html'),
	    versionPath: versionPath,
		publicPath: publicPath,
		enableESLintLoader: true,
    },
    dev: {
        env: {
			NODE_ENV: JSON.stringify('development'),
			VERSIONED_STATIC_ROOT: JSON.stringify('/static/'),
			STATIC_ROOT: JSON.stringify('/static/')
		},
        port: 8080,
		useHttps: false,
        proxyTable: {},
		enableESLintLoader: true,
    }
};
