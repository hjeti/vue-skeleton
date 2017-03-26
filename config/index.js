const path = require('path');

module.exports = {
    build: {
        env: {
			NODE_ENV: '"production"'
		},
        index: path.resolve(__dirname, '../dist/index.html'),
	    versionPath: 'version/' + new Date().getTime() + '/'
    },
    dev: {
        env: {
			NODE_ENV: '"development"'
		},
        port: 8080,
        proxyTable: {}
    }
};
