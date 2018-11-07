const config = require('../config/config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.env.development.NODE_ENV);
const path = require('path');
const express = require('express');
const opn = require('opn');
const https = require('https');
const http = require('http');
const compression = require('compression');
const webpackConfig = require('../config/webpack/webpack.conf.prod');
const pem = require('pem');


// default port where dev server listens for incoming traffic
const port = 4040;

const server = express();
const root = path.join(__dirname, '../../dist');

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')());
server.use(compression());

server.use(webpackConfig.output.publicPath, express.static(root));
server.use('/static', express.static(path.join(root, './static')));

server.get('*', function(req, res) {
  res.sendFile(path.join(root, './index.html'));
});

const uri = (config.devServer.useHttps ? 'https' : 'http') + '://localhost:' + port;

console.log('> Listening at ' + uri + '\n');

const onServerRunning = function(err) {
  if (err) {
    console.log(err);
    return;
  }

  opn(uri);
};

if (config.devServer.useHttps) {
  pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    if (err) {
      throw err
    }
    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, server).listen(port, onServerRunning);
  });
} else {
  http.createServer(server).listen(port, onServerRunning);
}
