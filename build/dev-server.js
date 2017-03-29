const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const fs = require('fs');
const https = require('https');
const http = require('http');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const server = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {
	}
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({action: 'reload'});
		cb();
	})
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
	let options = proxyTable[context];
	if (typeof options === 'string') {
		options = {target: options};
	}
	server.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')());

// serve webpack bundle output
server.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join('/', 'static');
server.use(staticPath, express.static('./static'));


devMiddleware.waitUntilValid(function () {
	console.log('> Listening at ' + uri + '\n');
});

let createdServer;
const uri = (config.dev.useHttps ? 'https' : 'http') + '://localhost:' + port;

if(config.dev.useHttps)
{
	createdServer = https.createServer({
		key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
		cert: fs.readFileSync(path.join(__dirname, './ssl/cert.pem'))
	}, server);
}
else
{
	createdServer = http.createServer(server);
}

module.exports = createdServer.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}

	opn(uri);
});
