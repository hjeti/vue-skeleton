const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const compression = require('compression');

// default port where dev server listens for incoming traffic
const port = 4040;

const app = express();

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());
app.use(compression());

app.use(express.static(path.join(__dirname, '../dist')));

const uri = 'http://localhost:' + port;

console.log('> Listening at ' + uri + '\n');

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}

	opn(uri);
});
